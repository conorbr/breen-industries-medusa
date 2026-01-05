# Breen Industries - Multi-Store E-Commerce Platform

## Project Requirements Document

**Version:** 1.0  
**Date:** January 3, 2026  
**Status:** Active Development  
**Platform:** Medusa v2 Headless Commerce

---

## Executive Summary

Breen Industries is a multi-store e-commerce platform powered by Medusa v2, supporting four independent micro e-commerce stores from a single backend instance. The platform emphasizes configuration over custom development, simplicity over complexity, and leverages pre-configured integrations for payment processing, email delivery, and file storage.

---

## Project Goals

### Primary Goals

1. **Multi-Store Architecture**
   - Support 4 independent e-commerce stores from a single Medusa backend
   - Complete product, order, and customer isolation per store
   - Independent branding and configuration per store
   - Scalable architecture for adding additional stores

2. **Unified Backend Infrastructure**
   - Single Medusa v2 instance managing all stores
   - Shared payment processing (Stripe)
   - Shared email service (Resend)
   - Shared file storage (MinIO)
   - Centralized admin dashboard

3. **Production-Ready Deployment**
   - Deployed on Railway with managed services
   - Automated deployments from Git
   - Environment-based configuration
   - Monitoring and logging

4. **Developer Experience**
   - Minimal custom code (configuration-driven)
   - Easy to maintain and update
   - Clear documentation
   - Standard patterns and practices

### Success Criteria

- ✅ All 4 stores operational with isolated products and orders
- ✅ Payment processing working for all stores via Stripe
- ✅ Transactional emails sent via Resend
- ✅ Product images stored and served via MinIO
- ✅ Admin dashboard accessible for managing all stores
- ✅ Each store has independent frontend (existing or new)
- ✅ Production deployment stable and monitored

---

## Store Portfolio

### 1. How to Load a Dishwasher (Priority Store)
- **Domain:** howtoloadadishwasher.com
- **Status:** ✅ Production (site already built)
- **Products:** Books (Paperback, Hardback, Signed Hardback)
- **Special Features:** Custom inscription messages for signed books
- **Sales Channel ID:** To be configured in new backend

### 2. Flirty Wine Boys
- **Domain:** flirtywineboys.com
- **Status:** Planned
- **Products:** Wine-related products
- **Sales Channel ID:** To be configured in new backend

### 3. Man Mitt
- **Domain:** manmitt.com
- **Status:** Planned
- **Products:** TBD
- **Sales Channel ID:** To be configured in new backend

### 4. Dublin Hearth Company
- **Domain:** dublinhearthcompany.com
- **Status:** Planned
- **Products:** Home/Hearth products
- **Sales Channel ID:** To be configured in new backend

---

## Technology Stack

### Core Platform

- **Backend Framework:** Medusa v2.12.3 (or latest stable)
- **Runtime:** Node.js v20+ LTS
- **Database:** PostgreSQL (Railway managed)
- **Cache/Sessions:** Redis (Railway managed)
- **Hosting:** Railway
- **Monorepo Structure:** Backend + Storefronts

### Payment Processing

- **Provider:** Stripe
- **Integration:** Medusa Stripe Payment Module Provider
- **Account:** Single Stripe account for all stores
- **Features:**
  - Stripe Checkout (redirect-based)
  - Payment Intents API
  - Webhook support for payment events
  - Test and production modes

### Email Service

- **Provider:** Resend
- **Integration:** Medusa Resend Notification Module Provider
- **Email Types:**
  - Order confirmation
  - Order shipped (optional)
  - Order delivered (optional)
- **Features:**
  - Sales channel-specific branding
  - React Email templates
  - Configurable from/to addresses per store

### File Storage

- **Provider:** MinIO (self-hosted on Railway)
- **Integration:** Medusa S3 File Module Provider
- **Bucket:** `medusa-media` (or configured bucket name)
- **Features:**
  - Public bucket support (no presigner needed)
  - Direct file access URLs
  - Product image storage
  - Asset management via Medusa Admin

