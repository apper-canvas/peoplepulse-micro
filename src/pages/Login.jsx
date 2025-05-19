import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

function Login() {
  const { isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white text-xl font-bold">PP</span>
            </div>
            <h1 className="ml-2 text-2xl font-bold text-primary">PeoplePulse</h1>
          </Link>
        </div>
        <div className="space-y-8 p-8 bg-white dark:bg-surface-800 rounded-2xl shadow-card">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-surface-800 dark:text-surface-100">Welcome Back</h2>
            <p className="mt-2 text-surface-600 dark:text-surface-400">Sign in to your account</p>
          </div>

          <div id="authentication" className="min-h-[400px]" />
          
          <div className="flex flex-col space-y-4 text-center">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-surface-200 dark:border-surface-700 w-full"></div>
              <span className="text-sm text-surface-500 dark:text-surface-400 bg-white dark:bg-surface-800 px-2 absolute">OR</span>
            </div>

            <Link to="/" className="btn-outline">
              Return to Home Page
            </Link>
            
            <p className="text-sm text-surface-600 dark:text-surface-400">
              Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;