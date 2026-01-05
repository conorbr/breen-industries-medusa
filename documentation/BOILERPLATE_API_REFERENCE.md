# Boilerplate Medusa API Reference

**Date:** January 3, 2026  
**Purpose:** API endpoints and credentials for exploring boilerplate configuration

---

## How to Use This Document

This document provides all the necessary information to explore and verify the configuration of a deployed Medusa v2 boilerplate instance. It is intended to be used in a separate project or environment where you have better access to code and tools for deep configuration analysis.

### Intended Usage

1. **Configuration Exploration:** Use the provided endpoints and credentials to query the boilerplate instance and verify its current configuration state.

2. **Integration Verification:** Check that MinIO (file storage), Resend (email), and Stripe (payments) are properly configured by:
   - Testing API endpoints
   - Reviewing configuration files (`medusa-config.ts`)
   - Verifying environment variables
   - Testing functionality (file uploads, email sending, payment processing)

3. **Migration Planning:** Use the findings to plan the migration of your existing Medusa configuration to the boilerplate structure, identifying:
   - What's already configured
   - What needs to be added
   - What needs to be modified

4. **Documentation Reference:** Keep this document as a quick reference for API endpoints, authentication methods, and configuration checkpoints.

### Quick Start

1. **Copy the credentials** (Base URL and Publishable Key) from the "Backend Information" section below.

2. **Use Store API endpoints** for public data (products, regions, collections) - these work with the publishable key.

3. **Use Admin API endpoints** for configuration details - these require admin authentication (login via Admin Dashboard or create admin user via CLI).

4. **Review configuration files** in the boilerplate repository to verify MinIO, Resend, and Stripe module setup.

5. **Test functionality** by uploading files (MinIO), sending emails (Resend), and processing payments (Stripe).

### Important Notes

- The publishable key provided is **temporary** - regenerate for production use.
- Admin API endpoints require authentication - use the Admin Dashboard or create an admin user via Railway CLI.
- Some configuration (MinIO, Resend, Stripe) is in code (`medusa-config.ts`), not directly queryable via API.
- All endpoints are ready to use - copy/paste the examples into your testing environment.

---

## Backend Information

### Base URL
```
https://backend-production-178b.up.railway.app
```

### Publishable API Key
```
pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85
```

**Note:** This is a temporary key. Regenerate for production use.

---

## Store API Endpoints

**Base URL:** `https://backend-production-178b.up.railway.app/store`

**Authentication:** Include publishable key in header:
```
x-publishable-api-key: pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85
```

### Health Check
```bash
GET /health
```
**Full URL:** `https://backend-production-178b.up.railway.app/health`

**Example:**
```bash
curl https://backend-production-178b.up.railway.app/health
```

---

### Regions

#### List Regions
```bash
GET /store/regions
```

**Full URL:** `https://backend-production-178b.up.railway.app/store/regions`

**With Payment Providers:**
```bash
GET /store/regions?fields=*payment_providers
```

**With Fulfillment Providers:**
```bash
GET /store/regions?fields=*fulfillment_providers
```

**With Sales Channels:**
```bash
GET /store/regions?fields=*sales_channels
```

**Example:**
```bash
curl -H "x-publishable-api-key: pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85" \
  https://backend-production-178b.up.railway.app/store/regions
```

---

### Products

#### List Products
```bash
GET /store/products
```

**Full URL:** `https://backend-production-178b.up.railway.app/store/products`

**With Limit:**
```bash
GET /store/products?limit=10
```

**Example:**
```bash
curl -H "x-publishable-api-key: pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85" \
  https://backend-production-178b.up.railway.app/store/products
```

---

### Collections

#### List Collections
```bash
GET /store/collections
```

**Full URL:** `https://backend-production-178b.up.railway.app/store/collections`

**Example:**
```bash
curl -H "x-publishable-api-key: pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85" \
  https://backend-production-178b.up.railway.app/store/collections
```

---

### Shipping Options

#### Get Shipping Options (Requires Cart ID)
```bash
GET /store/shipping-options?cart_id={cart_id}
```

**Full URL:** `https://backend-production-178b.up.railway.app/store/shipping-options?cart_id={cart_id}`

**Note:** Requires a cart to be created first.

---

## Admin API Endpoints

