#!/usr/bin/env node

/**
 * Test Resend API Connection (No Dependencies)
 * 
 * Uses native fetch to call Resend API directly
 * 
 * Usage: node test-resend-simple.js
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B';
// Try admin@breenindustries.com - may need domain verification
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'admin@breenindustries.com';
const TEST_EMAIL = process.env.TEST_EMAIL || 'last.frame5769@fastmail.com';

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY not found');
  process.exit(1);
}

if (!RESEND_FROM_EMAIL) {
  console.error('❌ RESEND_FROM_EMAIL not found');
  process.exit(1);
}

async function testResendAPI() {
  console.log('🧪 Testing Resend API Connection\n');
  console.log(`API Key: ${RESEND_API_KEY.substring(0, 10)}...`);
  console.log(`From Email: ${RESEND_FROM_EMAIL}`);
  console.log(`Test Email: ${TEST_EMAIL}\n`);

  try {
    console.log('📧 Sending test email...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: TEST_EMAIL,
        subject: 'Test Email from Medusa Backend',
        html: `
          <h1>Test Email</h1>
          <p>This is a test email from the Medusa backend to verify Resend integration.</p>
          <p>If you receive this, Resend is working correctly!</p>
          <p>Sent at: ${new Date().toISOString()}</p>
          <p>From: ${RESEND_FROM_EMAIL}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error sending email:');
      console.error(JSON.stringify(data, null, 2));
      console.error('\nPossible issues:');
      console.error('1. API key is invalid');
      console.error('2. From email domain is not verified in Resend');
      console.error('3. DNS records not configured');
      console.error('4. Email address is invalid');
      process.exit(1);
    }

    if (data.id) {
      console.log('✅ Email sent successfully!');
      console.log(`Email ID: ${data.id}`);
      console.log(`\n📬 Check ${TEST_EMAIL} for the test email`);
      console.log('\n💡 Note: Email may take a few seconds to arrive');
      console.log('💡 Check spam folder if not in inbox');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    if (error.stack) {
      console.error('\nStack:', error.stack);
    }
    console.error('\n💡 This might be a network connectivity issue.');
    console.error('💡 Try running from a different network or check your internet connection.');
    process.exit(1);
  }
}

testResendAPI();

