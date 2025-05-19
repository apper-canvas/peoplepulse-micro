// Initialize ApperClient with environment variables
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Constant table name from the provided JSON
const TABLE_NAME = 'employee';

// Define updateable fields (visibility: "Updateable")
const UPDATEABLE_FIELDS = ['Name', 'Tags', 'Owner', 'email', 'phone', 
  'designation', 'status', 'joinDate', 'avatar', 'department', 'location'];

/**
 * Fetch employees with optional filters
 * @param {Object} filters - Optional filters to apply
 * @returns {Promise<Array>} - Array of employee records
 */
export const fetchEmployees = async (filters = {}) => {
  try {
    const apperClient = getApperClient();
    
    // Build query parameters
    const params = {
      fields: ['Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 
        'ModifiedBy', 'email', 'phone', 'designation', 'status', 'joinDate', 'avatar',
        'department', 'location'],
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
    console.error('Error fetching employees:', error);
    throw error;
  }
};

/**
 * Create a new employee
 * @param {Object} employeeData - Data for the new employee
 * @returns {Promise<Object>} - Created employee record
 */
export const createEmployee = async (employeeData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(employeeData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create employee');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

/**
 * Update an existing employee
 * @param {string} id - Employee ID
 * @param {Object} employeeData - Updated employee data
 * @returns {Promise<Object>} - Updated employee record
 */
export const updateEmployee = async (id, employeeData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter only updateable fields
    const filteredData = Object.fromEntries(
      Object.entries(employeeData).filter(([key]) => UPDATEABLE_FIELDS.includes(key))
    );
    
    // Add Id to the filtered data
    filteredData.Id = id;
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update employee');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error(`Error updating employee ${id}:`, error);
    throw error;
  }
};

/**
 * Delete an employee
 * @param {string} id - Employee ID
 * @returns {Promise<boolean>} - Success indicator
 */
export const deleteEmployee = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [id]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete employee');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting employee ${id}:`, error);
    throw error;
  }
};

export default { fetchEmployees, createEmployee, updateEmployee, deleteEmployee };