**Base URL:** `https://backend-production-178b.up.railway.app/admin`

**Authentication:** Requires admin session cookie or JWT token

**Note:** Admin API requires authentication. Use Admin Dashboard login or create admin user via CLI.

### Store Settings

#### Get Store Configuration
```bash
GET /admin/store
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/store`

**Returns:**
- Store name
- Default currency
- Default region
- Default sales channel
- Default location
- Available currencies

---

### Regions

#### List Regions (Admin)
```bash
GET /admin/regions
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/regions`

**With Fields:**
```bash
GET /admin/regions?fields=id,name,currency_code,*countries,*payment_providers
```

---

### Tax Regions

#### List Tax Regions
```bash
GET /admin/tax-regions
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/tax-regions`

**Returns:**
- Tax region ID
- Country
- Default tax rate
- Tax code
- Tax provider

---

### Sales Channels

#### List Sales Channels
```bash
GET /admin/sales-channels
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/sales-channels`

**Returns:**
- Sales channel ID
- Name
- Description
- Status

---

### Payment Providers

#### List Payment Providers
```bash
GET /admin/payment-providers
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/payment-providers`

**Returns:**
- Provider ID (e.g., `pp_stripe_stripe`, `pp_system_default`)
- Enabled status
- Region assignments

**Check for Stripe:**
```bash
GET /admin/payment-providers?id=pp_stripe_stripe
```

---

### Fulfillment Providers

#### List Fulfillment Providers
```bash
GET /admin/fulfillment-providers
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/fulfillment-providers`

**Returns:**
- Provider ID
- Enabled status
- Stock location assignments

---

### Stock Locations

#### List Stock Locations
```bash
GET /admin/stock-locations
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/stock-locations`

**Returns:**
- Location ID
- Name
- Address
- Sales channels linked

---

### Shipping Options

#### List Shipping Options
```bash
GET /admin/shipping-options
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/shipping-options`

**Returns:**
- Shipping option ID
- Name
- Fulfillment provider
- Service zone
- Shipping profile
- Prices

---

### Product Types

#### List Product Types
```bash
GET /admin/product-types
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/product-types`

---

### Product Tags

#### List Product Tags
```bash
GET /admin/product-tags
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/product-tags`

---

### Publishable API Keys

#### List Publishable API Keys
```bash
GET /admin/api-keys?type=publishable
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/api-keys?type=publishable`

**Returns:**
- Key ID
- Title
- Sales channels linked
- Token (masked)

---

### Inventory Items

#### List Inventory Items
```bash
GET /admin/inventory-items
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/inventory-items`

---

## Configuration-Specific Endpoints

### Check Stripe Configuration

#### 1. Check Payment Providers
```bash
GET /admin/payment-providers?id=pp_stripe_stripe
```

**Full URL:** `https://backend-production-178b.up.railway.app/admin/payment-providers?id=pp_stripe_stripe`

**Expected Response:**
- Provider ID: `pp_stripe_stripe`
- Enabled: `true`
- Regions: List of regions where Stripe is enabled

#### 2. Check Regions with Stripe
```bash
GET /admin/regions?fields=id,name,*payment_providers
```

**Look for:** `pp_stripe_stripe` in payment_providers array

---

### Check MinIO Configuration

**Note:** MinIO configuration is in `medusa-config.ts`, not accessible via API. Check:

1. **File Upload Test**
   ```bash
   POST /admin/uploads
   ```
   **Full URL:** `https://backend-production-178b.up.railway.app/admin/uploads`
   
   **Requires:** Admin authentication + multipart/form-data file upload
   
   **Check Response:**
   - File URL should point to MinIO endpoint
   - URL format: `https://[minio-endpoint]/[bucket]/[filename]`

2. **Check Product Images**
   ```bash
   GET /store/products?fields=*images
   ```
   
   **Look for:** Image URLs that point to MinIO endpoint (not AWS S3)

3. **Review medusa-config.ts**
   - Look for File Module configuration
   - Check for `@medusajs/medusa/file-s3` provider
   - Verify MinIO endpoint, bucket, credentials

---

### Check Resend Configuration

**Note:** Resend configuration is in `medusa-config.ts`, not directly accessible via API. Check:

