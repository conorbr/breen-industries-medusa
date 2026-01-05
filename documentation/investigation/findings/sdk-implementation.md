# SDK Implementation Notes

**Date:** January 3, 2026  
**Status:** ✅ Working with Session Cookie

---

## Implementation Summary

The Medusa JS SDK has been successfully integrated into the investigation scripts, but with some authentication workarounds.

## Authentication Issues

### Problem
The SDK's built-in authentication methods (`auth.login()`) fail with this backend:
- `auth.login()` with email/password returns: "Unable to retrieve the auth provider with id: undefined"
- Direct JWT token endpoint (`/admin/auth/token`) returns 401 Unauthorized

### Solution
Using session cookie authentication manually:
1. Session cookie is passed as custom headers to each SDK method call
2. SDK methods accept a `headers` parameter as the last argument
3. Example: `adminClient.admin.region.list({}, { 'Cookie': 'connect.sid=...' })`

## Working Implementation

```javascript
const Medusa = require('@medusajs/js-sdk').default;

const adminClient = new Medusa({
  baseUrl: BASE_URL,
  debug: process.env.NODE_ENV === 'development',
  // No auth config - we use session cookie manually
});

const adminHeaders = {
  'Cookie': `connect.sid=${SESSION_COOKIE}`
};

// Use SDK methods with custom headers
const regions = await adminClient.admin.region.list({}, adminHeaders);
```

## Benefits of SDK Approach

1. **Type Safety** - Better IDE support and type checking
2. **Cleaner Code** - Method calls instead of manual fetch requests
3. **Better Error Handling** - SDK provides structured error responses
4. **Consistency** - Same SDK used in storefront codebase

## Comparison

### Native Fetch (query-current-state.js)
- ✅ Works perfectly
- ✅ Simple and straightforward
- ❌ Manual error handling
- ❌ No type safety

### SDK (query-current-state-sdk.js)
- ✅ Type safety
- ✅ Cleaner API calls
- ✅ Better error messages
- ⚠️ Requires session cookie workaround
- ⚠️ Slightly more complex setup

## Recommendation

Both scripts work well. For investigation purposes, either is fine. For future automation and development:
- **Use SDK version** for better maintainability and type safety
- **Use native fetch** for simple one-off scripts

## Reference

- [Medusa JS SDK Documentation](https://docs.medusajs.com/api/admin#introduction)
- [Medusa Admin API Reference](https://docs.medusajs.com/api/admin)

