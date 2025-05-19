// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

/**
 * Get the current authenticated user
 * @returns {Object|null} User object or null if not authenticated
 */
export const getCurrentUser = () => {
  const { ApperUI } = window.ApperSDK;
  return ApperUI.getCurrentUser();
};

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    const { ApperUI } = window.ApperSDK;
    await ApperUI.logout();
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export default { getCurrentUser, logout };