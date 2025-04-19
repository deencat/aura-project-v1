/**
 * Add Conversation Memory Script
 * 
 * This script adds a new memory entity for the current conversation.
 * It ensures the memory server is running before attempting to add the memory.
 * 
 * Usage:
 * node add-conversation-memory.js "Observation 1" "Observation 2" "Observation 3"
 * OR
 * npm run memory-add-conversation -- "Observation 1" "Observation 2" "Observation 3"
 */

const MemoryClient = require('./memory-client');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function ensureMemoryServerRunning() {
  try {
    console.log('Ensuring memory server is running...');
    execSync('node ' + path.join(__dirname, 'ensure-memory-running.js'), { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error('❌ Failed to start memory server:', error.message);
    return false;
  }
}

async function getConversationObservations() {
  // Get observations from command line arguments
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    console.log(`Using ${args.length} observations from command line arguments`);
    return args;
  }
  
  // If no args provided, check if there's piped content
  if (!process.stdin.isTTY) {
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
  // First ensure the memory server is running
  const serverRunning = await ensureMemoryServerRunning();
  if (!serverRunning) {
    console.error('❌ Cannot add memory: Memory server is not running');
    return;
  }
  
  console.log('Adding conversation memory entry...');
  
  // Get conversation observations
  const observations = await getConversationObservations();
  
  // Create a new memory client
  const memory = new MemoryClient();
  
  // Initialize the connection
  const initResult = await memory.initialize();
  if (!initResult.success) {
    console.error(`Failed to connect to memory server: ${initResult.error}`);
    console.log('Make sure the memory server is running (npm run memory-stub)');
    return;
  }
  
  console.log('✅ Connected to memory server');
  
  // Create a memory entity for the conversation
  const conversationEntity = {
    name: 'memory-system-conversation-' + Date.now(),
    entityType: 'conversation',
    observations: observations,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Create the entity
  console.log('Creating conversation memory entry...');
  const createResult = await memory.createEntity(conversationEntity);
  
  if (createResult.success) {
    console.log('✅ Memory entry created successfully');
    
    // Try to relate this to other relevant entities if they exist
    try {
      // Check if 'Project' entity exists
      const projectEntity = await memory.findEntityByName('Project');
      
      if (projectEntity) {
        // Create a relation between the conversation and the project
        console.log('Creating relation to project...');
        await memory.createRelation(
          conversationEntity.name,
          'Project',
          'relates_to'
        );
        console.log('✅ Relation created successfully');
      }
      
      // Check if there's a development entity
      const devEntities = await memory.findEntitiesByType('development');
      if (devEntities && devEntities.length > 0) {
        // Create relation to the first development entity found
        console.log(`Creating relation to development entity '${devEntities[0].name}'...`);
        await memory.createRelation(
          conversationEntity.name,
          devEntities[0].name,
          'part_of'
        );
        console.log('✅ Relation created successfully');
      }
    } catch (error) {
      console.log('Note: Optional relations could not be created:', error.message);
    }
    
    // Show success message with the entity name and observations
    console.log(`
Memory entry created with name: ${conversationEntity.name}
Observations:
${observations.map(obs => '- ' + obs).join('\n')}

You can view this entry using: npm run memory-get-latest
    `);
  } else {
    console.error(`❌ Failed to create memory entry: ${createResult.error}`);
  }
}

// Run the function if called directly
if (require.main === module) {
  addConversationMemory().catch(error => {
    console.error('Error:', error.message);
  });
} 