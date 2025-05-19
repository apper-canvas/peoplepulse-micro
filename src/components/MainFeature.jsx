import React, { useState, useEffect } from 'react';
import { fetchEmployees } from '../services/employeeService';
import { getIcon } from '../utils/iconUtils';

const MainFeature = ({ isAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      if (!isAuthenticated) return;
      
      setIsLoading(true);
      try {
        const data = await fetchEmployees();
        setEmployees(data || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
      setIsLoading(false);
    };
    
    loadEmployees();
  }, [isAuthenticated]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading employee data...</div>;
  }

  return (
    <div className="bg-white dark:bg-surface-800 rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan="5" className="text-center py-8">Employee data will be displayed here</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainFeature;
