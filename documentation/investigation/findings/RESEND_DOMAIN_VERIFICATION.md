# Resend Domain Verification Issue

**Date:** January 3, 2026  
**Status:** ⚠️ Domain Not Verified

---

## Issue

Attempted to send test emails from:
- `support@breenindustries.com`
- `admin@breenindustries.com`

Both failed with the same error:

```
The breenindustries.com domain is not verified. 
Please, add and verify your domain on https://resend.com/domains
```

---

## Solution Options

### Option 1: Use Test Email for POC (Immediate)

For POC testing, use Resend's verified test domain:

```env
RESEND_FROM_EMAIL=onboarding@resend.dev
```

✅ **Pros:** Works immediately, no setup required  
❌ **Cons:** Not production-ready, emails show as "onboarding@resend.dev"

### Option 2: Verify Domain in Resend (Production)

To use `admin@breenindustries.com`, `support@breenindustries.com`, or any `@breenindustries.com` email:

1. **Go to Resend Dashboard:** https://resend.com/domains
2. **Add Domain:** `breenindustries.com`
3. **Configure DNS Records:**
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
4. **Verify Domain:** Wait for DNS propagation and verification
5. **Update Environment Variable:**
   ```env
   RESEND_FROM_EMAIL=admin@breenindustries.com
   # or
   RESEND_FROM_EMAIL=support@breenindustries.com
   # or any other @breenindustries.com address
   ```

✅ **Pros:** Production-ready, professional email addresses  
❌ **Cons:** Requires DNS access, takes time to verify

---

## Current Configuration

For POC testing, we're using:
- **From Email:** `onboarding@resend.dev` (Resend's verified test domain)
- **Test Recipient:** `last.frame5769@fastmail.com`

This allows immediate testing without domain verification.

---

## Next Steps

### For POC (Now):
1. ✅ Use `onboarding@resend.dev` for testing
2. ✅ Test order confirmation emails
3. ✅ Verify email delivery works

### For Production (Later):
1. ⏳ Verify `breenindustries.com` domain in Resend
2. ⏳ Configure DNS records
3. ⏳ Update `RESEND_FROM_EMAIL` to `admin@breenindustries.com` (or `support@breenindustries.com`, `noreply@breenindustries.com`, etc.)
4. ⏳ Update `RESEND_REPLY_TO_EMAIL` to `support@breenindustries.com` (or preferred reply-to address)

---

## DNS Records Needed

When verifying domain, you'll need to add these DNS records:

### SPF Record
```
Type: TXT
Name: @ (or breenindustries.com)
Value: v=spf1 include:resend.com ~all
```

### DKIM Record
```
Type: TXT
Name: resend._domainkey
Value: [Provided by Resend dashboard]
```

### DMARC Record (Optional)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@breenindustries.com
```

---

**Last Updated:** January 3, 2026

