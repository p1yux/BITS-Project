"use client"
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaUserGraduate, FaHandshake } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const RegisterView = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const { scrollY } = useScroll();
  const sectionRef = useRef(null);

  // Apple-style spring animations
  const springConfig = {
    stiffness: 100,
    damping: 30,
    mass: 1
  };

  const sectionOpacity = useSpring(
    useTransform(scrollY, [300, 600], [0, 1]),
    springConfig
  );

  const sectionY = useSpring(
    useTransform(scrollY, [300, 600], [100, 0]),
    springConfig
  );

  // Apple-style variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.2
      }
    })
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const handleRegisterClick = async () => {
    try {
      if (!user) {
        // If not logged in, trigger Google sign in
        await signInWithGoogle();
      }
      // Navigate to attendee type selection page
      router.push('/attendee-type');
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Failed to authenticate. Please try again.');
    }
  };

  return (
    <motion.div 
      ref={sectionRef} 
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="relative w-full min-h-screen"
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Apple-style background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 min-h-screen py-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            className="text-center mb-8 sm:mb-16 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={textVariants}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Join the Revolution
            </motion.h2>
            <motion.p 
              variants={textVariants}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Be part of the most anticipated tech event of 2025
            </motion.p>
            <motion.div
              variants={textVariants}
              className="pt-4"
            >
              <button
                onClick={() => {
                  document.getElementById('passes-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline decoration-dotted underline-offset-4"
              >
                View detailed pass options →
              </button>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0">
            {/* Attendee Card */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="apple-glass rounded-3xl p-6 sm:p-8 text-center"
            >
              <FaUserGraduate className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 text-blue-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Register as Attendee</h3>
              <ul className="text-gray-300 space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-left text-sm sm:text-base">
                <li>• Access to all keynote sessions</li>
                <li>• Interactive workshops and demos</li>
                <li>• Networking opportunities</li>
                <li>• Exclusive event materials</li>
                <li>• Certificate of participation</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegisterClick}
                className="w-full py-3 px-4 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
              >
                {user ? 'Choose Your Pass' : 'Sign in to Register'}
              </motion.button>
            </motion.div>

            {/* Sponsor Card */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="apple-glass rounded-3xl p-6 sm:p-8 text-center"
            >
              <FaHandshake className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 text-blue-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Become a Sponsor</h3>
              <ul className="text-gray-300 space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-left text-sm sm:text-base">
                <li>• Premium booth placement</li>
                <li>• Speaking opportunities</li>
                <li>• Brand visibility</li>
                <li>• VIP access passes</li>
                <li>• Media coverage</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-full font-semibold border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterView;
