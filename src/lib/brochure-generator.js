import { jsPDF } from "jspdf";

function convertBase64ToJpeg(base64Str) {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(base64Str);
    const img = new window.Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 400;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.95));
      } catch (e) {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
    img.src = base64Str;
  });
}

const urlToBase64 = async (url) => {
  if (!url) return null;
  if (url.startsWith("data:image/jpeg") || url.startsWith("data:image/png")) return url;

  // 1. Try Next.js server proxy route to completely bypass browser CORS restrictions
  try {
    const proxyRes = await fetch(`/api/proxy-image?url=${encodeURIComponent(url)}`);
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.base64) {
        if (data.base64.includes("image/webp") || data.base64.includes("image/svg")) {
          return await convertBase64ToJpeg(data.base64);
        }
        return data.base64;
      }
    }
  } catch (e) {
    console.warn("Proxy route fetch error:", e);
  }

  // 2. Direct fetch fallback
  try {
    const res = await fetch(url, { mode: "cors" });
    if (res.ok) {
      const blob = await res.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    }
  } catch (e) {
    console.warn("Direct fetch error:", e);
  }

  // 3. Image element fallback
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 400;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.95));
      } catch (err) {
        console.error("Canvas draw error:", err);
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

export async function downloadProductBrochure(product) {
  if (!product) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297

  // --- HEADER BAR ---
  doc.setFillColor(15, 23, 42); // Navy #0F172A
  doc.rect(0, 0, pageWidth, 22, "F");

  // Official Logo in PDF Header
  try {
    const logoBase64 = await urlToBase64("/logo.png");
    if (logoBase64) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(12, 2.5, 50, 17, 1.5, 1.5, "F");
      doc.addImage(logoBase64, "PNG", 14, 3.5, 46, 15, undefined, "FAST");
    } else {
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Raj Biosis Private Limited", 14, 14);
    }
  } catch (e) {
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Raj Biosis Private Limited", 14, 14);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Phone: +91 9983123469", pageWidth - 14, 10, { align: "right" });
  doc.text("Web: www.qlyte.in", pageWidth - 14, 16, { align: "right" });

  // --- PRODUCT TITLE ---
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  const titleText = product.title || "Biomedical Equipment";
  const splitTitle = doc.splitTextToSize(titleText, 180);
  let currentY = 32;
  doc.text(splitTitle, 14, currentY);
  currentY += splitTitle.length * 6 + 4;

  // --- OFFICIAL SPECIFICATION BROCHURE GOLD BANNER ---
  doc.setFillColor(212, 160, 23); // Amber Gold #D4A017
  doc.roundedRect(14, currentY, 182, 10, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("OFFICIAL PRODUCT SPECIFICATION BROCHURE", pageWidth / 2, currentY + 6.8, { align: "center" });

  currentY += 16;

  // --- SPECIFICATIONS & IMAGE GRID ---
  const gridStartY = currentY;

  // Right Box: KEY SPECIFICATIONS TABLE
  const specBoxX = 100;
  const specBoxWidth = 96;
  const specHeaderHeight = 9;

  // Header Box
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(specBoxX, gridStartY, specBoxWidth, specHeaderHeight, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("KEY SPECIFICATIONS", specBoxX + 6, gridStartY + 6);

  // Table Specs
  const specs = [
    ["Brand:", product.brand || "Raj Biosis / OEM"],
    ["Model:", product.model || "HDC-LYTE Plus"],
    ["Instrument:", product.instrument || "Blood / Diagnostic Analyzer"],
    ["Usage:", product.usage || "Clinical Laboratory"],
    ["Automation:", product.automation || "Fully Automatic"],
    ["Size / Capacity:", product.capacity || product.throughput || "Standard High Performance"],
  ];

  let tableY = gridStartY + specHeaderHeight;
  doc.setFontSize(8.5);

  specs.forEach(([label, val], idx) => {
    // Row background toggle
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(specBoxX, tableY, specBoxWidth, 8, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(specBoxX, tableY, specBoxWidth, 8, "S");

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(label, specBoxX + 4, tableY + 5.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const splitVal = doc.splitTextToSize(String(val), 52);
    doc.text(splitVal[0] || "", specBoxX + 38, tableY + 5.5);

    tableY += 8;
  });

  const gridHeight = tableY - gridStartY;

  // Left Box: Product Image Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, gridStartY, 80, gridHeight, 3, 3, "FD");

  const imgUrl = product.images?.[0] || product.image;
  let imageAdded = false;

  if (imgUrl && typeof window !== "undefined") {
    try {
      let base64 = await urlToBase64(imgUrl);
      if (base64) {
        if (base64.includes("image/webp") || base64.includes("image/svg")) {
          base64 = await convertBase64ToJpeg(base64);
        }

        const tempImg = new window.Image();
        await new Promise((res) => {
          tempImg.onload = () => res();
          tempImg.onerror = () => res();
          tempImg.src = base64;
        });

        let format = "JPEG";
        if (base64.includes("image/png")) {
          format = "PNG";
        }

        const boxW = 80;
        const boxH = gridHeight;
        const maxW = 72;
        const maxH = gridHeight - 8;

        let drawW = maxW;
        let drawH = maxH;

        if (tempImg.naturalWidth && tempImg.naturalHeight) {
          const aspect = tempImg.naturalWidth / tempImg.naturalHeight;
          if (aspect > maxW / maxH) {
            drawW = maxW;
            drawH = maxW / aspect;
          } else {
            drawH = maxH;
            drawW = maxH * aspect;
          }
        }

        const drawX = 14 + (boxW - drawW) / 2;
        const drawY = gridStartY + (boxH - drawH) / 2;

        doc.addImage(base64, format, drawX, drawY, drawW, drawH, undefined, "FAST");
        imageAdded = true;
      }
    } catch (err) {
      console.error("Image rendering error:", err);
    }
  }

  if (!imageAdded) {
    // Vector fallback layout
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(18, gridStartY + 4, 72, gridHeight - 8, 2, 2, "F");

    doc.setFillColor(254, 243, 199);
    doc.circle(54, gridStartY + gridHeight / 2 - 5, 12, "F");
    doc.setDrawColor(212, 160, 23);
    doc.setLineWidth(0.8);
    doc.circle(54, gridStartY + gridHeight / 2 - 5, 12, "S");

    doc.setTextColor(184, 135, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("RAJ BIOSIS", 54, gridStartY + gridHeight / 2 - 3, { align: "center" });

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("BIOMEDICAL EQUIPMENT", 54, gridStartY + gridHeight / 2 + 10, { align: "center" });
  }

  currentY = gridStartY + gridHeight + 12;

  // --- PRODUCT OVERVIEW ---
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("PRODUCT OVERVIEW", 14, currentY);

  // Underline
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.6);
  doc.line(14, currentY + 2, 60, currentY + 2);

  currentY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const overviewText =
    product.desc ||
    product.description ||
    `The ${product.title} is an advanced diagnostic analyzer designed for high performance, accuracy, and reliability in medical laboratories, hospitals, and clinical settings across India.`;

  const splitOverview = doc.splitTextToSize(overviewText, 182);
  doc.text(splitOverview, 14, currentY);

  currentY += splitOverview.length * 5 + 12;

  // --- TWO CARDS: KEY APPLICATIONS & WHY CHOOSE RAJBIOSIS ---
  const cardWidth = 88;
  const cardHeight = 62;

  // Card 1: KEY APPLICATIONS
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, currentY, cardWidth, 9, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("KEY APPLICATIONS", 20, currentY + 6);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, currentY + 9, cardWidth, cardHeight - 9, 2, 2, "FD");

  const apps = [
    "- Clinical Diagnostic Laboratories",
    "- Hospitals & Healthcare Centres",
    "- Pathology & Testing Labs",
    "- Blood Banks & Research Units",
    "- Medical Colleges & Institutions",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  let appY = currentY + 17;
  apps.forEach((app) => {
    doc.text(app, 18, appY);
    appY += 8.5;
  });

  // Card 2: WHY CHOOSE RAJBIOSIS
  const card2X = 108;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(card2X, currentY, cardWidth, 9, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("WHY CHOOSE RAJBIOSIS", card2X + 6, currentY + 6);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(card2X, currentY + 9, cardWidth, cardHeight - 9, 2, 2, "FD");

  const whyList = [
    "- Trusted Biomedical Equipment Supplier",
    "- 100% Genuine Leading Brand Products",
    "- Competitive Pricing & Warranty Support",
    "- Prompt Installation & Staff Training",
    "- Fast Express Delivery Across India",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  let whyY = currentY + 17;
  whyList.forEach((item) => {
    doc.text(item, card2X + 4, whyY);
    whyY += 8.5;
  });

  // --- FOOTER BAR ---
  const footerY = pageHeight - 20;
  doc.setFillColor(15, 23, 42);
  doc.rect(0, footerY, pageWidth, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("RAJBIOSIS PRIVATE LIMITED - Diagnostic Instruments & Healthcare Solutions", 14, footerY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text("Sales, service, installation, AMC & calibration across India | Contact: +91 9983123469", 14, footerY + 14);
  doc.text("Official Product Brochure | Confidential & Proprietary", pageWidth - 14, footerY + 14, { align: "right" });

  // Save / Download PDF
  const safeTitle = (product.title || "Product").replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`${safeTitle}_Brochure.pdf`);
}
