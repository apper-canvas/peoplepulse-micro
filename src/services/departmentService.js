// Initialize ApperClient with environment variables
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Constant table name from the provided JSON
const TABLE_NAME = 'department';

// Define updateable fields (visibility: "Updateable")
const UPDATEABLE_FIELDS = ['Name', 'Tags', 'Owner'];

/**
 * Fetch departments with optional filters
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} - Array of department records
 */
export const fetchDepartments = async (filters = {}) => {
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
    console.error('Error fetching departments:', error);
    throw error;
  }
};

/**
 * Create a new department
 * @param {Object} departmentData - Data for the new department
 * @returns {Promise<Object>} - Created department record
 */
export const createDepartment = async (departmentData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(departmentData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create department');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

/**
 * Update an existing department
 * @param {string} id - Department ID
 * @param {Object} departmentData - Updated department data
 * @returns {Promise<Object>} - Updated department record
 */
export const updateDepartment = async (id, departmentData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(departmentData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    // Add Id to the filtered data
    filteredData.Id = id;
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update department');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error(`Error updating department ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a department
 * @param {string} id - Department ID
 * @returns {Promise<boolean>} - Success indicator
 */
export const deleteDepartment = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [id]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete department');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting department ${id}:`, error);
    throw error;
  }
};

export default { fetchDepartments, createDepartment, updateDepartment, deleteDepartment };