#!/usr/bin/env node

/**
 * Test Authentication Methods
 * 
 * This script tests different authentication methods for the admin API
 * to determine the correct way to use the secret key.
 */

const config = require('./config');

const BASE_URL = config.backend.baseUrl;
const SECRET_KEY = config.backend.secretKey;

const TEST_ENDPOINT = '/admin/store';

/**
 * Test authentication method
 */
async function testAuth(method, headers) {
  try {
    console.log(`\nTesting: ${method}`);
    console.log(`Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(`${BASE_URL}${TEST_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ SUCCESS (${response.status})`);
      console.log(`Response:`, JSON.stringify(data, null, 2).substring(0, 200));
      return { success: true, method, data };
    } else {
      console.log(`❌ FAILED (${response.status})`);
      console.log(`Error:`, JSON.stringify(data, null, 2).substring(0, 200));
      return { success: false, method, status: response.status, error: data };
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return { success: false, method, error: error.message };
  }
}

/**
 * Test all authentication methods
 */
async function testAllMethods() {
  console.log('🔐 Testing Admin API Authentication Methods\n');
  console.log(`Endpoint: ${BASE_URL}${TEST_ENDPOINT}\n`);
  console.log(`Secret Key: ${SECRET_KEY.substring(0, 20)}...\n`);

  const results = [];

  // Method 1: Bearer token (current approach)
  results.push(await testAuth('Bearer Token', {
    'Authorization': `Bearer ${SECRET_KEY}`
  }));

  // Method 2: Secret key as custom header
  results.push(await testAuth('x-medusa-secret-key header', {
    'x-medusa-secret-key': SECRET_KEY
  }));

  // Method 3: API key header
  results.push(await testAuth('x-api-key header', {
    'x-api-key': SECRET_KEY
  }));

  // Method 4: medusa-secret-key header
  results.push(await testAuth('medusa-secret-key header', {
    'medusa-secret-key': SECRET_KEY
  }));

  // Method 5: Authorization with different format
  results.push(await testAuth('Authorization: Token', {
    'Authorization': `Token ${SECRET_KEY}`
  }));

  // Method 6: Secret key in query parameter (unlikely but worth testing)
  try {
    const response = await fetch(`${BASE_URL}${TEST_ENDPOINT}?secret_key=${SECRET_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    results.push({
      success: response.ok,
      method: 'Query parameter',
      status: response.status,
      data: response.ok ? data : { error: data }
    });
    console.log(`\nTesting: Query parameter`);
    console.log(response.ok ? `✅ SUCCESS` : `❌ FAILED`);
  } catch (error) {
    results.push({ success: false, method: 'Query parameter', error: error.message });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  if (successful.length > 0) {
    console.log(`\n✅ Found ${successful.length} working method(s):`);
    successful.forEach(r => console.log(`   - ${r.method}`));
  } else {
    console.log('\n❌ No working authentication method found.');
    console.log('\nNext steps:');
    console.log('1. Try authenticating via /admin/auth/token with email/password');
    console.log('2. Use session cookie from Admin Dashboard login');
    console.log('3. Check Medusa v2 documentation for secret key usage');
  }

  return results;
}

// Run tests
testAllMethods().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

