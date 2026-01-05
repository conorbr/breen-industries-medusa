# Test Email Configuration

**Date:** January 3, 2026  
**Status:** ✅ Test Email Configured

---

## Test Email Address

**Email:** `last.frame5769@fastmail.com`

This email address is configured for testing Resend email integration.

---

## Usage

### Test Order Email

1. Set environment variables in Railway:
   ```env
   RESEND_API_KEY=re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

2. Create a test order in Admin Dashboard:
   - Customer email: `last.frame5769@fastmail.com`
   - Complete the order
   - Check inbox at `last.frame5769@fastmail.com`

### Test Invite Email

1. Go to Admin Dashboard → Users → Invite User
2. Enter email: `last.frame5769@fastmail.com`
3. Send invite
4. Check inbox at `last.frame5769@fastmail.com`

### Test Resend API Directly

```bash
cd backend
RESEND_API_KEY=re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B \
RESEND_FROM_EMAIL=onboarding@resend.dev \
TEST_EMAIL=last.frame5769@fastmail.com \
node test-resend.js
```

---

## Expected Results

✅ **Success:**
- Email received at `last.frame5769@fastmail.com`
- Email contains correct content
- Email is properly formatted

❌ **If Not Received:**
- Check spam folder
- Verify environment variables are set
- Check backend logs
- Verify Resend API key is valid

---

**Last Updated:** January 3, 2026

