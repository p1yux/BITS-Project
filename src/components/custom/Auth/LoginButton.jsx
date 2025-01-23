"use client"
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

const LoginButton = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleAuth = async () => {
    try {
      if (user) {
        await logout();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAuth}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        user
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-white hover:bg-gray-100 text-gray-800'
      }`}
    >
      {!user && <FcGoogle className="w-5 h-5" />}
      {user ? 'Sign Out' : 'Sign in with Google'}
    </motion.button>
  );
};

export default LoginButton; 