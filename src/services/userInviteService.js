// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

/**
 * Send an invitation to join the platform
 * @param {string} email - Email address of the person to invite
 * @param {string} name - Optional name of the person to invite
 * @returns {Promise<Object>} Result of the invitation operation
 */
export const sendInvite = async (email, name = '') => {
  try {
    // For demonstration purposes, this simulates sending an invite
    // In a real implementation, this would use an appropriate ApperClient method
    // or a custom API endpoint to send the invitation
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: `Invitation sent to ${email}` };
  } catch (error) {
    console.error("Error sending invitation:", error);
    throw error;
  }
};