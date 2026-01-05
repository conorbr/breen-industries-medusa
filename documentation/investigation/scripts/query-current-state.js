#!/usr/bin/env node

/**
 * Query Current State Script
 * 
 * This script queries the deployed Medusa backend to discover the current
 * configuration state. It queries all relevant endpoints and saves the
 * results to the current-state folder.
 * 
 * Usage: node query-current-state.js
 */

const config = require('./config');
const fs = require('fs');
const path = require('path');

const BASE_URL = config.backend.baseUrl;
const PUBLISHABLE_KEY = config.backend.publishableKey;
const ADMIN_EMAIL = config.backend.adminEmail;
const ADMIN_PASSWORD = config.backend.adminPassword;
const SESSION_COOKIE = config.backend.sessionCookie;

// Output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'current-state');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Cache for access token
let accessToken = null;

/**
 * Get access token via /admin/auth/token
 */
async function getAccessToken() {
  if (accessToken) {
    return accessToken;
  }

  try {
    console.log('🔐 Authenticating with admin credentials...');
    const response = await fetch(`${BASE_URL}/admin/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    console.log('✅ Authentication successful\n');
    return accessToken;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    throw error;
  }
}

/**
 * Make an authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Use session cookie for admin endpoints, publishable key for store endpoints
  if (endpoint.startsWith('/admin')) {
    // Try session cookie first (more reliable)
    if (SESSION_COOKIE) {
      headers['Cookie'] = `connect.sid=${SESSION_COOKIE}`;
    } else {
      // Fallback to token-based auth
      try {
        const token = await getAccessToken();
        headers['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.warn(`Warning: Both session cookie and token auth failed for ${endpoint}`);
      }
    }
  } else if (endpoint.startsWith('/store')) {
    headers['x-publishable-api-key'] = PUBLISHABLE_KEY;
  }

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      ...options
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return { error: error.message };
  }
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
 * Query all endpoints and save results
 */
async function queryCurrentState() {
  console.log('🔍 Querying current backend configuration...\n');
  console.log(`Backend URL: ${BASE_URL}\n`);

  // Health check
  console.log('1. Health check...');
  try {
    const health = await fetch(`${BASE_URL}/health`).then(r => r.json());
    saveToFile('health.json', health);
  } catch (error) {
    console.error('  ✗ Health check failed:', error.message);
  }

  // Store API endpoints
  console.log('\n2. Store API endpoints...');
  
  const storeEndpoints = [
    { name: 'regions', endpoint: config.endpoints.store.regions, fields: 'id,name,currency_code,*countries,*payment_providers,*sales_channels' },
    { name: 'products', endpoint: config.endpoints.store.products, fields: '*images' },
    { name: 'collections', endpoint: config.endpoints.store.collections }
  ];

  for (const { name, endpoint, fields } of storeEndpoints) {
    const url = fields ? `${endpoint}?fields=${fields}` : endpoint;
    const data = await apiRequest(url);
    saveToFile(`store-${name}.json`, data);
  }

  // Admin API endpoints
  console.log('\n3. Admin API endpoints...');
  
  const adminEndpoints = [
    // Note: /admin/store endpoint returns 404/Unauthorized - skipping
    // { name: 'store', endpoint: config.endpoints.admin.store },
    { name: 'regions', endpoint: config.endpoints.admin.regions, fields: 'id,name,currency_code,*countries,*payment_providers,*fulfillment_providers' },
    { name: 'tax-regions', endpoint: config.endpoints.admin.taxRegions },
    { name: 'sales-channels', endpoint: config.endpoints.admin.salesChannels },
    { name: 'payment-providers', endpoint: config.endpoints.admin.paymentProviders },
    { name: 'fulfillment-providers', endpoint: config.endpoints.admin.fulfillmentProviders },
    { name: 'stock-locations', endpoint: config.endpoints.admin.stockLocations },
    { name: 'shipping-options', endpoint: config.endpoints.admin.shippingOptions },
    { name: 'product-types', endpoint: config.endpoints.admin.productTypes },
    { name: 'product-tags', endpoint: config.endpoints.admin.productTags },
    { name: 'api-keys', endpoint: `${config.endpoints.admin.apiKeys}?type=publishable` },
    { name: 'inventory-items', endpoint: config.endpoints.admin.inventoryItems }
  ];

  for (const { name, endpoint, fields } of adminEndpoints) {
    const url = fields ? `${endpoint}?fields=${fields}` : endpoint;
    const data = await apiRequest(url);
    saveToFile(`admin-${name}.json`, data);
  }

  // Specific checks
  console.log('\n4. Specific configuration checks...');
  
  // Check Stripe specifically
  const stripeCheck = await apiRequest(`${config.endpoints.admin.paymentProviders}?id=pp_stripe_stripe`);
  saveToFile('stripe-config.json', stripeCheck);

  console.log('\n✅ Investigation complete!');
  console.log(`\nResults saved to: ${OUTPUT_DIR}`);
}

// Run the investigation
queryCurrentState().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