### Product Search (Optional)

- **Provider:** MeiliSearch (from boilerplate)
- **Integration:** Medusa MeiliSearch integration
- **Features:**
  - Full-text product search
  - Faceted search
  - Auto-indexing

---

## Architecture Overview

### Multi-Store Architecture

```
┌─────────────────────────────────────────────────────────┐
│         Medusa Backend (Railway)                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Shared Services:                                │  │
│  │  - PostgreSQL Database                           │  │
│  │  - Redis Cache                                   │  │
│  │  - MinIO File Storage                            │  │
│  │  - Stripe Payment Processing                     │  │
│  │  - Resend Email Service                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Sales Channel: howtoloadadishwasher.com       │  │
│  │  - Products                                     │  │
│  │  - Orders                                       │  │
│  │  - Customers                                    │  │
│  │  - Publishable API Key                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Sales Channel: flirtywineboys.com              │  │
│  │  - Products                                     │  │
│  │  - Orders                                       │  │
│  │  - Customers                                    │  │
│  │  - Publishable API Key                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Sales Channel: manmitt.com                     │  │
│  │  - Products                                     │  │
│  │  - Orders                                       │  │
│  │  - Customers                                    │  │
│  │  - Publishable API Key                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Sales Channel: dublinhearthcompany.com         │  │
│  │  - Products                                     │  │
│  │  - Orders                                       │  │
│  │  - Customers                                    │  │
│  │  - Publishable API Key                          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         │              │              │              │
         │              │              │              │
    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
    │ Frontend│   │ Frontend│   │ Frontend│   │ Frontend│
    │ Store 1 │   │ Store 2 │   │ Store 3 │   │ Store 4 │
    └─────────┘   └─────────┘   └─────────┘   └─────────┘
```

### Monorepo Structure

```
breen-industries-monorepo/
├── backend/                    # Medusa backend
│   ├── src/                   # Custom code (minimal)
│   ├── medusa-config.ts       # Medusa configuration
│   ├── package.json
│   └── .env                   # Environment variables
│
├── storefront/                # Next.js template (boilerplate)
│   ├── src/                   # Next.js app
│   ├── package.json
│   └── .env.local            # Storefront env vars
│
├── howtoloadadishwasher/      # Existing frontend
│   ├── [frontend code]
│   └── .env                  # Frontend env vars
│
└── docs/                      # Documentation
    ├── requirements/
    ├── architecture/
    └── deployment/
```

---

## Core Requirements

### 1. Multi-Store Isolation

**Requirement:** Each store must be completely isolated from others.

**Implementation:**
- Use Medusa Sales Channels (one per store)
- Products assigned to specific sales channels
- Orders automatically associated with sales channel
- Customers can shop multiple stores (shared customer base)
- Publishable API keys scoped to sales channels

**Configuration:**
- Sales channels created via Admin Dashboard
- Products assigned to channels during creation/editing
- API keys generated per sales channel

### 2. Payment Processing

**Requirement:** Accept payments via Stripe for all stores.

**Implementation:**
- Medusa Stripe Payment Module Provider
- Single Stripe account for all stores
- Stripe Checkout for payment collection
- Webhook support for payment events
- Test and production modes

**Configuration:**
- Stripe API keys in environment variables
- Stripe enabled in all regions (Europe, UK, US)
- Webhook endpoint configured in Stripe dashboard

### 3. Email Delivery

**Requirement:** Send transactional emails via Resend.

**Implementation:**
- Medusa Resend Notification Module Provider
- React Email templates
- Sales channel-specific branding
- Order confirmation emails (required)
- Shipping/delivery emails (optional)

**Configuration:**
- Resend API key in environment variables
- Email templates configured per sales channel
- From/to addresses configured per store

### 4. File Storage

**Requirement:** Store and serve product images via MinIO.

**Implementation:**
- Medusa S3 File Module Provider
- MinIO self-hosted on Railway
- Public bucket for direct image access
- No presigner service needed

**Configuration:**
- MinIO endpoint and credentials in environment variables
- Bucket created in MinIO console
- Public access policy configured

### 5. Regional Configuration

**Requirement:** Support multiple regions with appropriate tax and currency settings.

**Regions:**
- **Europe (EUR)**
  - Countries: Ireland, Austria, Belgium, +7 more
  - Tax: Tax-inclusive pricing
  - Tax Region: Ireland (23% VAT)
- **United Kingdom (GBP)**
  - Country: United Kingdom
  - Tax: Tax-inclusive pricing
  - Tax Region: UK (20% VAT)
- **United States (USD)**
  - Country: United States
  - Tax: Tax-exclusive pricing
  - Tax Region: US (0% - state-level handling deferred)

**Configuration:**
- Regions created via Admin Dashboard
- Tax regions configured per country
- Tax-inclusive pricing enabled per region/currency

### 6. Shipping Configuration

**Requirement:** Configure shipping options per region.

**Current Setup:**
- **Ireland:** An Post Small Package (€5.00 flat rate)
- **UK/Europe/US:** To be configured

**Configuration:**
- Shipping locations created
- Shipping profiles assigned to products
- Service zones configured per region
- Shipping options with pricing per currency

### 7. Custom Features

**Requirement:** Support custom product features (e.g., inscription messages).

**Implementation:**
- Line item metadata for custom data
- No custom backend code required
- Frontend collects data at checkout
- Metadata flows from cart → order automatically

**Example:**
- Signed book variants can include custom inscription message
- Message stored in `line_item.metadata.inscription_message`
- Available in order for fulfillment

---

## Development Principles

### 1. Configuration Over Code

- Prefer Admin Dashboard configuration over custom code
- Use Medusa's built-in features where possible
- Minimize custom modules, workflows, and API routes
- Configuration is easier to maintain and update

### 2. Simplicity Over Complexity

- Only add features when there's a clear business need
- Avoid premature optimization
- Keep architecture simple and understandable
- Easy to onboard new developers

### 3. Standard Patterns

- Follow Medusa best practices
- Use boilerplate structure and patterns
- Leverage pre-configured integrations
- Document deviations from standards

### 4. Maintainability

- Minimal custom code = easier Medusa updates
- Clear documentation
- Standard deployment process
- Easy to troubleshoot

---

## Environment Configuration

### Required Environment Variables

**Database & Cache:**
```
DATABASE_URL=postgres://...
REDIS_URL=redis://...
```

**Security:**
```
JWT_SECRET=...
COOKIE_SECRET=...
```

**CORS:**
```
STORE_CORS=https://howtoloadadishwasher.com,https://flirtywineboys.com,https://manmitt.com,https://dublinhearthcompany.com
ADMIN_CORS=https://breenindustries.com
AUTH_CORS=https://howtoloadadishwasher.com,https://flirtywineboys.com,https://manmitt.com,https://dublinhearthcompany.com,https://breenindustries.com
```

**Backend URL:**
```
MEDUSA_BACKEND_URL=https://breenindustries.com
```

**Stripe:**
```
STRIPE_API_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_... (production)
```

**Resend:**
```
RESEND_API_KEY=re_...
```

**MinIO:**
```
S3_ENDPOINT=https://minio-service.up.railway.app
S3_BUCKET=medusa-media
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=...
S3_REGION=auto
S3_FILE_URL=https://minio-service.up.railway.app/medusa-media
```

**Server:**
```
PORT=9000
NODE_ENV=production
```

---

## Deployment

### Hosting Platform

- **Provider:** Railway
- **Services:**
  - Medusa Backend (single instance)
  - PostgreSQL (managed)
  - Redis (managed)
  - MinIO (self-hosted service)

### Deployment Process

1. **Git Integration**
   - Automatic deployments from main branch
   - Build on push
   - Environment variables managed in Railway

2. **Build Process**
   - Run database migrations (`predeploy` hook)
   - Build Medusa backend
   - Install production dependencies

3. **Start Process**
   - Start from `.medusa/server` directory
   - Run production server

### Monitoring

