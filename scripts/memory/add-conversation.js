/**
 * Add Conversation Memory Script
 * 
 * This script adds a new memory entity for the current conversation.
 * It directly connects to the memory system without requiring a separate
 * script to ensure the memory server is running.
 * 
 * Usage:
 * node add-conversation.js "Observation 1" "Observation 2" "Observation 3"
 * OR
 * npm run memory-add -- "Observation 1" "Observation 2" "Observation 3"
 */

const path = require('path');
const fs = require('fs');
const http = require('http');

// Function to make a simple RPC-style request
async function rpcRequest(method, params) {
  return new Promise((resolve, reject) => {
    const requestData = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: method,
      params: params
    });
    
    const options = {
      hostname: 'localhost',
      port: 3100,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response.result);
          }
        } catch (error) {
          reject(new Error(`Invalid JSON response: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.write(requestData);
    req.end();
  });
}

// Check if memory server is running
async function isMemoryServerRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3100', (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.end();
  });
}

// Start memory server if it's not running
async function startMemoryServer() {
  const { spawn } = require('child_process');
  
  console.log('Starting memory server...');
  
  return new Promise((resolve) => {
    // Get absolute path to memory-stub.js
    const scriptPath = path.join(process.cwd(), 'scripts', 'memory', 'memory-stub.js');
    
    // Start server as detached process
    const serverProcess = spawn('node', [scriptPath], {
      detached: true,
      stdio: 'ignore'
    });
    
    // Unref so parent can exit independently
    serverProcess.unref();
    
    // Wait for server to start
    setTimeout(async () => {
      const isRunning = await isMemoryServerRunning();
      if (isRunning) {
        console.log('✅ Memory server started successfully');
        resolve(true);
      } else {
        console.error('❌ Failed to start memory server');
        resolve(false);
      }
    }, 2000);
  });
}

async function getConversationObservations() {
  // Check if observations were passed directly
  if (global._directObservations && Array.isArray(global._directObservations)) {
    console.log(`Using ${global._directObservations.length} observations passed directly`);
    return global._directObservations;
  }

  // Get observations from command line arguments
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    console.log(`Using ${args.length} observations from command line arguments`);
    return args;
  }
  
  // If no args provided, check if there's piped content
  if (process.stdin.isTTY === false) {
    return new Promise((resolve) => {
      let content = '';
      process.stdin.on('data', (chunk) => {
        content += chunk.toString();
      });
      process.stdin.on('end', () => {
        const lines = content.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);
        console.log(`Using ${lines.length} observations from piped input`);
        resolve(lines);
      });
    });
  }
  
  // If no observations provided, use defaults
  console.log('No observations provided. Using default observations.');
  return [
    'Conversation processed with no specific observations provided',
    'Date: ' + new Date().toISOString().split('T')[0]
  ];
}

async function addConversationMemory() {
  console.log('Adding conversation memory entry...');
  
  // Check if memory server is running
  let serverRunning = await isMemoryServerRunning();
  
  // If not running, try to start it
  if (!serverRunning) {
    console.log('Memory server is not running. Attempting to start it...');
    serverRunning = await startMemoryServer();
    
    if (!serverRunning) {
      console.error('❌ Cannot add memory: Memory server could not be started');
      return;
    }
  } else {
    console.log('✅ Memory server is running');
  }
  
  // Get conversation observations
  const observations = await getConversationObservations();
  
  // Initialize connection to memory server
  try {
    const initResult = await rpcRequest('initialize', {});
    console.log('✅ Connected to memory server:', initResult.message);
  } catch (error) {
    console.error('❌ Failed to initialize connection:', error.message);
    return;
  }
  
  // Create conversation entity
  const conversationEntity = {
    name: 'memory-system-conversation-' + Date.now(),
    entityType: 'conversation',
    observations: observations,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Add entity to memory
  try {
    console.log('Creating conversation memory entry...');
    
    const createResult = await rpcRequest('memory/create_entities', {
      entities: [conversationEntity]
    });
    
    console.log('✅ Memory entry created successfully');
    console.log(`Created ${createResult.created} entities`);
    
    // Try to relate this to other relevant entities
    console.log('Retrieving existing entities...');
    const entitiesResult = await rpcRequest('memory/entities', {});
    
    // Try to find Project entity
    const projectEntity = entitiesResult.entities.find(e => e.name === 'Project');
    if (projectEntity) {
      console.log('Creating relation to Project...');
      await rpcRequest('memory/create_relations', {
        relations: [{
          from: conversationEntity.name,
          to: 'Project',
          relationType: 'relates_to',
          createdAt: new Date().toISOString()
        }]
      });
      console.log('✅ Relation to Project created');
    }
    
    // Try to find development entities
    const devEntities = entitiesResult.entities.filter(e => e.entityType === 'development');
    if (devEntities.length > 0) {
      console.log(`Creating relation to development entity '${devEntities[0].name}'...`);
      await rpcRequest('memory/create_relations', {
        relations: [{
          from: conversationEntity.name,
          to: devEntities[0].name,
          relationType: 'part_of',
          createdAt: new Date().toISOString()
        }]
      });
      console.log('✅ Relation to development entity created');
    }
    
    // Show success message
    console.log(`
Memory entry created with name: ${conversationEntity.name}
Observations:
${observations.map(obs => '- ' + obs).join('\n')}

You can view memory entries using: npm run memory-get-latest
    `);
    
  } catch (error) {
    console.error('❌ Failed to create memory entry:', error.message);
  }
}

// Run the function if called directly
if (require.main === module) {
  addConversationMemory().catch(error => {
    console.error('Error:', error.message);
  });
}

// Export the function for direct use in other modules
module.exports = {
  addConversationMemory
}; 