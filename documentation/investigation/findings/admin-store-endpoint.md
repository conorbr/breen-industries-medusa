# Admin Store Endpoint Issue

**Date:** January 3, 2026  
**Status:** Endpoint Returns Unauthorized

---

## Endpoint Details

**Endpoint:** `/admin/store` (singular) or `/admin/stores` (plural)  
**Method:** GET  
**Purpose:** Retrieve store configuration settings

## Expected Response

According to the API reference, this endpoint should return:
- Store name
- Default currency
- Default region
- Default sales channel
- Default location
- Available currencies

## Current Behavior

**Status:** ❌ Returns "Unauthorized" error

**Error Response:**
```json
{
  "error": "Unauthorized"
}
```

## Investigation

### SDK Method
The SDK calls `adminClient.admin.store.retrieve()` which:
- May be calling `/admin/stores/{id}` (requires an ID)
- Or `/admin/stores` (list endpoint)
- The API reference shows `/admin/store` (singular, no ID)

### Possible Causes

1. **Endpoint Mismatch**
   - SDK might be calling wrong endpoint (`/admin/stores` vs `/admin/store`)
   - SDK's `retrieve()` method may require an ID parameter

2. **Permission Issue**
   - This endpoint might require different permissions
   - Session cookie might not have sufficient privileges

3. **Endpoint Not Available**
   - This endpoint might not be available in this Medusa version
   - May have been deprecated or moved

4. **SDK Implementation Issue**
   - The SDK's `store.retrieve()` might not be implemented correctly
   - May need to use `store.list()` instead

## Impact

**Low Impact** - This endpoint is informational only:
- We can get store information from other endpoints
- Sales channels, regions, and other configs are accessible
- Not critical for the investigation

## Workaround

Since this endpoint is not critical, we can:
1. **Skip this endpoint** - Not needed for investigation
2. **Use alternative endpoints** - Get store info from:
   - `/admin/sales-channels` - Shows default sales channel
   - `/admin/regions` - Shows available regions
   - Other configuration endpoints

## Recommendation

1. **Remove from script** - Not critical for investigation
2. **Document as known issue** - Note that this endpoint doesn't work
3. **Investigate later** - If needed, can check Medusa documentation for correct endpoint

## Related

- API Reference: `documentation/BOILERPLATE_API_REFERENCE.md` (line 184)
- SDK Source: Uses `/admin/stores` (plural) endpoint
- Native Fetch: Also returns 404/Unauthorized

---

**Conclusion:** This is a non-critical endpoint that can be safely ignored for the investigation. All other endpoints are working correctly.

