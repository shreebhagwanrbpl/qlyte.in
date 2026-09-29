# SQLite Frontend Migration

This frontend no longer uses Firebase SDK/Firestore. Catalog/page reads use the local SQLite `catalog.db` through Next.js server routes, with the Admin API as a remote fallback.

## Website ID
`src/lib/catalog-utils.js` contains the only `WEBSITE_ID` for this site.

## SQLite
Default path:
`../SuperAdminRBPL/data/catalog.db`

Override with:
`SQLITE_DB_PATH=/absolute/path/to/catalog.db`

Optional:
`SQLITE_COMPANY_ID=...`

## Admin API
Query submissions and remote data fallback use:
`ADMIN_API_BASE_URL || ADMIN_API_URL || SQLITE_ADMIN_API_URL || https://admin.rajbiosis.app`

Local fallback is `http://localhost:3000`.

## API routes
- `GET /api/catalog`
- `GET /api/products`
- `GET /api/site-data?page=home|contact|services`
- `GET /api/site-data?type=district&district=<slug>`
- `POST /api/contact-query`
- `POST /api/product-query`

All catalog/site-data APIs are force-dynamic and send no-store cache headers.

## Visibility
`src/lib/catalog-utils.js` implements strict normalized website matching, publication/status checks, and category/subcategory cascading visibility.

## Important deployment note
For direct SQLite reads, the runtime must have access to `SQLITE_DB_PATH`. If the frontend is deployed separately from the Admin server and cannot mount the SQLite file, the Admin API fallback must expose the catalog/site-data endpoints.

The original UI/CSS files were otherwise preserved as much as possible.
