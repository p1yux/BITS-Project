"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FaGraduationCap, FaUserTie, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/components/custom/Navigation/Navbar';

const AttendeeTypePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPass, setSelectedPass] = useState(null);

  const passTypes = [
    {
      id: 'student',
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: 'Student Pass',
      price: 500,
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-400',
      benefits: [
        'Access to all sessions and workshops',
        'Entry to startup expo',
        'Networking opportunities',
        'Certificate of participation',
        'Event merchandise',
        'Digital event guide PDF'
      ]
    },
    {
      id: 'professional',
      icon: <FaUserTie className="w-8 h-8" />,
      title: 'Professional Pass',
      price: 1500,
      color: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-400',
      popular: true,
      benefits: [
        'All Student Pass benefits',
        'Priority seating in keynote sessions',
        'Access to networking dinners',
        'Digital resources package',
        'Session recordings access',
        'Exclusive industry reports'
      ]
    },
    {
      id: 'corporate',
      icon: <FaBuilding className="w-8 h-8" />,
      title: 'Corporate Pass',
      price: 2500,
      color: 'from-green-400 to-green-600',
      borderColor: 'border-green-400',
      benefits: [
        'All Professional Pass benefits',
        'VIP lounge access',
        'One-on-one meeting with speakers (subject to availability)',
        'Company logo on event website',
        'Exclusive industry roundtable participation',
        'Premium networking dinner access'
      ]
    }
  ];

  const handlePassSelect = (passType) => {
    setSelectedPass(passType);
    // Navigate to registration form with selected pass type
    router.push(`/register/attendee?passType=${passType.id}&price=${passType.price}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-8">
              Choose Your Pass
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto">
              Select the pass that best fits your needs and unlock your BLITS experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {passTypes.map((pass, index) => (
              <motion.div
                key={pass.id}
                variants={cardVariants}
                className={`relative apple-glass rounded-3xl p-8 border-2 ${pass.borderColor} hover:border-opacity-80 transition-all duration-300 group ${
                  pass.popular ? 'ring-2 ring-purple-400/30' : ''
                }`}
              >
                {pass.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${pass.color} flex items-center justify-center text-white`}>
                    {pass.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pass.title}</h3>
                  {/* <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    ₹{pass.price.toLocaleString()}
                  </div> */}
                </div>

                <div className="space-y-4 mb-8">
                  {pass.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className={`w-5 h-5 mt-0.5 ${pass.color.includes('blue') ? 'text-blue-400' : pass.color.includes('purple') ? 'text-purple-400' : 'text-green-400'}`} />
                      <span className="text-gray-300 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePassSelect(pass)}
                  className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${pass.color} hover:shadow-lg hover:shadow-${pass.color.split('-')[1]}-500/25`}
                >
                  Select {pass.title}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 text-lg mb-4">
              All passes include full access to the 3-day event
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>• September 5-7, 2025</span>
              <span>• Jaipur, Rajasthan</span>
              <span>• 3 Days of Innovation</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeTypePage; 