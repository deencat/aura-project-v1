/**
 * Memory Client - Simple interface for interacting with the memory system
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class MemoryClient {
  constructor(serverUrl = 'http://localhost:3100') {
    this.serverUrl = serverUrl;
  }

  /**
   * Initialize the connection to the memory server
   */
  async initialize() {
    try {
      const response = await this.callRpc('initialize', {
        client: {
          name: 'MemoryClient',
          version: '1.0.0'
        },
        capabilities: {}
      });
      
      return { success: true, message: 'Connected to memory server' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get all entities from memory
   */
  async getAllEntities() {
    try {
      const response = await this.callRpc('memory/entities', {});
      return response.entities || [];
    } catch (error) {
      console.error('Failed to fetch entities:', error);
      return [];
    }
  }

  /**
   * Create a new entity in memory
   */
  async createEntity(entity) {
    if (!entity.name) {
      throw new Error('Entity must have a name');
    }
    
    try {
      const response = await this.callRpc('memory/create_entities', {
        entities: [entity]
      });
      
      return { success: true, message: 'Entity created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a relation between entities
   */
  async createRelation(from, to, relationType) {
    try {
      const response = await this.callRpc('memory/create_relations', {
        relations: [{ from, to, relationType }]
      });
      
      return { success: true, message: 'Relation created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Find entities by type
   */
  async findEntitiesByType(entityType) {
    try {
      const allEntities = await this.getAllEntities();
      return allEntities.filter(entity => entity.entityType === entityType);
    } catch (error) {
      console.error('Failed to find entities by type:', error);
      return [];
    }
  }

  /**
   * Find entity by name
   */
  async findEntityByName(name) {
    try {
      const allEntities = await this.getAllEntities();
      return allEntities.find(entity => entity.name === name);
    } catch (error) {
      console.error('Failed to find entity by name:', error);
      return null;
    }
  }

  /**
   * Delete an entity by name
   */
  async deleteEntity(name) {
    if (!name) {
      throw new Error('Entity name is required');
    }
    
    try {
      const response = await this.callRpc('memory/delete_entity', {
        name: name
      });
      
      return { success: true, message: `Entity '${name}' deleted successfully` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Delete the most recently created entity
   */
  async deleteLatestEntity() {
    try {
      // Get all entities
      const entities = await this.getAllEntities();
      
      if (entities.length === 0) {
        return { success: false, error: 'No entities found to delete' };
      }
      
      // Sort entities by creation time if available, otherwise use name as a fallback
      const sortedEntities = [...entities].sort((a, b) => {
        // If both entities have createdAt timestamps, use those
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        // If only one has a timestamp, prioritize the one without (assuming it's newer)
        if (a.createdAt && !b.createdAt) return 1;
        if (!a.createdAt && b.createdAt) return -1;
        // Otherwise sort by name, prioritizing names that look like they have timestamps
        return b.name.localeCompare(a.name);
      });
      
      // Get the most recently created entity
      const latestEntity = sortedEntities[0];
      
      // Delete the entity
      return await this.deleteEntity(latestEntity.name);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Synchronize memory file with server state
   * This is useful when the memory file gets out of sync with the server
   */
  async synchronizeMemoryFile(memoryFilePath) {
    try {
      // Get all entities from the server
      const entities = await this.getAllEntities();
      
      // Read the current memory file to get relations
      let memoryData = { entities: {}, relations: [] };
      try {
        const fileData = fs.readFileSync(memoryFilePath, 'utf8');
        memoryData = JSON.parse(fileData);
      } catch (error) {
        console.warn(`Warning: Could not read memory file: ${error.message}`);
      }
      
      // Create a new memory data structure
      const updatedMemoryData = {
        entities: {},
        relations: memoryData.relations || []
      };
      
      // Convert the array of entities to the object format used in the file
      entities.forEach(entity => {
        updatedMemoryData.entities[entity.name] = entity;
      });
      
      // Write the updated memory data back to the file
      fs.writeFileSync(memoryFilePath, JSON.stringify(updatedMemoryData, null, 2));
      
      return { success: true, message: 'Memory file synchronized with server state' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Helper method to make RPC calls to the memory server
   */
  async callRpc(method, params) {
    const requestData = {
      jsonrpc: '2.0',
      id: Date.now().toString(),
      method,
      params
    };
    
    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    
    const jsonResponse = await response.json();
    
    if (jsonResponse.error) {
      throw new Error(`RPC Error: ${jsonResponse.error.message}`);
    }
    
    return jsonResponse.result;
  }
}

module.exports = MemoryClient; 