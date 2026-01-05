# Admin API Authentication Issue

**Date:** January 3, 2026  
**Status:** Investigation Required

## Problem

All admin API endpoints are returning `401 Unauthorized` when using the secret key directly as a Bearer token.

## Current Authentication Attempt

The script is currently using:
```javascript
headers['Authorization'] = `Bearer ${SECRET_KEY}`;
```

This approach is failing for all admin endpoints.

## Medusa v2 Admin Authentication

Based on the codebase search, Medusa v2 uses token-based authentication:

1. **Token Endpoint:** `/admin/auth/token`
2. **Request:** POST with `email` and `password`
3. **Response:** Returns `access_token`
4. **Usage:** Use `access_token` as Bearer token

Example from `storefront/e2e/data/seed.ts`:
```javascript
const resp = await axios.post("/admin/auth/token", {
  email: process.env.MEDUSA_ADMIN_EMAIL || "admin@medusa-test.com",
  password: process.env.MEDUSA_ADMIN_PASSWORD || "supersecret",
})
return axios.create({
  headers: {
    Authorization: `Bearer ${resp.data.access_token}`,
  },
})
```

## Secret Key Provided

The secret key provided: `sk_23736aa7a9e5800dd1bdedb61ca6e0a8269b78b98f71307c51bc6861ac0d1770`

This appears to be a **secret API key** (format: `sk_...`), not an access token.

## Possible Solutions

### Option 1: Use Secret Key as API Key Header
Medusa v2 might support secret keys via a different header. Try:
- `x-medusa-secret-key: ${SECRET_KEY}`
- `x-api-key: ${SECRET_KEY}`
- `medusa-secret-key: ${SECRET_KEY}`

### Option 2: Authenticate via Token Endpoint
If we have admin email/password credentials:
1. POST to `/admin/auth/token` with email/password
2. Extract `access_token` from response
3. Use `access_token` as Bearer token

### Option 3: Use Session Cookie
As mentioned in the API reference document, admin API can use session cookies:
1. Login via Admin Dashboard
2. Extract session cookie (`connect.sid`)
3. Use cookie in requests

## Test Results

**All authentication methods tested:**
- ❌ Bearer Token: `Authorization: Bearer ${SECRET_KEY}`
- ❌ x-medusa-secret-key header
- ❌ x-api-key header
- ❌ medusa-secret-key header
- ❌ Authorization: Token format
- ❌ Query parameter

**Result:** None of the direct secret key methods work.

## Conclusion

The secret key provided (`sk_...`) **cannot be used directly** for admin API authentication. Medusa v2 requires:

1. **Token-based authentication** via `/admin/auth/token` endpoint (requires email/password)
2. **Session cookie** from Admin Dashboard login

The secret key format suggests it might be:
- A secret API key for a different purpose (not admin API)
- A key that needs to be exchanged for a token
- A key that's been revoked or invalid

## Next Steps

1. **Get Admin Credentials** - Email and password for `/admin/auth/token` endpoint
2. **Use Admin Dashboard** - Login at `https://backend-production-178b.up.railway.app/app` and extract session cookie
3. **Verify Secret Key Purpose** - Confirm what this secret key is actually for (might not be for admin API)

## Current Status

- ✅ Store API working (publishable key)
- ❌ Admin API failing (authentication issue - secret key not valid for direct use)
- ✅ Store endpoints successfully queried (products, collections)
- ❌ All admin endpoints returning 401 Unauthorized

## Files Affected

- `scripts/query-current-state.js` - Needs authentication fix
- `scripts/config.js` - Contains secret key

