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

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to make a simple RPC-style request
async function rpcRequest(method, params) {
  const requestData = JSON.stringify({
    jsonrpc: '2.0',
    id: Date.now(),
    method: method,
    params: params
  });
  
  const response = await fetch('http://localhost:3100', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: requestData
  });
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  return data.result;
}

// Check if memory server is running
async function isMemoryServerRunning() {
  try {
    const response = await fetch('http://localhost:3100');
    return response.status === 200;
  } catch {
    return false;
  }
}

// Start memory server if it's not running
async function startMemoryServer() {
  console.log('Starting memory server...');
  
  return new Promise((resolve) => {
    // Get absolute path to memory-stub.js
    const scriptPath = join(__dirname, 'memory-stub.js');
    
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
    const result = await rpcRequest('upsertEntity', conversationEntity);
    console.log('✅ Memory entry created successfully:', result);
  } catch (error) {
    console.error('❌ Failed to create memory entry:', error.message);
  }
}

// Run the script
addConversationMemory().catch(console.error); 