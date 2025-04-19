/**
 * Add Latest Conversation Memory Script
 * 
 * This script ensures the memory server is running and then adds
 * a new memory entity for the current conversation with specific
 * observations about what was discussed or accomplished.
 * 
 * Usage:
 * node add-latest-conversation.js
 */

const { execSync } = require('child_process');
const path = require('path');

async function addLatestConversation() {
  console.log('Adding latest conversation to memory...');
  
  // Define observations about the current conversation
  const observations = [
    'Updated memory system to accept conversation observations via command line',
    'Fixed the UI utils module for shadcn components',
    'Created a proper memory recording system that captures specific conversation details',
    'Improved developer experience with better memory system feedback',
    'Date: ' + new Date().toISOString().split('T')[0]
  ];
  
  // Format observations for the command line
  const observationArgs = observations.map(obs => `"${obs}"`).join(' ');
  
  // First ensure the memory server is running
  try {
    console.log('Ensuring memory server is running...');
    execSync('node scripts/memory/ensure-memory-running.js', { stdio: 'inherit' });
    
    // Now add the conversation with observations
    console.log('\nAdding conversation to memory...');
    execSync(`node scripts/memory/add-conversation-memory.js ${observationArgs}`, { stdio: 'inherit' });
    
    console.log('\n✅ Latest conversation successfully added to memory');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the function
addLatestConversation().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});