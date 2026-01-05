#!/usr/bin/env node

/**
 * Test Resend API Connection
 * 
 * This script tests the Resend API directly to verify:
 * 1. API key is valid
 * 2. From email is valid
 * 3. Email can be sent successfully
 * 
 * Usage: node test-resend.js
 */

const { Resend } = require('resend');

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'support@breenindustries.com';
const TEST_EMAIL = process.env.TEST_EMAIL || 'last.frame5769@fastmail.com';

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY not found');
  console.error('Set RESEND_API_KEY environment variable');
  process.exit(1);
}

if (!RESEND_FROM_EMAIL) {
  console.error('❌ RESEND_FROM_EMAIL not found');
  console.error('Set RESEND_FROM_EMAIL environment variable');
  process.exit(1);
}

async function testResendAPI() {
  console.log('🧪 Testing Resend API Connection\n');
  console.log(`API Key: ${RESEND_API_KEY.substring(0, 10)}...`);
  console.log(`From Email: ${RESEND_FROM_EMAIL}`);
  console.log(`Test Email: ${TEST_EMAIL}\n`);

  const resend = new Resend(RESEND_API_KEY);

  try {
    console.log('📧 Sending test email...');
    
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: TEST_EMAIL,
      subject: 'Test Email from Medusa Backend',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from the Medusa backend to verify Resend integration.</p>
        <p>If you receive this, Resend is working correctly!</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      console.error('\nPossible issues:');
      console.error('1. API key is invalid');
      console.error('2. From email domain is not verified in Resend');
      console.error('3. DNS records not configured');
      console.error('4. Email address is invalid');
      process.exit(1);
    }

    if (data) {
      console.log('✅ Email sent successfully!');
      console.log(`Email ID: ${data.id}`);
      console.log(`\n📬 Check ${TEST_EMAIL} for the test email`);
      console.log('\n💡 Note: Email may take a few seconds to arrive');
      console.log('💡 Check spam folder if not in inbox');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

testResendAPI();

