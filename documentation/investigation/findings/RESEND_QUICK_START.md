# Resend Email Integration - Quick Start

**Status:** Ready to Configure

---

## Immediate Action Items

### 1. Set Environment Variables in Railway (5 minutes)

Go to Railway dashboard → Backend service → Variables tab → Add:

```env
RESEND_API_KEY=re_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B
RESEND_FROM_EMAIL=admin@breenindustries.com
RESEND_REPLY_TO_EMAIL=support@breenindustries.com
```

**Note:** ✅ Domain `breenindustries.com` is verified in Resend. Test email sent successfully!

**Then:** Restart the backend service

---

### 2. Verify Configuration (5 minutes)

After restart, check backend logs for:
- ✅ Resend module loaded
- ✅ No configuration errors

---

### 3. Test Email Sending (10 minutes)

**Method 1: Create Test Order**
1. Go to Admin Dashboard: https://backend-production-178b.up.railway.app/app
2. Create draft order
3. Add items
4. Set customer email to: `last.frame5769@fastmail.com`
5. Complete order
6. Check email inbox at `last.frame5769@fastmail.com`

**Method 2: Create User Invite**
1. Go to Admin Dashboard → Users → Invite User
2. Enter test email: `last.frame5769@fastmail.com`
3. Send invite
4. Check email inbox at `last.frame5769@fastmail.com`

---

## Expected Results

✅ **Success Indicators:**
- Backend logs show: `✅ Order confirmation email sent to [email]`
- Email received in inbox (check spam folder too)
- Resend dashboard shows delivery status

❌ **If Email Not Received:**
- Check backend logs for errors
- Verify environment variables are set
- Check Resend dashboard for API key status
- Verify test email address is correct

---

## Files Updated

- ✅ `backend/src/lib/constants.ts` - Added `RESEND_REPLY_TO_EMAIL`
- ✅ `backend/src/subscribers/order-placed.ts` - Improved error handling
- ✅ `backend/src/subscribers/invite-created.ts` - Improved error handling
- ✅ `backend/test-resend.js` - Test script created

---

## Next Steps After Testing

1. ✅ Verify emails are sending
2. ✅ Test with real order
3. ✅ Configure production domain (if needed)
4. ✅ Update reply-to email (if needed)

---

**Ready to test!** 🚀

