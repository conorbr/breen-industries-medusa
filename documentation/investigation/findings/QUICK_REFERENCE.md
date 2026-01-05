# Quick Reference: Current Boilerplate Status

**Last Updated:** January 3, 2026

---

## At a Glance

| Component | Current | Required | Status |
|-----------|---------|----------|--------|
| Sales Channels | 1 | 4 | ❌ 25% |
| Regions | 1 | 3 | ❌ 33% |
| Tax Rates | 0 | 3 | ❌ 0% |
| Shipping Options | 2 (Europe only) | 4+ | ❌ 25% |
| Publishable API Keys | 2 | 4 | ❌ 50% |
| Products | 4 (demo) | TBD | ⚠️ Demo |
| Payment (Stripe) | ⚠️ Unknown | 1 | ⚠️ Verify |
| File Storage (MinIO) | ⚠️ Unknown | 1 | ⚠️ Verify |
| Email (Resend) | ⚠️ Unknown | 1 | ⚠️ Verify |

**Overall Readiness:** 15% Complete

---

## Current Configuration

### Sales Channels
- ✅ Default Sales Channel (`sc_01KE2S8KV6EZCWPCTB4CQRQKSV`)
- ❌ Missing: How to Load a Dishwasher, Flirty Wine Boys, Man Mitt, Dublin Hearth Company

### Regions
- ✅ Europe (EUR) - 7 countries: dk, fr, de, it, es, se, gb
- ❌ Missing: Ireland in Europe, UK region, US region

### Tax Regions
- ✅ 7 tax regions exist (dk, se, gb, de, fr, es, it)
- ❌ Missing: Ireland, United States
- ❌ **No tax rates configured** (all empty)

### Shipping
- ✅ Standard Shipping (€10 / $10) - Europe
- ✅ Express Shipping (€10 / $10) - Europe
- ❌ Missing: Ireland (An Post €5), UK, US

### API Keys
- ✅ "Webshop" - `pk_914...148` → Default Sales Channel
- ✅ "cursor" - `pk_65b...d85` → Default Sales Channel
- ❌ Missing: Keys for 3 new stores

### Products
- ✅ 4 demo products (Sweatshirt, T-Shirt, Sweatpants, Shorts)
- ⚠️ Images using AWS S3 (not MinIO)
- ⚠️ Not assigned to specific sales channels

---

## Critical Actions Needed

1. **Create 3 sales channels** (How to Load a Dishwasher, Flirty Wine Boys, Man Mitt, Dublin Hearth Company)
2. **Add Ireland to Europe region**
3. **Create UK region** (GBP, 20% VAT)
4. **Create US region** (USD, tax-exclusive)
5. **Configure tax rates** (Ireland 23%, UK 20%, US 0%)
6. **Create 4 publishable API keys** (one per sales channel)
7. **Create Ireland shipping** (An Post €5)
8. **Verify Stripe, MinIO, Resend** configurations

---

## Key IDs for Reference

- **Default Sales Channel:** `sc_01KE2S8KV6EZCWPCTB4CQRQKSV`
- **Europe Region:** `reg_01KE2S8KZPVKHCYJ40NJK9X2YK`
- **European Warehouse:** `sloc_01KE2S8M23J3YDMH38SVSFWRMZ`
- **Default Shipping Profile:** `sp_01KE2S8BZXK1CKBQ319YBWX4ED`
- **Europe Service Zone:** `serzo_01KE2S8M3CEXVCP0F2ZGJKQ4XB`

---

**See:** `BOILERPLATE_STATUS_REPORT.md` for detailed analysis

