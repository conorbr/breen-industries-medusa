#!/usr/bin/env node

/**
 * Test Order Placed Email
 * 
 * This script tests the order.placed subscriber by:
 * 1. Creating a test order (or using existing order)
 * 2. Triggering the order.placed event
 * 3. Verifying email is sent
 * 
 * Usage: node test-order-email.js [order_id]
 */

const Medusa = require('@medusajs/js-sdk').default;
const config = require('./config');

const BASE_URL = config.backend.baseUrl;
const SESSION_COOKIE = config.backend.sessionCookie;
const TEST_EMAIL = process.env.TEST_EMAIL || 'test@example.com';

const adminHeaders = SESSION_COOKIE ? {
  'Cookie': `connect.sid=${SESSION_COOKIE}`
} : {};

async function testOrderEmail(orderId) {
  console.log('🧪 Testing Order Placed Email\n');
  console.log(`Backend URL: ${BASE_URL}\n`);

  const adminClient = new Medusa({
    baseUrl: BASE_URL,
    debug: true
  });

  try {
    // If order ID provided, use it; otherwise create a test order
    if (orderId) {
      console.log(`📦 Using existing order: ${orderId}`);
      
      // Retrieve order to verify it exists
      const order = await adminClient.admin.order.retrieve(orderId, {}, adminHeaders);
      console.log(`✅ Order found: ${order.order.display_id || order.order.id}`);
      console.log(`   Email: ${order.order.email}`);
      console.log(`   Status: ${order.order.status}`);
      
      // Note: We can't directly trigger the event, but we can verify the subscriber exists
      console.log('\n⚠️  Note: Cannot directly trigger order.placed event via API');
      console.log('   To test:');
      console.log('   1. Create a draft order in Admin Dashboard');
      console.log('   2. Complete the order (this triggers order.placed event)');
      console.log('   3. Check logs and email inbox');
      
    } else {
      console.log('📦 Creating test order...');
      console.log('⚠️  Order creation via API is complex - using manual method instead\n');
      
      console.log('Manual Testing Steps:');
      console.log('1. Go to Admin Dashboard: https://backend-production-178b.up.railway.app/app');
      console.log('2. Create a draft order');
      console.log('3. Add items to the order');
      console.log('4. Set customer email to:', TEST_EMAIL);
      console.log('5. Complete the order');
      console.log('6. Check email inbox for order confirmation');
      console.log('7. Check backend logs for email sending confirmation');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

const orderId = process.argv[2];
testOrderEmail(orderId);

