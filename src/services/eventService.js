// Initialize ApperClient with environment variables
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Constant table name from the provided JSON
const TABLE_NAME = 'event';

// Define updateable fields (visibility: "Updateable")
const UPDATEABLE_FIELDS = ['Name', 'Tags', 'Owner', 'title', 'date', 'type'];

/**
 * Fetch events with optional filters
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} - Array of event records
 */
export const fetchEvents = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    
    // Build query parameters
    const params = {
      fields: ['Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'title', 'date', 'type'],
      convertNullToUnknown: true
    };
    
    // Add where conditions if filters provided
    if (Object.keys(filters).length > 0) {
      params.whereGroups = [{
        operator: 'AND',
        conditions: Object.entries(filters).map(([field, value]) => ({
          fieldName: field,
          operator: 'ExactMatch',
          values: [value]
        }))
      }];
    }
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

/**
 * Create a new event
 * @param {Object} eventData - Data for the new event
 * @returns {Promise<Object>} - Created event record
 */
export const createEvent = async (eventData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(eventData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create event');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * Update an existing event
 * @param {string} id - Event ID
 * @param {Object} eventData - Updated event data
 * @returns {Promise<Object>} - Updated event record
 */
export const updateEvent = async (id, eventData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(eventData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    // Add Id to the filtered data
    filteredData.Id = id;
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update event');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    throw error;
  }
};

/**
 * Delete an event
 * @param {string} id - Event ID
 * @returns {Promise<boolean>} - Success indicator
 */
export const deleteEvent = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [id]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete event');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    throw error;
  }
};

export default { fetchEvents, createEvent, updateEvent, deleteEvent };