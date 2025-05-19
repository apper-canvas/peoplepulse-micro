// Initialize ApperClient with environment variables
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Constant table name from the provided JSON
const TABLE_NAME = 'User1';

// Define updateable fields (visibility: "Updateable")
const UPDATEABLE_FIELDS = ['Name', 'Tags', 'Owner', 'email', 'role', 'darkModeEnabled'];

/**
 * Fetch users with optional filters
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} - Array of user records
 */
export const fetchUsers = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    
    // Build query parameters
    const params = {
      fields: ['Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'email', 'role', 'darkModeEnabled'],
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
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Create a new user
 * @param {Object} userData - Data for the new user
 * @returns {Promise<Object>} - Created user record
 */
export const createUser = async (userData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(userData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create user');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Update an existing user
 * @param {string} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user record
 */
export const updateUser = async (id, userData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(userData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    // Add Id to the filtered data
    filteredData.Id = id;
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update user');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise<boolean>} - Success indicator
 */
export const deleteUser = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [id]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete user');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};

export default { fetchUsers, createUser, updateUser, deleteUser };