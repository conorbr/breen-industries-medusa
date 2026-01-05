# Resend API Key Configuration

**Date:** January 3, 2026  
**Status:** ✅ API Key Received

---

## API Key

**Temporary API Key:**
```
re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B
```

⚠️ **Note:** This is a temporary key for POC testing. Regenerate for production use.

---

## Next Steps

### 1. Set Environment Variables in Railway

Add these environment variables to your Railway backend service:

```env
RESEND_API_KEY=re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note:** `onboarding@resend.dev` is Resend's default test email. For production, you'll need to:
1. Verify your domain in Resend dashboard
2. Configure DNS records (SPF, DKIM, DMARC)
3. Update `RESEND_FROM_EMAIL` to use your verified domain (e.g., `noreply@breenindustries.com`)

### 2. Test Resend API Connection

Once environment variables are set in Railway:

**Option A: Test via Backend (Recommended)**
```bash
cd backend
pnpm install  # If dependencies not installed
RESEND_API_KEY=re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B \
RESEND_FROM_EMAIL=onboarding@resend.dev \
TEST_EMAIL=last.frame5769@fastmail.com \
node test-resend.js
```

**Option B: Test via Investigation Script**
```bash
cd documentation/investigation/scripts
npm install resend  # Install resend package
RESEND_API_KEY=re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B \
RESEND_FROM_EMAIL=onboarding@resend.dev \
TEST_EMAIL=last.frame5769@fastmail.com \
node test-resend-api.js
```

### 3. Test Order Email

1. **Set environment variables in Railway:**
   - `RESEND_API_KEY=re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B`
   - `RESEND_FROM_EMAIL=onboarding@resend.dev`

2. **Restart Railway backend** to load new environment variables

3. **Create a test order:**
   - Go to Admin Dashboard: https://backend-production-178b.up.railway.app/app
   - Create a draft order
   - Add items
   - Set customer email to your test email
   - Complete the order

4. **Check:**
   - Email inbox (and spam folder)
   - Backend logs for email sending confirmation
   - Resend dashboard for delivery status

---

## Verification Checklist

- [ ] `RESEND_API_KEY` set in Railway
- [ ] `RESEND_FROM_EMAIL` set in Railway
- [ ] Backend restarted after setting environment variables
- [ ] Test email sent successfully
- [ ] Order confirmation email sent successfully
- [ ] Emails received in inbox

---

## Troubleshooting

### Email Not Sending

1. **Check environment variables:**
   - Verify `RESEND_API_KEY` is set correctly
   - Verify `RESEND_FROM_EMAIL` is set correctly
   - Restart backend after setting variables

2. **Check Resend dashboard:**
   - Verify API key is active
   - Check for any domain verification requirements
   - Review delivery logs

3. **Check backend logs:**
   - Look for Resend service initialization
   - Check for error messages
   - Verify subscriber is registered

### API Key Invalid

- Verify the API key is correct (no extra spaces)
- Check if API key has been revoked in Resend dashboard
- Ensure API key has proper permissions

### Domain Not Verified

- For production, you must verify your domain in Resend
- Configure DNS records (SPF, DKIM, DMARC)
- Use verified domain email for `RESEND_FROM_EMAIL`

---

## Production Setup

For production, you'll need to:

1. **Get a production API key** from Resend dashboard
2. **Verify your domain** (e.g., `breenindustries.com`)
3. **Configure DNS records:**
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
4. **Update environment variables:**
   ```env
   RESEND_API_KEY=re_... (production key)
   RESEND_FROM_EMAIL=noreply@breenindustries.com
   RESEND_REPLY_TO_EMAIL=support@breenindustries.com
   ```

---

**Last Updated:** January 3, 2026

