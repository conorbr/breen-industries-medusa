# Investigation Scripts

Scripts for querying and analyzing the current backend configuration.

## Setup

These scripts use Node.js built-in `fetch` (Node 18+) or require a fetch polyfill.

## Scripts

### `query-current-state.js` (Native Fetch)

Queries all relevant API endpoints using native fetch API and session cookie authentication.

**Usage:**
```bash
node query-current-state.js
```

**Output:**
- `health.json` - Health check status
- `store-*.json` - Store API responses (regions, products, collections)
- `admin-*.json` - Admin API responses (all configuration endpoints)
- `stripe-config.json` - Stripe-specific configuration check

**Status:** ✅ Working - Uses session cookie authentication

### `query-current-state-sdk.js` (Medusa JS SDK)

Queries all relevant API endpoints using the official Medusa JS SDK. Uses session cookie for authentication (SDK's built-in auth has issues with this backend).

**Prerequisites:**
```bash
npm install @medusajs/js-sdk @medusajs/types
```

**Usage:**
```bash
node query-current-state-sdk.js
```

**Benefits:**
- Type safety with TypeScript
- Cleaner API calls
- Better error messages
- Uses SDK methods for all endpoints

**Status:** ✅ Working - Uses session cookie passed as headers to SDK methods

**Note:** The SDK's built-in authentication (`auth.login()`) doesn't work with this backend, so we pass the session cookie as custom headers to each SDK method call.

### `test-auth.js`

Tests different authentication methods for admin API access.

**Usage:**
```bash
node test-auth.js
```

**Purpose:** Determine which authentication method works for admin API

### `test-resend-api.js`

Tests Resend API connection directly to verify email sending works.

**Prerequisites:**
- `RESEND_API_KEY` environment variable or in config.js
- `RESEND_FROM_EMAIL` environment variable or in config.js
- `TEST_EMAIL` environment variable (optional, defaults to test@example.com)

**Usage:**
```bash
RESEND_API_KEY=re_... RESEND_FROM_EMAIL=noreply@breenindustries.com node test-resend-api.js
```

**Purpose:** Verify Resend API key and email sending works

### `test-order-email.js`

Tests order placed email subscriber (requires manual order creation).

**Usage:**
```bash
node test-order-email.js [order_id]
```

**Purpose:** Guide for testing order confirmation emails

## Authentication

- **Store API:** Uses publishable key (`x-publishable-api-key` header)
- **Admin API:** Uses session cookie (`Cookie: connect.sid=...` header)

## Notes

- All scripts save results as JSON files for later analysis
- Errors are logged but don't stop the investigation
- Results can be compared with requirements to identify gaps
