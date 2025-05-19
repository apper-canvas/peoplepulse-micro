import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const HomeIcon = getIcon('home');
const AlertTriangleIcon = getIcon('alert-triangle');

const NotFound = ({ isDarkMode, toggleDarkMode }) => {
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-primary font-bold text-xl">PeoplePulse</span>
          </Link>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
            <AlertTriangleIcon className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/" className="btn-primary inline-flex items-center">
            <HomeIcon className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-sm text-surface-500">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} PeoplePulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotFound;