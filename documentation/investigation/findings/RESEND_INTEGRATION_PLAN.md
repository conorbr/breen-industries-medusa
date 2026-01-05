# Resend Email Integration Plan

**Date:** January 3, 2026  
**Priority:** 🔴 **HIGH** - Complete POC  
**Status:** Planning

---

## Objective

Verify and complete Resend email integration to enable transactional emails (order confirmations) for the POC.

---

## Current State Analysis

### ✅ What's Already Implemented

1. **Resend Service Module** (`backend/src/modules/email-notifications/`)
   - ✅ Custom Resend notification service
   - ✅ React Email template support
   - ✅ Order placed email template
   - ✅ Invite user email template
   - ✅ Base email template

2. **Subscribers**
   - ✅ `order-placed.ts` - Sends email on order placement
   - ✅ `invite-created.ts` - Sends email on user invite

3. **Configuration**
   - ✅ Resend module configured in `medusa-config.js`
   - ✅ Conditional loading (only if `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set)

### ⚠️ What Needs Verification

1. **Environment Variables**
   - `RESEND_API_KEY` - Needs to be set in Railway
   - `RESEND_FROM_EMAIL` - Needs to be set in Railway

2. **Email Template Data**
   - Order template expects specific data structure
   - Need to verify order data structure matches template

3. **Testing**
   - No test emails sent yet
   - Need to verify end-to-end flow

---

## Integration Plan

### Phase 1: Configuration Verification (30 minutes)

#### Step 1.1: Check Environment Variables
**Action:** Verify Resend credentials in Railway environment variables

**Required Variables:**
```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@breenindustries.com
```

**Verification:**
- [ ] Check Railway dashboard for `RESEND_API_KEY`
- [ ] Check Railway dashboard for `RESEND_FROM_EMAIL`
- [ ] Verify email domain is verified in Resend dashboard

**Expected Result:** Both variables exist and are valid

---

#### Step 1.2: Verify Module Configuration
**Action:** Confirm Resend module is loaded in medusa-config.js

**Check:**
- [ ] `medusa-config.js` includes Resend module configuration
- [ ] Module resolves to `./src/modules/email-notifications`
- [ ] Configuration passes `api_key` and `from` options

**Expected Result:** Module configuration is correct

---

#### Step 1.3: Verify Domain in Resend
**Action:** Ensure sending domain is verified in Resend

**Requirements:**
- [ ] Domain verified in Resend dashboard (e.g., `breenindustries.com`)
- [ ] DNS records configured (SPF, DKIM, DMARC)
- [ ] `RESEND_FROM_EMAIL` uses verified domain

**Expected Result:** Domain is verified and ready to send

---

### Phase 2: Code Review & Fixes (1 hour)

#### Step 2.1: Review Order Placed Subscriber
**File:** `backend/src/subscribers/order-placed.ts`

**Issues to Check:**
- [ ] Order data structure matches template expectations
- [ ] Shipping address retrieval works correctly
- [ ] Error handling is adequate
- [ ] Reply-to email is appropriate (currently `info@example.com`)

**Potential Issues:**
1. **Order data structure** - Template expects `order.display_id` and `order.summary.raw_current_order_total.value`
2. **Shipping address** - Uses internal service access `orderAddressService_`
3. **Reply-to** - Hardcoded to `info@example.com` (should be configurable)

**Action Items:**
- [ ] Verify order data structure in actual order object
- [ ] Test shipping address retrieval
- [ ] Update reply-to email to use environment variable or store-specific email

---

#### Step 2.2: Review Email Template
**File:** `backend/src/modules/email-notifications/templates/order-placed.tsx`

**Issues to Check:**
- [ ] Template renders correctly
- [ ] All order data is displayed properly
- [ ] Currency formatting is correct
- [ ] Date formatting is correct

**Action Items:**
- [ ] Test template rendering with sample data
- [ ] Verify currency code display
- [ ] Check date formatting

---

#### Step 2.3: Fix Known Issues

**Issue 1: Reply-to Email**
- **Current:** Hardcoded `info@example.com`
- **Fix:** Use environment variable or make it configurable per store

**Issue 2: Order Data Structure**
- **Check:** Verify `order.display_id` exists
- **Check:** Verify `order.summary.raw_current_order_total.value` structure

---

### Phase 3: Testing (1-2 hours)

#### Step 3.1: Test Email Template Rendering
**Action:** Use React Email dev server to preview templates

**Command:**
```bash
cd backend
pnpm email:dev
```

**Steps:**
1. [ ] Start email dev server
2. [ ] Preview order-placed template
3. [ ] Verify template renders correctly
4. [ ] Check responsive design
5. [ ] Verify all data displays properly

**Expected Result:** Template renders correctly in browser

---

#### Step 3.2: Test Resend API Connection
**Action:** Create a test script to verify Resend API works

**Script:** `documentation/investigation/scripts/test-resend.js`

**Steps:**
1. [ ] Create test script
2. [ ] Test sending a simple email via Resend API
3. [ ] Verify email is received
4. [ ] Check Resend dashboard for delivery status

**Expected Result:** Test email is sent and received

---

#### Step 3.3: Test Order Placed Subscriber
**Action:** Trigger order.placed event and verify email is sent

**Methods:**
1. **Create test order via API** (if possible)
2. **Use Medusa admin to create draft order and complete it**
3. **Trigger event manually via script**

**Steps:**
1. [ ] Create a test order
2. [ ] Complete the order (trigger `order.placed` event)
3. [ ] Check logs for email sending
4. [ ] Verify email is received
5. [ ] Check email content is correct

**Expected Result:** Order confirmation email is sent and received

---

#### Step 3.4: Test Invite User Subscriber
**Action:** Create a user invite and verify email is sent

**Steps:**
1. [ ] Create user invite via Admin Dashboard
2. [ ] Check logs for email sending
3. [ ] Verify email is received
4. [ ] Check email content and invite link

**Expected Result:** Invite email is sent and received

---

### Phase 4: Error Handling & Logging (30 minutes)

#### Step 4.1: Improve Error Handling
**Action:** Enhance error handling in subscriber

**Current Issues:**
- Errors are only logged to console
- No retry mechanism
- No error notification

**Improvements:**
- [ ] Add structured logging
- [ ] Log to file or monitoring service
- [ ] Add error context (order ID, email address)
- [ ] Consider retry logic for transient failures

---

#### Step 4.2: Add Logging
**Action:** Add detailed logging for debugging

**Log Points:**
- [ ] When subscriber is triggered
- [ ] When order data is retrieved
- [ ] When email is sent successfully
- [ ] When email fails to send
- [ ] Resend API response details

---

### Phase 5: Production Readiness (30 minutes)

#### Step 5.1: Update Email Content
**Action:** Customize email templates for production

**Updates Needed:**
- [ ] Update reply-to email (from `info@example.com`)
- [ ] Update email subject lines
- [ ] Add store branding (if needed)
- [ ] Update preview text

---

#### Step 5.2: Verify Environment Variables
**Action:** Ensure all environment variables are set in Railway

**Checklist:**
- [ ] `RESEND_API_KEY` is set
- [ ] `RESEND_FROM_EMAIL` is set
- [ ] Email domain is verified in Resend
- [ ] DNS records are configured

---

## Testing Checklist

### Unit Tests
- [ ] Email template renders correctly
- [ ] Template data validation works
- [ ] Resend service sends emails

### Integration Tests
- [ ] Order placed event triggers email
- [ ] Invite created event triggers email
- [ ] Email is received by recipient
- [ ] Email content is correct

### End-to-End Tests
- [ ] Complete order flow sends email
- [ ] Email contains correct order information
- [ ] Email is formatted correctly
- [ ] Email links work (if any)

---

## Success Criteria

### POC Completion Criteria
1. ✅ Resend API key configured
2. ✅ Resend from email configured
3. ✅ Order placed email is sent successfully
4. ✅ Email is received by customer
5. ✅ Email content is correct and formatted
6. ✅ Error handling works (logs errors appropriately)

### Acceptance Criteria
- [ ] Test order triggers email within 5 seconds
- [ ] Email is delivered to recipient inbox
- [ ] Email contains all order details
- [ ] Email is properly formatted (responsive)
- [ ] No errors in logs (except expected test errors)

---

## Implementation Steps

### Step 1: Verify Configuration (Now)
1. Check Railway environment variables
2. Verify Resend domain is verified
3. Confirm module is configured correctly

### Step 2: Fix Code Issues (If Any)
1. Update reply-to email
2. Verify order data structure
3. Test template rendering

### Step 3: Test Email Sending
1. Test Resend API connection
2. Test order placed subscriber
3. Test invite user subscriber

### Step 4: Verify End-to-End
1. Create test order
2. Verify email is sent
3. Verify email is received
4. Check email content

---

## Troubleshooting Guide

### Issue: Email Not Sending

**Possible Causes:**
1. `RESEND_API_KEY` not set or invalid
2. `RESEND_FROM_EMAIL` not set or invalid
3. Domain not verified in Resend
4. DNS records not configured
5. Subscriber not registered
6. Order data structure mismatch

**Debug Steps:**
1. Check Railway environment variables
2. Check Resend dashboard for API key status
3. Check Resend dashboard for domain verification
4. Check backend logs for errors
5. Test Resend API directly
6. Verify subscriber is registered

---

### Issue: Email Template Errors

**Possible Causes:**
1. Order data structure doesn't match template
2. Missing required fields
3. Type errors in template

**Debug Steps:**
1. Check order data structure
2. Test template with sample data
3. Check TypeScript errors
4. Review template code

---

### Issue: Email Not Received

**Possible Causes:**
1. Email went to spam
2. Invalid recipient email
3. Resend API error
4. Domain reputation issues

**Debug Steps:**
1. Check spam folder
2. Verify recipient email is valid
3. Check Resend dashboard for delivery status
4. Check Resend logs for errors
5. Verify domain reputation

---

## Files to Review/Modify

### Configuration Files
- `backend/medusa-config.js` - Resend module configuration
- `backend/src/lib/constants.ts` - Environment variable constants

### Service Files
- `backend/src/modules/email-notifications/services/resend.ts` - Resend service implementation
- `backend/src/modules/email-notifications/index.ts` - Module exports

### Template Files
- `backend/src/modules/email-notifications/templates/order-placed.tsx` - Order confirmation template
- `backend/src/modules/email-notifications/templates/base.tsx` - Base template
- `backend/src/modules/email-notifications/templates/index.tsx` - Template registry

### Subscriber Files
- `backend/src/subscribers/order-placed.ts` - Order placed event handler
- `backend/src/subscribers/invite-created.ts` - Invite created event handler

---

## Testing Scripts to Create

### 1. Test Resend API Connection
**File:** `documentation/investigation/scripts/test-resend-api.js`

**Purpose:** Test Resend API directly with credentials

### 2. Test Order Email
**File:** `documentation/investigation/scripts/test-order-email.js`

**Purpose:** Trigger order.placed event and verify email is sent

### 3. Test Email Template
**File:** `documentation/investigation/scripts/test-email-template.js`

**Purpose:** Render email template with sample data

---

## Timeline

### Day 1: Configuration & Verification (2 hours)
- ✅ Verify environment variables
- ✅ Check Resend domain
- ✅ Review code
- ✅ Fix any configuration issues

### Day 1: Testing (2 hours)
- ✅ Test Resend API connection
- ✅ Test email template rendering
- ✅ Test order placed subscriber
- ✅ Verify email delivery

### Day 1: Final Verification (1 hour)
- ✅ End-to-end test
- ✅ Fix any issues
- ✅ Document results

**Total Estimated Time:** 5 hours

---

## Next Steps

1. **Immediate:** Verify Resend API key and from email in Railway
2. **Next:** Test Resend API connection
3. **Then:** Test order placed subscriber
4. **Finally:** Verify end-to-end email delivery

---

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Node.js SDK](https://resend.com/docs/send-with-nodejs)
- [React Email Documentation](https://react.email)
- [Medusa Notification Module Guide](https://docs.medusajs.com/resources/references/notification-provider-module)

---

**Status:** Ready to Execute  
**Priority:** 🔴 **HIGH** - POC Completion

