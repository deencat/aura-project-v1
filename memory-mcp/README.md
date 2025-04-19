# Memory MCP Server

The memory server runs on port 3100 and provides:
- Persistent storage of project information in memory.json
- Entity and relationship management
- Memory API for accessing stored data

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the memory system with default entities:
   ```bash
   npm run memory-init
   ```

3. Start the memory server:
   ```bash
   npm run memory-stub
   ```
   
   Alternatively, you can use the provided shell script:
   ```bash
   npm run memory-start
   ```

4. Check if the memory service is running correctly:
   ```bash
   npm run memory-check
   ```

## Memory System Commands

### Service Management
```bash
# Start the memory server
npm run memory-stub

# Initialize project memory with default entities
npm run memory-init

# Check memory service health
npm run memory-check

# Start/restart the memory service
npm run memory-start
```

## Memory Architecture

The memory system consists of:
1. **Local Memory Storage** - Uses a JSON file to store entities and relations
2. **Memory Server** - Simple HTTP server that provides the memory API
3. **Client Library** - JavaScript client for interacting with the memory system

Core components:
- `memory-stub.js`: Local memory server implementation
- `memory-system.js`: Direct file-based memory system
- `memory.json`: Storage file for all memory data
- `useMemory.js`: React hook for accessing the memory system
- `MemoryViewer.jsx`: React component for viewing and managing memory entities
- `route.js`: Next.js API route for memory operations

## API Usage

The memory system can be accessed through the React hook `useMemory` which provides the following functions:

- `getAllEntities(type)`: Get all entities, optionally filtered by type
- `getEntityByName(name)`: Get a specific entity by name
- `createEntity(entity)`: Create a new entity
- `createRelation(from, to, relationType)`: Create a relation between entities
- `deleteEntity(name)`: Delete an entity by name
- `deleteLatestEntity()`: Delete the most recently added entity