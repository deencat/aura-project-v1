# Memory Scripts Cleanup Recommendations

This document outlines the scripts in the memory system that are redundant and can be safely removed, as well as their modern replacements.

## Consolidated Scripts

The following scripts have been consolidated into cleaner, more reliable versions:

1. **add-conversation.js** (NEW)
   - This is the new consolidated script that combines functionality from multiple outdated scripts
   - Resolves issues with spaces in path names
   - Handles direct memory server connection without relying on `ensure-memory-running.js`
   - Can be called both from command line or imported as a module
   - Use with: `npm run memory-add -- "Observation 1" "Observation 2"`

2. **add-latest-conversation.js** (UPDATED)
   - Now uses the consolidated add-conversation script
   - Provides a set of predefined observations
   - Use with: `npm run memory-add-latest`

## Scripts to Remove (Redundant/Deprecated)

The following scripts are now redundant and can be safely removed:

1. **add-conversation-direct.js**
   - Replaced by: `add-conversation.js`
   - Reason: Functionality now included in the consolidated script

2. **add-conversation-memory.js**
   - Replaced by: `add-conversation.js`
   - Reason: Had issues with paths containing spaces, now fixed in the consolidated script

3. **ensure-memory-running.js**
   - Replaced by: Internal functions in `add-conversation.js`
   - Reason: Had issues with paths containing spaces, now handled directly in consolidated script

## Scripts to Keep

The following scripts should be kept as they provide unique functionality:

1. **memory-stub.js**
   - Core server functionality
   - Handles the memory storage and JSON-RPC API

2. **memory-client.js**
   - Provides higher-level API for interacting with the memory server
   - Used by various scripts

3. **get-latest-memory.js**
   - Utility to view the latest memory entity
   - Useful for checking what was last stored

4. **remove-latest-memory.js**
   - Utility to remove the most recent entity
   - Useful for correcting mistakes

5. **memory-example.js**
   - Example script showing how to use the memory system
   - Useful for reference

## Updated Package.json Scripts

```json
"scripts": {
  "memory-add": "node scripts/memory/add-conversation.js",
  "memory-add-latest": "node scripts/memory/add-latest-conversation.js",
  "memory-get-latest": "node scripts/memory/get-latest-memory.js",
  "memory-remove": "node scripts/memory/remove-latest-memory.js",
  "memory-stub": "node scripts/memory/memory-stub.js"
}
```

## Next Steps

1. Test all updated scripts to ensure they're working correctly
2. Update any documentation referring to the old scripts
3. Remove redundant scripts once you're confident the new ones work correctly
4. Update Design Mode documentation to use the new `memory-add` script 