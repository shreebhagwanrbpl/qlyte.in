export function normalizeContactInfo(contactInfo = []) {
  if (!contactInfo) return [];
  if (!Array.isArray(contactInfo)) {
    if (typeof contactInfo === "object") {
      return Object.entries(contactInfo).map(([label, value]) => ({ label, value }));
    }
    return [{ label: "", value: String(contactInfo) }];
  }
  return contactInfo.flatMap((entry) => {
    if (!entry) return [];
    if (typeof entry === "string") return [{ label: "", value: entry }];
    if (Array.isArray(entry.value)) {
      return entry.value.map((v) => ({ label: String(entry.label || ""), value: String(v ?? "") }));
    }
    return [{ label: String(entry.label || ""), value: String(entry.value ?? "") }];
  });
}

export function contactValues(contactInfo, labels = []) {
  const wanted = labels.map((x) => x.toLowerCase());
  return normalizeContactInfo(contactInfo)
    .filter((item) => wanted.some((label) => item.label.toLowerCase().includes(label)))
    .map((item) => String(item.value || "").trim())
    .filter(Boolean);
}

export function extractPhones(contactInfo) {
  const rawValues = contactValues(contactInfo, [
    "phone",
    "mobile",
    "whatsapp",
    "contact number",
    "contact",
    "tel",
    "call",
  ]);
  const phones = [];

  for (const raw of rawValues) {
    const parts = String(raw).split(/[\n;/]+/);
    for (const part of parts) {
      const clean = part.replace(/[^\d+]/g, "").trim();
      if (!clean) continue;
      const digitsOnly = clean.replace(/\D/g, "");
      if (digitsOnly.length === 10) {
        phones.push(clean.startsWith("+") ? clean : `+91 ${digitsOnly}`);
      } else if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
        phones.push(`+91 ${digitsOnly.slice(2)}`);
      } else if (digitsOnly.length >= 7) {
        phones.push(clean);
      }
    }
  }

  return [...new Set(phones)];
}

export function extractEmails(contactInfo) {
  const rawValues = contactValues(contactInfo, ["email", "mail"]);
  const emails = [];

  for (const raw of rawValues) {
    const matches = String(raw).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
    for (const match of matches) {
      emails.push(match.trim().toLowerCase());
    }
  }

  return [...new Set(emails)];
}

export function getContactAddress(contactInfo) {
  const addresses = contactValues(contactInfo, ["office address", "address", "location", "head office", "branch"]);
  return addresses[0] || "";
}

export function getWorkingHours(contactInfo) {
  const hours = contactValues(contactInfo, ["working hours", "work hours", "hours", "timing", "timings"]);
  return hours[0] || "";
}
