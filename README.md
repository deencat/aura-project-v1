The memory server runs on port 3100 and provides:
- Persistent storage of project information in memory.json
- Entity and relationship management
- Memory API for accessing stored data

### Memory System Commands

#### Service Management
```bash
# Start the memory server
npm run memory-stub

# Initialize project memory with default entities
npm run memory-init

# Check memory service health
./scripts/memory/check-memory-status.sh

# Start/restart the memory service
./scripts/memory/start-memory-service.sh
```

#### Memory Operations
```bash
# Show latest memory entity details
npm run memory-get-latest

# Add a new conversation entry to memory
npm run memory-add-conversation

# Delete the most recent memory entity
npm run memory-remove

# Run example script demonstrating memory usage
npm run memory-example
```

### Memory Architecture

The memory system consists of:
1. **Local Memory Storage** - Uses a JSON file to store entities and relations
2. **Memory Server** - Simple HTTP server that provides the memory API
3. **Client Library** - JavaScript client for interacting with the memory system

Core components:
- `memory-stub.js`: Local memory server implementation
- `memory-client.js`: Client library for accessing memory
- `memory-system.js`: Direct file-based memory system
- `memory.json`: Storage file for all memory data
