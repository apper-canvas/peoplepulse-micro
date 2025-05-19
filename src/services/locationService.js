// Initialize ApperClient with environment variables
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Constant table name from the provided JSON
const TABLE_NAME = 'location';

// Define updateable fields (visibility: "Updateable")
const UPDATEABLE_FIELDS = ['Name', 'Tags', 'Owner'];

/**
 * Fetch locations with optional filters
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} - Array of location records
 */
export const fetchLocations = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    
    // Build query parameters
    const params = {
      fields: ['Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
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
    console.error('Error fetching locations:', error);
    throw error;
  }
};

/**
 * Create a new location
 * @param {Object} locationData - Data for the new location
 * @returns {Promise<Object>} - Created location record
 */
export const createLocation = async (locationData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(locationData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create location');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

/**
 * Update an existing location
 * @param {string} id - Location ID
 * @param {Object} locationData - Updated location data
 * @returns {Promise<Object>} - Updated location record
 */
export const updateLocation = async (id, locationData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(locationData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    // Add Id to the filtered data
    filteredData.Id = id;
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update location');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error(`Error updating location ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a location
 * @param {string} id - Location ID
 * @returns {Promise<boolean>} - Success indicator
 */
export const deleteLocation = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [id]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete location');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting location ${id}:`, error);
    throw error;
  }
};

export default { fetchLocations, createLocation, updateLocation, deleteLocation };