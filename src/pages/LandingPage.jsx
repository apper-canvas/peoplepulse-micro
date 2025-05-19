import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InviteForm from '../components/InviteForm';
import { getIcon } from '../utils/iconUtils';

const LandingPage = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Icon components
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const MenuIcon = getIcon('menu');
  const XIcon = getIcon('x');
  const CheckIcon = getIcon('check');
  const UserIcon = getIcon('users');
  const ChartIcon = getIcon('bar-chart-2');
  const ClockIcon = getIcon('clock');
  const CalendarIcon = getIcon('calendar');
  const ShieldIcon = getIcon('shield');
  const ArrowRightIcon = getIcon('arrow-right');

  const features = [
    {
      icon: UserIcon,
      title: 'Employee Management',
      description: 'Comprehensive employee profiles with documents, skills, and performance history in one place.'
    },
    {
      icon: ClockIcon,
      title: 'Time & Attendance',
      description: 'Track attendance, shifts, and overtime with easy clock-in/out options for remote teams.'
    },
    {
      icon: CalendarIcon,
      title: 'Leave Management',
      description: 'Streamline time-off requests with automated approval workflows and calendar integration.'
    },
    {
      icon: ChartIcon,
      title: 'Performance Tracking',
      description: 'Set goals, conduct reviews, and visualize performance metrics with customizable dashboards.'
    },
    {
      icon: getIcon('credit-card'),
      title: 'Payroll Integration',
      description: 'Seamlessly connect attendance data with payroll systems for accurate compensation.'
    },
    {
      icon: ShieldIcon,
      title: 'Security & Compliance',
      description: 'Role-based access control and compliance tools to protect sensitive employee data.'
    }
  ];

  const testimonials = [
    {
      quote: "PeoplePulse transformed our HR operations. What used to take days now happens instantly.",
      author: "Sarah Johnson",
      position: "HR Director",
      company: "TechCorp Inc."
    },
    {
      quote: "The intuitive interface made adoption across our team incredibly smooth. Highly recommended!",
      author: "Michael Chen",
      position: "Operations Manager",
      company: "Globex Solutions"
    },
    {
      quote: "The analytics and reporting features have given us insights we never had before.",
      author: "Lisa Reynolds",
      position: "CEO",
      company: "Startup Ventures"
    }
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-surface-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-white font-bold">PP</span>
                </div>
                <span className="ml-2 text-xl font-bold text-primary">PeoplePulse</span>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary">Features</a>
              <a href="#testimonials" className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary">Testimonials</a>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
              <Link to="/login" className="btn-outline">Sign in</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 mr-2"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary"
              >
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-surface-800 shadow-lg">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-surface-100 dark:from-surface-800 dark:to-surface-900">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-surface-900 dark:text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block">Modern HR Management</span>
                  <span className="block text-primary">Simplified</span>
                </h1>
                <p className="mt-3 text-base text-surface-600 dark:text-surface-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  PeoplePulse streamlines your HR operations with a comprehensive, user-friendly platform designed to manage employees, track attendance, process payroll, and boost productivity.
                </p>
                <div className="mt-8 sm:flex">
                  <div className="rounded-md shadow">
                    <Link to="/signup" className="btn-primary w-full py-3 px-6 text-base font-medium">
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#features" className="btn-outline w-full py-3 px-6 text-base font-medium">
                      Learn More
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative lg:inset-0"
              >
                <img
                  className="w-full rounded-2xl shadow-xl"
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="People working in an office"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-surface-900 dark:text-white sm:text-4xl">
              Powerful Features for Modern HR
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-surface-600 dark:text-surface-300 mx-auto">
              Everything you need to manage your workforce efficiently in one integrated platform.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-surface-600 dark:text-surface-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-surface-900 dark:text-white sm:text-4xl mb-16">
            Trusted by HR Leaders
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card relative"
              >
                <div className="absolute -top-4 left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  {getIcon('message-circle')({ className: "w-4 h-4" })}
                </div>
                <p className="italic text-surface-600 dark:text-surface-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-surface-600 dark:text-surface-300" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-surface-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Invite Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-800">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white">Ready to transform your HR operations?</h2>
              <p className="mt-4 text-lg text-surface-600 dark:text-surface-300 max-w-md">
                Join thousands of companies already using PeoplePulse to streamline their HR processes and improve employee satisfaction.
              </p>
              <div className="mt-8">
                <Link to="/signup" className="btn-primary text-base inline-flex items-center">
                  Get Started <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <InviteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-800 dark:bg-surface-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-surface-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Case Studies</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">Security</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-surface-700 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold">PP</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">PeoplePulse</span>
            </div>
            <div className="mt-4 md:mt-0 text-surface-300">
              &copy; {new Date().getFullYear()} PeoplePulse Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;