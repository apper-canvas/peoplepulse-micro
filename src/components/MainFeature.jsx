import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { getIcon } from '../utils/iconUtils';

// Sample employee data
const initialEmployees = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@peoplepulse.com",
    department: "Engineering",
    designation: "Senior Developer",
    location: "New York",
    status: "Active",
    joinDate: "2022-03-15",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@peoplepulse.com",
    department: "Human Resources",
    designation: "HR Manager",
    location: "Chicago",
    status: "Active",
    joinDate: "2021-08-10",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@peoplepulse.com",
    department: "Marketing",
    designation: "Marketing Specialist",
    location: "San Francisco",
    status: "Active",
    joinDate: "2023-01-05",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@peoplepulse.com",
    department: "Finance",
    designation: "Financial Analyst",
    location: "Miami",
    status: "On Leave",
    joinDate: "2022-05-18",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 5,
    name: "David Williams",
    email: "david.williams@peoplepulse.com",
    department: "Operations",
    designation: "Operations Manager",
    location: "Dallas",
    status: "Inactive",
    joinDate: "2021-11-22",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

// Department options
const departments = [
  "Engineering", "Human Resources", "Marketing", "Finance", "Operations", "Sales", "Customer Support", "Legal", "IT"
];

// Location options
const locations = [
  "New York", "Chicago", "San Francisco", "Miami", "Dallas", "Seattle", "Boston", "Austin", "Remote"
];

// Status options
const statuses = [
  "Active", "Inactive", "On Leave", "On Notice"
];

