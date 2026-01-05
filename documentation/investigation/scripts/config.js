/**
 * Configuration for investigation scripts
 * 
 * WARNING: These are temporary credentials for investigation purposes only.
 * Regenerate/remove after investigation is complete.
 */

module.exports = {
  backend: {
    baseUrl: 'https://backend-production-178b.up.railway.app',
    publishableKey: 'pk_65bc1f2fb13b62aad956c6576f07b92828b7db57e48e31e4d396f658478b4d85',
    secretKey: 'sk_23736aa7a9e5800dd1bdedb61ca6e0a8269b78b98f71307c51bc6861ac0d1770',
    // Admin credentials for token-based authentication
    adminEmail: 'admin@breenindustries.com',
    adminPassword: 'password123', // Temporary
    // Session cookie for cookie-based authentication
    sessionCookie: 's%3AseQnq-Mu00fT8YEw9E7ZFa0bDRxHcQIb.AWWjGjqJGh6SV0CZnJpb7TIGfA3%2FgZoHjScu0PV7CqA',
    // Resend configuration (for testing)
    resendApiKey: process.env.RESEND_API_KEY || 're_JdzQFsEG_4gpTFf7krFu3UPTfXxnChY3B', // Temporary
    resendFromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev', // Default test email
    testEmail: 'last.frame5769@fastmail.com' // Test email for receiving test emails
  },
  
  endpoints: {
    health: '/health',
    store: {
      regions: '/store/regions',
      products: '/store/products',
      collections: '/store/collections'
    },
    admin: {
      store: '/admin/store',
      regions: '/admin/regions',
      taxRegions: '/admin/tax-regions',
      salesChannels: '/admin/sales-channels',
      paymentProviders: '/admin/payment-providers',
      fulfillmentProviders: '/admin/fulfillment-providers',
      stockLocations: '/admin/stock-locations',
      shippingOptions: '/admin/shipping-options',
      productTypes: '/admin/product-types',
      productTags: '/admin/product-tags',
      apiKeys: '/admin/api-keys',
      inventoryItems: '/admin/inventory-items'
    }
  }
};

