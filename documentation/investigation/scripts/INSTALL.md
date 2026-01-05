# Installation Guide

## Installing Medusa JS SDK

To use the SDK-based scripts, you need to install the Medusa JS SDK and types.

### Option 1: Install in Investigation Scripts Folder

```bash
cd documentation/investigation/scripts
npm install @medusajs/js-sdk@latest @medusajs/types@latest
```

### Option 2: Use Project Root (if using pnpm)

If the project uses pnpm (which it does), you can install at the root:

```bash
cd /path/to/breen-industries-medusa
pnpm add -D @medusajs/js-sdk@latest @medusajs/types@latest --filter investigation-scripts
```

Or simply add to the investigation scripts package.json and run:

```bash
cd documentation/investigation/scripts
npm install
```

## Current Status

- ✅ **Native Fetch Script** (`query-current-state.js`) - Working, no installation needed
- ⚠️ **SDK Script** (`query-current-state-sdk.js`) - Requires SDK installation

## Recommendation

The native fetch script is currently working perfectly with session cookie authentication. The SDK version provides:
- Better type safety
- Automatic authentication handling
- Cleaner code
- Better error messages

Both approaches work, but the SDK is recommended for future development and automation scripts.

## Reference

- [Medusa JS SDK Documentation](https://docs.medusajs.com/api/admin#introduction)
- [Medusa Admin API Reference](https://docs.medusajs.com/api/admin)