const MainFeature = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"
  
  // Get icon components
  const FilterIcon = getIcon('filter');
  const PlusIcon = getIcon('plus');
  const EditIcon = getIcon('edit');
  const TrashIcon = getIcon('trash');
  const XIcon = getIcon('x');
  const CheckIcon = getIcon('check');
  const TableIcon = getIcon('table');
  const GridIcon = getIcon('grid');
  const UserXIcon = getIcon('user-x');
  const MailIcon = getIcon('mail');
  const PhoneIcon = getIcon('phone');
  const BuildingIcon = getIcon('building');
  const MapPinIcon = getIcon('map-pin');
  const CalendarIcon = getIcon('calendar');
  const BriefcaseIcon = getIcon('briefcase');
  const AlertTriangleIcon = getIcon('alert-triangle');
  const ChevronRightIcon = getIcon('chevron-right');
  const EyeIcon = getIcon('eye');
  const SearchIcon = getIcon('search');
  
  // Filter employees based on search query and filters
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      searchQuery === "" || 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = filterDepartment === "" || emp.department === filterDepartment;
    const matchesLocation = filterLocation === "" || emp.location === filterLocation;
    const matchesStatus = filterStatus === "" || emp.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesStatus;
  });

  // Reset all filters
  const clearFilters = () => {
    setFilterDepartment("");
    setFilterLocation("");
    setFilterStatus("");
    setSearchQuery("");
  };

  // Open modal to add/edit employee
  const openEmployeeModal = (employee = null) => {
    setCurrentEmployee(employee || {
      name: "",
      email: "",
      department: "",
      designation: "",
      location: "",
      status: "Active",
      joinDate: format(new Date(), 'yyyy-MM-dd'),
      phone: "",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    setIsModalOpen(true);
  };

  // Handle modal form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save employee (add or update)
  const saveEmployee = () => {
    // Validation
    if (!currentEmployee.name || !currentEmployee.email || !currentEmployee.department || !currentEmployee.designation) {
      toast.error("Please fill all required fields.");
      return;
    }
    
    if (currentEmployee.id) {
      // Update existing employee
      setEmployees(prev => 
        prev.map(emp => emp.id === currentEmployee.id ? currentEmployee : emp)
      );
      toast.success("Employee updated successfully!");
    } else {
      // Add new employee
      const newEmployee = {
        ...currentEmployee,
        id: Date.now() // Simple ID generation
      };
      setEmployees(prev => [...prev, newEmployee]);
      toast.success("Employee added successfully!");
    }
    
    setIsModalOpen(false);
  };

  // Delete employee
  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    setSelectedEmployee(null);
    setConfirmDelete(false);
    toast.success("Employee deleted successfully!");
  };

  // View employee details
  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  // Helper to get status badge styles
  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'Active':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Inactive':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'On Leave':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case 'On Notice':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters and View Controls */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-lg mr-3">
              <FilterIcon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Filters</h3>
          </div>
          
          <button 
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-dark transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
              Department
            </label>
            <select 
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="select"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
              Location
            </label>
            <select 
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="select"
            >
              <option value="">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
              Status
            </label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
              Search
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by name, email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input !pl-9"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Employee List Header with View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-surface-800 rounded-xl shadow-card p-4">
        <div>
          <h3 className="text-lg font-medium">Employee Directory</h3>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-surface-100 dark:bg-surface-700 p-1 rounded-lg flex">
            <button 
              className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white dark:bg-surface-600 shadow-sm' : ''}`}
              onClick={() => setViewMode('table')}
              aria-label="Table view"
            >
              <TableIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-surface-600 shadow-sm' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <GridIcon className="w-5 h-5" />
            </button>
          </div>
          
          <button 
            onClick={() => openEmployeeModal()}
            className="btn-primary"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        </div>
      </div>
      
      {/* Employee List - Table View */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
          {filteredEmployees.length === 0 ? (
            <div className="p-8 text-center">
              <UserXIcon className="w-12 h-12 mx-auto text-surface-400 mb-3" />
              <h3 className="text-lg font-medium mb-1">No employees found</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button 
                onClick={clearFilters}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th className="hidden md:table-cell">Designation</th>
                    <th className="hidden lg:table-cell">Location</th>
                    <th>Status</th>
                    <th className="hidden md:table-cell">Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={employee.avatar} 
                            alt={employee.name} 
                            className="w-8 h-8 rounded-full object-cover" 
                          />
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-surface-500 dark:text-surface-400">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{employee.department}</td>
                      <td className="hidden md:table-cell">{employee.designation}</td>
                      <td className="hidden lg:table-cell">{employee.location}</td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyles(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="hidden md:table-cell">
                        {format(new Date(employee.joinDate), 'MMM d, yyyy')}
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => viewEmployeeDetails(employee)}
                            className="p-1.5 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openEmployeeModal(employee)}
                            className="p-1.5 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setConfirmDelete(true);
                            }}
                            className="p-1.5 text-surface-600 hover:text-red-500 dark:text-surface-400 dark:hover:text-red-500 transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Employee List - Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full bg-white dark:bg-surface-800 rounded-xl shadow-card p-8 text-center">
              <UserXIcon className="w-12 h-12 mx-auto text-surface-400 mb-3" />
              <h3 className="text-lg font-medium mb-1">No employees found</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button 
                onClick={clearFilters}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <motion.div 
                key={employee.id} 
                className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-surface-700 shadow-sm" 
                    />
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyles(employee.status)}`}>
                      {employee.status}
                    </span>
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1 truncate">{employee.name}</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm mb-3">{employee.designation}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <MailIcon className="w-4 h-4 mr-2 text-surface-500 dark:text-surface-400" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BriefcaseIcon className="w-4 h-4 mr-2 text-surface-500 dark:text-surface-400" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPinIcon className="w-4 h-4 mr-2 text-surface-500 dark:text-surface-400" />
                      <span>{employee.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-3 border-t border-surface-200 dark:border-surface-700">
                    <button 
                      onClick={() => viewEmployeeDetails(employee)}
                      className="flex-1 py-1.5 text-center text-sm rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => openEmployeeModal(employee)}
                      className="flex-1 py-1.5 text-center text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setConfirmDelete(true);
                      }}
                      className="w-9 flex items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
      
      {/* Add/Edit Employee Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  {currentEmployee.id ? "Edit Employee" : "Add New Employee"}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={currentEmployee.name || ""}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className="input"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={currentEmployee.email || ""}
                      onChange={handleInputChange}
                      placeholder="john.smith@example.com"
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="department"
                      value={currentEmployee.department || ""}
                      onChange={handleInputChange}
                      className="select"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="designation"
                      value={currentEmployee.designation || ""}
                      onChange={handleInputChange}
                      placeholder="Senior Developer"
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Location
                    </label>
                    <select 
                      name="location"
                      value={currentEmployee.location || ""}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="">Select Location</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Status
                    </label>
                    <select 
                      name="status"
                      value={currentEmployee.status || "Active"}
                      onChange={handleInputChange}
                      className="select"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Join Date
                    </label>
                    <input 
                      type="date" 
                      name="joinDate"
                      value={currentEmployee.joinDate || ""}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={currentEmployee.phone || ""}
                      onChange={handleInputChange}
                      placeholder="+1 (123) 456-7890"
                      className="input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEmployee}
                  className="btn-primary"
                >
                  {currentEmployee.id ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Employee Details Modal */}
      <AnimatePresence>
        {selectedEmployee && !confirmDelete && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold">Employee Profile</h3>
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <img 
                  src={selectedEmployee.avatar} 
                  alt={selectedEmployee.name} 
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white dark:border-surface-700 shadow-md" 
                />
                <h2 className="text-xl font-bold mt-3">{selectedEmployee.name}</h2>
                <p className="text-surface-500 dark:text-surface-400">{selectedEmployee.designation}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusBadgeStyles(selectedEmployee.status)}`}>
                  {selectedEmployee.status}
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MailIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Email</p>
                    <p className="font-medium">{selectedEmployee.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Phone</p>
                    <p className="font-medium">{selectedEmployee.phone || "—"}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BuildingIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Department</p>
                    <p className="font-medium">{selectedEmployee.department}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Location</p>
                    <p className="font-medium">{selectedEmployee.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Join Date</p>
                    <p className="font-medium">{format(new Date(selectedEmployee.joinDate), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => {
                    setSelectedEmployee(null);
                    setConfirmDelete(false);
                  }}
                  className="btn-outline"
                >
                  Close
                </button>
                <button 
                  onClick={() => openEmployeeModal(selectedEmployee)}
                  className="btn-primary"
                >
                  <EditIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete && selectedEmployee && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangleIcon className="w-8 h-8 text-red-500" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">Delete Employee</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Are you sure you want to delete <span className="font-medium">{selectedEmployee.name}</span>? This action cannot be undone.
                </p>
                
                <div className="flex justify-center space-x-3">
                  <button 
                    onClick={() => {
                      setSelectedEmployee(null);
                      setConfirmDelete(false);
                    }}
                    className="btn-outline"
                  >
                    <XIcon className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button 
                    onClick={() => deleteEmployee(selectedEmployee.id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;