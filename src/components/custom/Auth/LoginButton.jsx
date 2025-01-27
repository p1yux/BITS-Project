"use client"
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { IoMdArrowDropdown } from 'react-icons/io';

const LoginButton = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAuth = async () => {
    try {
      if (!user) {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAuth}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-gray-800 transition-all duration-300"
      >
        <FcGoogle className="w-5 h-5" />
        Sign in
      </motion.button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
      >
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-white/20"
        />
        <IoMdArrowDropdown 
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-64 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {user.displayName}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full p-2 rounded-lg text-left text-red-400 hover:bg-white/10 transition-colors duration-300"
              >
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginButton; 