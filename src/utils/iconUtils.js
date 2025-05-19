import * as Icons from 'lucide-react';

/**
 * Get an icon component by name
 * @param {string} name - Icon name from lucide-react library
 * @returns {React.ComponentType<any>} Icon component
 */
export const getIcon = (name) => {
  // Convert kebab case to pascal case (e.g., 'arrow-right' to 'ArrowRight')
  const pascalCaseName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  return Icons[pascalCaseName] || Icons.HelpCircle; // Fallback to HelpCircle if icon not found
};