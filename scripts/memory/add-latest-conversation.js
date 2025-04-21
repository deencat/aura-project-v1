/**
 * Add Latest Conversation Memory Script
 * 
 * This script adds a new memory entity for the current conversation with specific
 * observations about what was discussed or accomplished.
 * 
 * Usage:
 * node add-latest-conversation.js
 */

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
  
  try {
    // Import the add-conversation module directly instead of executing it as a separate process
    // This avoids path issues with spaces in directory names
    console.log('\nAdding conversation to memory...');
    
    // Get the function from our consolidated script
    const { addConversationMemory } = require('./add-conversation');
    
    // Call the function directly with our observations
    global._directObservations = observations;
    
    await addConversationMemory();
    
    // Clean up the global variable
    delete global._directObservations;
    
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