import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = ({ isDarkMode, toggleDarkMode }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // HRMS modules
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'employees', name: 'Employees', icon: 'users' },
    { id: 'attendance', name: 'Attendance', icon: 'clock' },
    { id: 'leave', name: 'Leave Management', icon: 'calendar' },
    { id: 'payroll', name: 'Payroll', icon: 'credit-card' },
    { id: 'performance', name: 'Performance', icon: 'bar-chart' },
    { id: 'documents', name: 'Documents', icon: 'file-text' },
    { id: 'settings', name: 'Settings', icon: 'settings' },
  ];

  // Get icon components
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const MenuIcon = getIcon('menu');
  const ChevronLeftIcon = getIcon('chevron-left');
  const BellIcon = getIcon('bell');
  const UserIcon = getIcon('user');
  const LogOutIcon = getIcon('log-out');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
    
    // Show toast for demonstration purposes
    if (moduleId !== 'employees' && moduleId !== 'dashboard') {
      toast.info(`${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)} module will be available in the full version.`, {
        icon: '🔧'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
      {/* Sidebar backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-surface-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 flex flex-col`}
        initial={false}
      >
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold">PP</span>
            </div>
            <h1 className="text-xl font-bold text-primary">PeoplePulse</h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 md:hidden"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {modules.map((module) => {
              const ModuleIcon = getIcon(module.icon);
              return (
                <li key={module.id}>
                  <button
                    onClick={() => handleModuleClick(module.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center space-x-3 transition-colors ${
                      activeModule === module.id
                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                  >
                    <ModuleIcon className={`w-5 h-5 ${activeModule === module.id ? 'text-primary' : ''}`} />
                    <span>{module.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-surface-200 dark:border-surface-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-surface-500 dark:text-surface-400 truncate">admin@peoplepulse.com</p>
            </div>
            <button className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 md:hidden"
              aria-label="Toggle menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 relative">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeModule === 'dashboard' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { title: 'Total Employees', value: '218', icon: 'users', color: 'bg-blue-500' },
                      { title: 'On Leave Today', value: '8', icon: 'calendar', color: 'bg-amber-500' },
                      { title: 'This Month Joiners', value: '12', icon: 'user-plus', color: 'bg-green-500' },
                      { title: 'Pending Approvals', value: '5', icon: 'clipboard-check', color: 'bg-purple-500' }
                    ].map((stat, index) => {
                      const StatIcon = getIcon(stat.icon);
                      return (
                        <div key={index} className="card hover:shadow-lg transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-surface-500 dark:text-surface-400">{stat.title}</p>
                              <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                              <StatIcon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="card h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold">Attendance Overview</h3>
                          <select className="text-sm bg-transparent border border-surface-200 dark:border-surface-700 rounded-md px-2 py-1">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>Last Month</option>
                          </select>
                        </div>
                        <div className="h-64 flex items-center justify-center">
                          <p className="text-surface-500 dark:text-surface-400">Attendance chart will be shown here</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="card">
                        <h3 className="font-bold mb-4">Upcoming Events</h3>
                        <div className="space-y-4">
                          {[
                            { title: "Team Meeting", date: "Today, 3:00 PM", type: "meeting" },
                            { title: "Sarah's Birthday", date: "Tomorrow", type: "birthday" },
                            { title: "Project Deadline", date: "Dec 15, 2023", type: "deadline" }
                          ].map((event, index) => {
                            const getEventIcon = (type) => {
                              switch(type) {
                                case 'meeting': return 'users';
                                case 'birthday': return 'cake';
                                case 'deadline': return 'alert-circle';
                                default: return 'calendar';
                              }
                            };
                            const EventIcon = getIcon(getEventIcon(event.type));
                            return (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                  <EventIcon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{event.title}</p>
                                  <p className="text-sm text-surface-500 dark:text-surface-400">{event.date}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeModule === 'employees' && (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-bold">Employee Management</h1>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search employees..." 
                          className="input !pl-9" 
                        />
                        {(() => {
                          const SearchIcon = getIcon('search');
                          return <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />;
                        })()}
                      </div>
                      <button className="btn-primary whitespace-nowrap">
                        {(() => {
                          const UserPlusIcon = getIcon('user-plus');
                          return <UserPlusIcon className="w-4 h-4 mr-2" />;
                        })()}
                        Add Employee
                      </button>
                    </div>
                  </div>
                  
                  <MainFeature />
                </div>
              )}
              
              {activeModule !== 'dashboard' && activeModule !== 'employees' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const ConstructionIcon = getIcon('hammer');
                      return <ConstructionIcon className="w-8 h-8 text-primary" />;
                    })()}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                  <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                    The {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} module is currently under development and will be available in the full version.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="py-4 px-6 border-t border-surface-200 dark:border-surface-700">
          <p className="text-sm text-surface-500 dark:text-surface-400 text-center">
            &copy; {new Date().getFullYear()} PeoplePulse HRMS. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;