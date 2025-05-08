/**
 * MCP Server Stub - Simple local JSON storage replacement
 * 
 * This module provides a drop-in replacement for MCP server functionality
 * using a local JSON file instead. This avoids dependencies on the 
 * external MCP server while maintaining basic memory capabilities.
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const MEMORY_FILE = join(__dirname, 'memory.json');
const SERVER_PORT = 3100;  // Same port as MCP would use

// Initialize memory storage
let memoryStore = {
  entities: {},
  relations: []
};

// Load existing memory if available
async function loadMemory() {
  try {
    try {
      const data = await fs.readFile(MEMORY_FILE, 'utf8');
      memoryStore = JSON.parse(data);
      console.log('Memory loaded from file');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      // File doesn't exist yet, that's okay
    }
  } catch (error) {
    console.error('Error loading memory:', error.message);
  }
}

// Save memory to file
async function saveMemory() {
  try {
    await fs.writeFile(MEMORY_FILE, JSON.stringify(memoryStore, null, 2), 'utf8');
    console.log('Memory saved to file');
  } catch (error) {
    console.error('Error saving memory:', error.message);
  }
}

// Handle RPC-style methods
async function handleRpcMethod(method, params) {
  switch (method) {
    case 'initialize':
      return { status: 'ok', message: 'Stub server initialized' };
    
    case 'upsertEntity':
      if (!params.name || !params.entityType) {
        return { error: 'Entity name and type are required' };
      }
      
      memoryStore.entities[params.name] = {
        ...params,
        updatedAt: new Date().toISOString()
      };
      
      await saveMemory();
      return { status: 'ok', entity: memoryStore.entities[params.name] };
    
    case 'createRelation':
      if (!params.from || !params.to || !params.relationType) {
        return { error: 'From, to, and relationType are required' };
      }
      
      const relation = {
        ...params,
        createdAt: new Date().toISOString()
      };
      
      memoryStore.relations.push(relation);
      await saveMemory();
      return { status: 'ok', relation };
    
    case 'getEntities':
      return { entities: Object.values(memoryStore.entities) };
    
    case 'deleteEntity':
      if (!params.name) {
        return { error: 'Entity name is required' };
      }
      
      const entityName = params.name;
      if (memoryStore.entities[entityName]) {
        // Delete entity
        delete memoryStore.entities[entityName];
        
        // Also delete all relations involving this entity
        memoryStore.relations = memoryStore.relations.filter(relation => 
          relation.from !== entityName && relation.to !== entityName
        );
        
        await saveMemory();
        return { status: 'ok', message: `Entity '${entityName}' deleted successfully` };
      } else {
        return { error: `Entity '${entityName}' not found` };
      }
    
    case 'deleteRelation':
      if (!params.from || !params.to) {
        return { error: 'Both from and to entity names are required' };
      }
      
      const originalLength = memoryStore.relations.length;
      
      // Filter relations based on from, to, and optionally relationType
      memoryStore.relations = memoryStore.relations.filter(relation => {
        if (relation.from !== params.from || relation.to !== params.to) {
          return true; // Keep relations that don't match the from/to
        }
        
        // If relationType is specified, only remove relations with that type
        if (params.relationType && relation.relationType !== params.relationType) {
          return true; // Keep relations with different types
        }
        
        return false; // Remove matching relations
      });
      
      const deleted = originalLength - memoryStore.relations.length;
      
      if (deleted > 0) {
        await saveMemory();
        return { status: 'ok', deleted: deleted };
      } else {
        return { error: 'No matching relations found' };
      }
    
    default:
      return { error: 'Method not implemented' };
  }
}

// Start HTTP server
async function startServer() {
  await loadMemory();
  
  const server = createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }
    
    // Handle POST requests (RPC calls)
    if (req.method === 'POST') {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const request = JSON.parse(body);
          const result = await handleRpcMethod(request.method, request.params);
          
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            id: request.id,
            result: result
          }));
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            id: null,
            error: { message: error.message }
          }));
        }
      });
      
      return;
    }
    
    // Handle GET requests (basic server check)
    if (req.method === 'GET') {
      if (req.url === '/mcp/memory/entities') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ entities: Object.values(memoryStore.entities) }));
        return;
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Memory stub server running');
      return;
    }
    
    // Handle unsupported methods
    res.statusCode = 405;
    res.end('Method not allowed');
  });
  
  server.listen(SERVER_PORT, () => {
    console.log(`Memory stub server running on port ${SERVER_PORT}`);
  });
  
  // Handle server errors
  server.on('error', (error) => {
    console.error('Server error:', error.message);
  });
}

// Start the server
startServer().catch(console.error); 