- Railway logs for application monitoring
- Database monitoring via Railway dashboard
- Error tracking (to be configured)

---

## Frontend Integration

### Existing Frontend

- **howtoloadadishwasher.com** - Already built, needs to connect to new backend
- Update API base URL
- Update publishable API key
- Test all features (cart, checkout, inscription messages)

### Boilerplate Storefront

- **Next.js 14 template** - From medusajs-2.0-for-railway-boilerplate
- Use as template for new stores (flirtywineboys.com, etc.)
- Configure with appropriate sales channel API key
- Customize branding per store

### Frontend Requirements

- Each frontend connects to shared backend
- Uses publishable API key for authentication
- Implements Medusa Store API for:
  - Product listing
  - Cart management
  - Checkout flow
  - Order tracking

---

## Data Migration

### From Current Production

**To Migrate:**
- Sales channels (recreate with same names)
- Regions and tax regions (recreate configuration)
- Products (re-import for howtoloadadishwasher.com)
- Shipping configuration (recreate)
- Product images (re-upload to MinIO)

**Not Migrating:**
- Orders (keep in old system for reference)
- Customers (fresh start, or migrate if needed)

### Migration Strategy

1. **Configuration First**
   - Recreate sales channels, regions, tax regions
   - Configure shipping options
   - Set up payment and email providers

2. **Data Second**
   - Import products
   - Upload product images
   - Test product visibility per channel

3. **Frontend Integration**
   - Update existing frontend to point to new backend
   - Test end-to-end flow
   - Verify custom features work

---

## Testing Requirements

### Backend Testing

- ✅ Admin dashboard accessible
- ✅ Product CRUD operations
- ✅ Image upload to MinIO
- ✅ Sales channel isolation
- ✅ API access with publishable keys
- ✅ Payment flow with Stripe
- ✅ Email sending via Resend

### Frontend Testing

- ✅ Product display
- ✅ Cart functionality
- ✅ Checkout flow
- ✅ Custom features (inscription messages)
- ✅ Payment processing
- ✅ Order confirmation

### Multi-Store Testing

- ✅ Each sales channel accessible independently
- ✅ Products isolated per channel
- ✅ Orders associated with correct channel
- ✅ API keys scoped correctly

---

## Documentation Requirements

### Required Documentation

1. **Setup Guides**
   - Local development setup
   - Environment variables reference
   - Service account setup (Stripe, Resend, MinIO)

2. **Configuration Guides**
   - Multi-store setup
   - Payment configuration
   - Email configuration
   - File storage configuration

3. **API Documentation**
   - Store API endpoints
   - Authentication
   - Custom features (inscription messages)

4. **Deployment Guides**
   - Railway deployment
   - Environment setup
   - Monitoring and troubleshooting

---

## Success Metrics

### Technical Metrics

- ✅ All 4 stores operational
- ✅ Payment processing working (Stripe)
- ✅ Email delivery working (Resend)
- ✅ Image storage working (MinIO)
- ✅ Zero critical bugs in production
- ✅ < 2 second API response times

### Business Metrics

- ✅ Orders processing successfully
- ✅ Customers can complete checkout
- ✅ Emails delivered to customers
- ✅ Products visible and purchasable

---

## Out of Scope (For Now)

- Custom admin widgets
- Advanced analytics
- Multi-currency conversion
- Inventory management beyond Medusa defaults
- Custom fulfillment workflows
- Advanced customer segmentation
- A/B testing
- Marketing automation

---

## Future Enhancements

- Additional stores (beyond initial 4)
- Advanced product search (MeiliSearch)
- Customer loyalty programs
- Advanced reporting and analytics
- Multi-language support
- Advanced shipping rules

---

## References

- [Medusa Documentation](https://docs.medusajs.com)
- [MedusaJS 2.0 Railway Boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [MinIO Documentation](https://min.io/docs)
- [Railway Documentation](https://docs.railway.app)

---

**Document Status:** Active  
**Last Updated:** January 3, 2026  
**Next Review:** After migration completion

