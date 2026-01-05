# Current State vs. Requirements Analysis

**Date:** January 3, 2026  
**Status:** Complete - Ready for Action Items

---

## Executive Summary

The investigation successfully queried the backend and identified significant gaps between the current boilerplate configuration and the multi-store requirements. The backend is in a default/demo state and requires substantial configuration to support 4 independent stores.

---

## 1. Sales Channels

### Current State
- **Count:** 1 sales channel
- **Name:** "Default Sales Channel"
- **ID:** `sc_01KE2S8KV6EZCWPCTB4CQRQKSV`
- **Status:** Active

### Requirements
- **Count:** 4 sales channels needed
  1. howtoloadadishwasher.com
  2. flirtywineboys.com
  3. manmitt.com
  4. dublinhearthcompany.com

### Gap
❌ **Missing 3 sales channels** - Need to create 3 additional sales channels

### Action Items
1. Create sales channel: "How to Load a Dishwasher"
2. Create sales channel: "Flirty Wine Boys"
3. Create sales channel: "Man Mitt"
4. Create sales channel: "Dublin Hearth Company"
5. Generate publishable API key for each sales channel

---

## 2. Regions

### Current State
- **Store API:** Returns error when requesting expanded fields (500 error)
- **Admin API:** Returns error when requesting expanded fields (500 error)
- **Tax Regions:** 7 tax regions exist:
  - Denmark (dk)
  - Sweden (se)
  - United Kingdom (gb)
  - Germany (de)
  - France (fr)
  - Spain (es)
  - Italy (it)

### Requirements
- **3 Regions needed:**
  1. **Europe (EUR)** - Ireland + 9 countries, 23% VAT, tax-inclusive
  2. **United Kingdom (GBP)** - 20% VAT, tax-inclusive
  3. **United States (USD)** - Tax-exclusive

### Gap
❌ **Missing Ireland** in tax regions  
❌ **Missing United States** in tax regions  
❌ **Regions not properly configured** with correct currencies and tax settings  
❌ **Tax rates not configured** (all tax regions have empty `tax_rates` arrays)

### Action Items
1. Create/verify Europe region with EUR currency
2. Create/verify UK region with GBP currency
3. Create/verify US region with USD currency
4. Configure tax regions:
   - Ireland: 23% VAT
   - UK: 20% VAT
   - US: 0% (state-level deferred)
5. Enable tax-inclusive pricing for Europe and UK
6. Enable tax-exclusive pricing for US

---

## 3. Shipping Configuration

### Current State
- **Count:** 2 shipping options
- **Options:**
  1. Standard Shipping (€10 / $10)
  2. Express Shipping (€10 / $10)
- **Service Zone:** Europe only
- **Provider:** Manual fulfillment

### Requirements
- **Ireland:** An Post Small Package (€5.00 flat rate)
- **UK/Europe/US:** To be configured

### Gap
❌ **Missing Ireland-specific shipping** (An Post)  
❌ **Missing UK shipping options**  
❌ **Missing US shipping options**  
❌ **Shipping prices incorrect** (should be €5 for Ireland, not €10)

### Action Items
1. Create Ireland shipping option: "An Post Small Package" (€5.00)
2. Configure UK shipping options
3. Configure US shipping options
4. Update shipping service zones to cover all regions

---

## 4. Publishable API Keys

### Current State
- **Count:** 2 publishable API keys
- **Keys:**
  1. "Webshop" - `pk_914d6c8e3c833a578eacc0eda2c7370a203c990f19a4638611cdaf3ee3bef148`
  2. "cursor" - `pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85`
- **Both linked to:** Default Sales Channel

### Requirements
- **1 publishable API key per sales channel** (4 total)
- Each key scoped to its respective sales channel

### Gap
❌ **Keys not scoped to individual stores** - Both keys linked to default channel  
❌ **Missing keys for 3 stores** - Need keys for flirtywineboys, manmitt, dublinhearthcompany

### Action Items
1. Create publishable API key for "How to Load a Dishwasher" sales channel
2. Create publishable API key for "Flirty Wine Boys" sales channel
3. Create publishable API key for "Man Mitt" sales channel
4. Create publishable API key for "Dublin Hearth Company" sales channel
5. Link each key to its respective sales channel

---

## 5. Payment Providers

