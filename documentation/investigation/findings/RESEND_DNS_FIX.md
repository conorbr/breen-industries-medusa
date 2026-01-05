# Resend DNS Configuration Fix

**Date:** January 3, 2026  
**Issue:** SPF record needs to include Resend

---

## Current DNS Status

**SPF Record Found:**
```
v=spf1 include:spf.messagingengine.com ?all
```

This is configured for Fastmail, but **does not include Resend**.

---

## Required DNS Changes

### SPF Record Update

**Current (Fastmail only):**
```
v=spf1 include:spf.messagingengine.com ?all
```

**Required (Fastmail + Resend):**
```
v=spf1 include:spf.messagingengine.com include:resend.com ~all
```

**Or (Resend only, if not using Fastmail for sending):**
```
v=spf1 include:resend.com ~all
```

**Note:** 
- `~all` is recommended (soft fail) vs `?all` (neutral)
- If you need both Fastmail and Resend, include both

### DKIM Record

**Required:** Add DKIM record as provided by Resend dashboard

**Format:**
```
Type: TXT
Name: resend._domainkey (or as specified by Resend)
Value: [Provided by Resend dashboard]
TTL: 3600
```

**To get the DKIM record:**
1. Go to https://resend.com/domains
2. Click on `breenindustries.com`
3. Copy the DKIM record value
4. Add it to your DNS

---

## Steps to Fix

### 1. Update SPF Record

1. Go to your DNS provider (where `breenindustries.com` DNS is managed)
2. Find the existing SPF TXT record
3. Update the value to include Resend:
   ```
   v=spf1 include:spf.messagingengine.com include:resend.com ~all
   ```
4. Save the changes

### 2. Add DKIM Record

1. Go to Resend dashboard: https://resend.com/domains
2. Click on `breenindustries.com`
3. Find the DKIM record (usually named `resend._domainkey`)
4. Copy the record name and value
5. Add to your DNS provider:
   - Type: TXT
   - Name: `resend._domainkey` (or as shown in Resend)
   - Value: [The value from Resend]
   - TTL: 3600

### 3. Wait for DNS Propagation

- DNS changes typically take 5-15 minutes
- Can take up to 1 hour in some cases
- Check propagation using:
  ```bash
  dig TXT breenindustries.com
  dig TXT resend._domainkey.breenindustries.com
  ```

### 4. Verify in Resend Dashboard

1. Go to https://resend.com/domains
2. Check domain status
3. All records should show as verified ✅
4. Domain status should be "Verified"

### 5. Test Email Sending

After verification:
1. Wait 5-10 minutes after DNS records show as verified
2. Run test script:
   ```bash
   cd backend
   node test-resend-simple.js
   ```
3. Check for success ✅

---

## Verification Commands

After updating DNS, verify records:

```bash
# Check SPF record
dig TXT breenindustries.com +short

# Should show:
# "v=spf1 include:spf.messagingengine.com include:resend.com ~all"

# Check DKIM record
dig TXT resend._domainkey.breenindustries.com +short

# Should show the DKIM value from Resend
```

---

## Quick Reference

**SPF Record (with Fastmail + Resend):**
```
Type: TXT
Name: @ (or breenindustries.com)
Value: v=spf1 include:spf.messagingengine.com include:resend.com ~all
```

**DKIM Record:**
```
Type: TXT
Name: resend._domainkey (or as provided by Resend)
Value: [From Resend dashboard]
```

**DMARC Record (Optional but recommended):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@breenindustries.com
```

---

## After DNS Update

1. ✅ Update SPF record to include Resend
2. ✅ Add DKIM record from Resend
3. ⏳ Wait 5-15 minutes for DNS propagation
4. ⏳ Check Resend dashboard for verification
5. ⏳ Test email sending

---

**Last Updated:** January 3, 2026