1. **Review medusa-config.ts**
   - Look for Notification Module configuration
   - Check for `@medusajs/medusa/notification-resend` provider
   - Verify Resend API key configuration

2. **Test Email Sending** (if possible)
   - Trigger password reset email
   - Check if emails are sent via Resend
   - Verify email delivery

3. **Check Environment Variables**
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (if configured)

---

## Quick Reference: All Endpoints

### Store API (Public - Publishable Key)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/store/regions` | GET | List regions |
| `/store/products` | GET | List products |
| `/store/collections` | GET | List collections |
| `/store/shipping-options?cart_id={id}` | GET | Get shipping options |

### Admin API (Requires Authentication)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/admin/store` | GET | Store settings |
| `/admin/regions` | GET | List regions (admin) |
| `/admin/tax-regions` | GET | List tax regions |
| `/admin/sales-channels` | GET | List sales channels |
| `/admin/payment-providers` | GET | List payment providers |
| `/admin/fulfillment-providers` | GET | List fulfillment providers |
| `/admin/stock-locations` | GET | List stock locations |
| `/admin/shipping-options` | GET | List shipping options |
| `/admin/product-types` | GET | List product types |
| `/admin/product-tags` | GET | List product tags |
| `/admin/api-keys?type=publishable` | GET | List publishable keys |
| `/admin/inventory-items` | GET | List inventory items |
| `/admin/uploads` | POST | Upload file (test MinIO) |

---

## Example Scripts

### Node.js Example

```javascript
const BASE_URL = 'https://backend-production-178b.up.railway.app';
const PUBLISHABLE_KEY = 'pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85';

// Store API request
async function getRegions() {
  const response = await fetch(`${BASE_URL}/store/regions`, {
    headers: {
      'x-publishable-api-key': PUBLISHABLE_KEY
    }
  });
  return response.json();
}

// Admin API request (requires authentication)
async function getStoreSettings(adminToken) {
  const response = await fetch(`${BASE_URL}/admin/store`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  return response.json();
}
```

### cURL Examples

#### Store API
```bash
# Health check
curl https://backend-production-178b.up.railway.app/health

# Get regions
curl -H "x-publishable-api-key: pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85" \
  https://backend-production-178b.up.railway.app/store/regions

# Get products
curl -H "x-publishable-api-key: pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85" \
  https://backend-production-178b.up.railway.app/store/products
```

#### Admin API (requires session cookie)
```bash
# First, login via Admin Dashboard to get session cookie
# Then use cookie in requests:

curl -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  https://backend-production-178b.up.railway.app/admin/store
```

---

## Admin Dashboard Access

**URL:** `https://backend-production-178b.up.railway.app/app`

**To Access:**
1. Navigate to the URL above
2. Login with admin credentials
3. Or create admin user via Railway CLI:
   ```bash
   railway ssh
   npx medusa user -e admin@example.com -p YOUR_PASSWORD
   ```

---

## Configuration Files to Review

### Backend Configuration
- **File:** `backend/medusa-config.ts`
- **Check for:**
  - File Module (MinIO/S3)
  - Notification Module (Resend)
  - Payment Module (Stripe)

### Environment Variables
Check Railway environment variables for:
- `S3_ACCESS_KEY_ID` / `MINIO_ACCESS_KEY`
- `S3_SECRET_ACCESS_KEY` / `MINIO_SECRET_KEY`
- `S3_BUCKET` / `MINIO_BUCKET`
- `S3_ENDPOINT` / `MINIO_ENDPOINT`
- `RESEND_API_KEY`
- `STRIPE_API_KEY`
- `STRIPE_PUBLISHABLE_KEY`

---

## Notes

1. **Publishable Key:** This is a temporary key for exploration. Regenerate for production.

2. **Admin API:** Requires authentication. Use Admin Dashboard or create admin user via CLI.

3. **MinIO/Resend/Stripe:** Configuration is in `medusa-config.ts`, not directly queryable via API. Review the file or test functionality.

4. **SSL Certificate:** Some curl clients may have SSL issues. Use Node.js `fetch` or add `-k` flag to curl (insecure, for testing only).

5. **Rate Limiting:** Be mindful of rate limits when testing endpoints.

---

**Last Updated:** January 3, 2026  
**Backend URL:** https://backend-production-178b.up.railway.app  
**Publishable Key:** `pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85`