### Current State
- **Endpoint:** `/admin/payment-providers` returns 404 error
- **Cannot verify Stripe configuration** via API

### Requirements
- **Stripe** payment provider enabled
- **Enabled in all regions** (Europe, UK, US)

### Gap
⚠️ **Cannot verify** - Need to check via Admin Dashboard or configuration files

### Action Items
1. Verify Stripe is configured in `medusa-config.js`
2. Verify Stripe API keys in environment variables
3. Enable Stripe in all 3 regions (Europe, UK, US)
4. Test Stripe payment flow

---

## 6. Products

### Current State
- **Count:** 4 demo products
  1. Medusa Sweatshirt
  2. Medusa T-Shirt
  3. Medusa Sweatpants
  4. Medusa Shorts
- **Images:** Using AWS S3 (`medusa-public-images.s3.eu-west-1.amazonaws.com`)
- **Sales Channels:** Not visible in store API response (likely all in default channel)

### Requirements
- **Products isolated per sales channel**
- **Images stored in MinIO** (not AWS S3)

### Gap
❌ **Demo products exist** - Should be removed or reassigned  
❌ **Products not isolated** - Need to assign to specific sales channels  
❌ **Images not in MinIO** - Still using AWS S3

### Action Items
1. Remove or reassign demo products
2. Import products for howtoloadadishwasher.com
3. Assign products to appropriate sales channels
4. Migrate product images to MinIO
5. Update image URLs to use MinIO endpoint

---

## 7. File Storage (MinIO)

### Current State
- **Cannot verify via API** - Configuration is in code
- **Product images:** Using AWS S3 (not MinIO)

### Requirements
- **MinIO** configured and working
- **Bucket:** `medusa-media` (or configured bucket)
- **Public access** enabled
- **Product images** served from MinIO

### Gap
⚠️ **Cannot verify via API** - Need to check configuration and test upload  
❌ **Images not using MinIO** - Products still using AWS S3

### Action Items
1. Verify MinIO configuration in `medusa-config.js`
2. Verify MinIO environment variables
3. Test file upload to MinIO
4. Verify bucket exists and has public access
5. Migrate existing product images to MinIO

---

## 8. Email Service (Resend)

### Current State
- **Cannot verify via API** - Configuration is in code
- **Custom module exists:** `backend/src/modules/email-notifications/`

### Requirements
- **Resend** configured and working
- **React Email templates** for order confirmation
- **Sales channel-specific branding** (optional)

### Gap
⚠️ **Cannot verify via API** - Need to check configuration and test email sending

### Action Items
1. Verify Resend configuration in `medusa-config.js`
2. Verify Resend API key in environment variables
3. Test email sending (order confirmation)
4. Customize email templates for sales channel branding (optional)

---

## 9. CORS Configuration

### Current State
- **Cannot verify via API** - Configuration is in environment variables

### Requirements
```
STORE_CORS=https://howtoloadadishwasher.com,https://flirtywineboys.com,https://manmitt.com,https://dublinhearthcompany.com
ADMIN_CORS=https://breenindustries.com
AUTH_CORS=[all store domains + admin]
```

### Gap
⚠️ **Cannot verify via API** - Need to check environment variables

### Action Items
1. Verify CORS environment variables in Railway
2. Update if not configured correctly
3. Test CORS from each store domain

---

## Summary of Gaps

### Critical (Must Fix)
1. ❌ Create 3 additional sales channels (4 total)
2. ❌ Configure 3 regions (Europe, UK, US) with correct currencies and tax
3. ❌ Create publishable API keys for each sales channel
4. ❌ Configure shipping options (Ireland: An Post €5, UK, US)

### High Priority
5. ⚠️ Verify and configure Stripe payment provider
6. ⚠️ Verify and configure MinIO file storage
7. ⚠️ Verify and configure Resend email service
8. ⚠️ Configure CORS for all store domains

### Medium Priority
9. ❌ Remove/reassign demo products
10. ❌ Migrate product images to MinIO
11. ⚠️ Customize email templates (optional)

---

## Next Steps

1. **Create Setup Checklist** - Detailed step-by-step guide
2. **Prioritize Actions** - Order by dependency and impact
3. **Create Configuration Scripts** - Automate where possible
4. **Test Each Configuration** - Verify after each change

---

**Status:** Ready for implementation  
**Estimated Effort:** 2-3 days for complete configuration

