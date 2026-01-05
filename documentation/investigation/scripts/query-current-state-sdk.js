#!/usr/bin/env node

/**
 * Query Current State Script (SDK Version)
 * 
 * This script uses the Medusa JS SDK to query the deployed backend.
 * The SDK handles authentication automatically and provides type safety.
 * 
 * Installation: npm install @medusajs/js-sdk @medusajs/types
 * 
 * Usage: node query-current-state-sdk.js
 */

const Medusa = require('@medusajs/js-sdk').default;
const config = require('./config');
const fs = require('fs');
const path = require('path');

const BASE_URL = config.backend.baseUrl;
const ADMIN_EMAIL = config.backend.adminEmail;
const ADMIN_PASSWORD = config.backend.adminPassword;
const PUBLISHABLE_KEY = config.backend.publishableKey;
const SESSION_COOKIE = config.backend.sessionCookie;

// Output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'current-state');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Save data to JSON file
 */
function saveToFile(filename, data) {
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`✓ Saved: ${filename}`);
}

/**
 * Query all endpoints using SDK
 */
async function queryCurrentState() {
  console.log('🔍 Querying current backend configuration using Medusa JS SDK...\n');
  console.log(`Backend URL: ${BASE_URL}\n`);

  // Initialize SDK for Admin API
  // Note: We'll use session cookie manually since SDK auth has issues
  const adminClient = new Medusa({
    baseUrl: BASE_URL,
    debug: process.env.NODE_ENV === 'development',
    // Don't configure auth - we'll use session cookie manually
  });

  // Prepare headers with session cookie for admin requests
  const adminHeaders = SESSION_COOKIE ? {
    'Cookie': `connect.sid=${SESSION_COOKIE}`
  } : {};

  // Initialize SDK for Store API
  const storeClient = new Medusa({
    baseUrl: BASE_URL,
    debug: process.env.NODE_ENV === 'development',
    publishableKey: PUBLISHABLE_KEY
  });

  try {
    // Use session cookie for authentication (we know this works)
    if (SESSION_COOKIE) {
      console.log('🔐 Using session cookie for authentication...');
      // The SDK will use the cookie we set in the client config
      console.log('✅ Session cookie configured\n');
    } else {
      console.log('⚠️  No session cookie available, authentication may fail\n');
    }

    // Health check
    console.log('1. Health check...');
    try {
      const health = await fetch(`${BASE_URL}/health`).then(r => r.text());
      saveToFile('health.json', { status: health });
    } catch (error) {
      console.error('  ✗ Health check failed:', error.message);
    }

    // Store API endpoints
    console.log('\n2. Store API endpoints...');
    
    try {
      const regions = await storeClient.store.region.list();
      saveToFile('store-regions.json', regions);
    } catch (error) {
      console.error('  ✗ Store regions failed:', error.message);
      saveToFile('store-regions.json', { error: error.message });
    }

    try {
      const products = await storeClient.store.product.list();
      saveToFile('store-products.json', products);
    } catch (error) {
      console.error('  ✗ Store products failed:', error.message);
      saveToFile('store-products.json', { error: error.message });
    }

    try {
      const collections = await storeClient.store.collection.list();
      saveToFile('store-collections.json', collections);
    } catch (error) {
      console.error('  ✗ Store collections failed:', error.message);
      saveToFile('store-collections.json', { error: error.message });
    }

    // Admin API endpoints
    console.log('\n3. Admin API endpoints...');
    
    const adminEndpoints = [
      // Note: store.retrieve() returns Unauthorized - endpoint may not be available
      // { name: 'store', method: () => adminClient.admin.store.retrieve({}, adminHeaders) },
      { name: 'regions', method: () => adminClient.admin.region.list({}, adminHeaders) },
      { name: 'tax-regions', method: () => adminClient.admin.taxRegion.list({}, adminHeaders) },
      { name: 'sales-channels', method: () => adminClient.admin.salesChannel.list({}, adminHeaders) },
      { name: 'fulfillment-providers', method: () => adminClient.admin.fulfillmentProvider.list({}, adminHeaders) },
      { name: 'stock-locations', method: () => adminClient.admin.stockLocation.list({}, adminHeaders) },
      { name: 'shipping-options', method: () => adminClient.admin.shippingOption.list({}, adminHeaders) },
      { name: 'product-types', method: () => adminClient.admin.productType.list({}, adminHeaders) },
      { name: 'product-tags', method: () => adminClient.admin.productTag.list({}, adminHeaders) },
      { name: 'api-keys', method: () => adminClient.admin.apiKey.list({ type: 'publishable' }, adminHeaders) },
      { name: 'inventory-items', method: () => adminClient.admin.inventoryItem.list({}, adminHeaders) }
    ];

    for (const { name, method } of adminEndpoints) {
      try {
        const data = await method();
        saveToFile(`admin-${name}.json`, data);
      } catch (error) {
        console.error(`  ✗ Admin ${name} failed:`, error.message);
        saveToFile(`admin-${name}.json`, { error: error.message });
      }
    }

    // Check payment providers (if endpoint exists)
    try {
      // Note: Payment providers might not be available via SDK in this version
      const paymentProviders = await adminClient.admin.paymentProvider?.list?.();
      if (paymentProviders) {
        saveToFile('admin-payment-providers.json', paymentProviders);
      }
    } catch (error) {
      console.log('  ⚠ Payment providers endpoint not available via SDK');
    }

    // Check Stripe specifically
    try {
      const stripeCheck = await adminClient.admin.paymentProvider?.retrieve?.('pp_stripe_stripe');
      if (stripeCheck) {
        saveToFile('stripe-config.json', stripeCheck);
      }
    } catch (error) {
      console.log('  ⚠ Stripe check not available via SDK');
    }

    console.log('\n✅ Investigation complete!');
    console.log(`\nResults saved to: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the investigation
queryCurrentState().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

