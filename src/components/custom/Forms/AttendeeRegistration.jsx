"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBuilding, FaTicketAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

const AttendeeRegistration = ({ onComplete }) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  
  // Get pass type and price from URL parameters
  const passType = searchParams.get('passType') || 'student';
  const passPrice = searchParams.get('price') || '500';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    country: '',
    state: '',
    contactNumber: '',
    profession: '',
    studentDetails: {
      college: '',
      year: ''
    },
    passType: passType,
    passPrice: parseInt(passPrice),
    userId: user?.uid || '',
    registeredAt: new Date().toISOString(),
    status: 'pending'
  });

  const [states, setStates] = useState([]);

  // Enhanced countries list
  const countries = [
    { code: 'IN', name: 'India', states: [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
      'Delhi',
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
      'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
      'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
      'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ]},
    { code: 'US', name: 'United States', states: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
      'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
      'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
      'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
      'West Virginia', 'Wisconsin', 'Wyoming'
    ]},
    { code: 'GB', name: 'United Kingdom', states: [
      'England', 'Scotland', 'Wales', 'Northern Ireland'
    ]},
    { code: 'CA', name: 'Canada', states: [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
      'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
      'Northwest Territories', 'Nunavut', 'Yukon'
    ]},
    { code: 'AU', name: 'Australia', states: [
      'New South Wales', 'Queensland', 'South Australia', 'Tasmania', 'Victoria',
      'Western Australia', 'Australian Capital Territory', 'Northern Territory'
    ]},
    { code: 'DE', name: 'Germany', states: [
      'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
      'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia',
      'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt',
      'Schleswig-Holstein', 'Thuringia'
    ]},
    { code: 'FR', name: 'France', states: [] },
    { code: 'JP', name: 'Japan', states: [] },
    { code: 'CN', name: 'China', states: [] },
    { code: 'BR', name: 'Brazil', states: [] },
    { code: 'RU', name: 'Russia', states: [] },
    { code: 'ZA', name: 'South Africa', states: [] },
    { code: 'SG', name: 'Singapore', states: [] },
    { code: 'AE', name: 'United Arab Emirates', states: [] },
    { code: 'NZ', name: 'New Zealand', states: [] },
    // Add more countries as needed
  ];

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.name === formData.country);
      setStates(selectedCountry ? selectedCountry.states : []);
      setFormData(prev => ({ ...prev, state: '' })); // Reset state when country changes
    }
  }, [formData.country]);

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        userId: user.uid
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('student.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        studentDetails: {
          ...prev.studentDetails,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const token = await user.getIdToken(true);
      
      // Log the request details (for debugging)
      console.log('Sending request with data:', {
        url: '/api/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          ...formData,
          userId: user.uid,
        }
      });

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          userId: user.uid,
        })
      });

      // Log response details (for debugging)
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      // Try to parse JSON response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Invalid content type: ${contentType}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Add registration ID to form data
        const completedData = {
          ...formData,
          registrationId: data.registrationId
        };
        onComplete(completedData);
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}. Please try again.`);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const studentFieldsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="apple-glass rounded-3xl p-8 max-w-2xl w-full mx-auto backdrop-blur-lg"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-6 text-center"
      >
        Attendee Registration
      </motion.h2>
      
      {/* Selected Pass Information */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaTicketAlt className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-white font-semibold">
                {passType.charAt(0).toUpperCase() + passType.slice(1)} Pass
              </p>
              <p className="text-gray-400 text-sm">Selected pass type</p>
            </div>
          </div>
          {/* <div className="text-right">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              ₹{parseInt(passPrice).toLocaleString()}
            </p>
            <p className="text-gray-400 text-sm">Registration fee</p>
          </div> */}
        </div>
      </motion.div>
      
      <motion.form 
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        <motion.div variants={inputVariants} className="col-span-2">
          <label className="block text-gray-200 text-sm font-medium mb-1">
            <FaUser className="inline-block mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
          />
        </motion.div>

        <motion.div variants={inputVariants} className="col-span-2 md:col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">
            <FaEnvelope className="inline-block mr-2" />
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
          />
        </motion.div>

        <motion.div variants={inputVariants} className="col-span-2 md:col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">
            <FaPhone className="inline-block mr-2" />
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
          />
        </motion.div>

        <motion.div variants={inputVariants} className="col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300 [&>option]:text-black [&>option]:bg-white"
          >
            <option value="" className="text-gray-400">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </motion.div>

        <motion.div variants={inputVariants} className="col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">Country</label>
          <select
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300 [&>option]:text-black [&>option]:bg-white"
          >
            <option value="" className="text-gray-400">Select Country</option>
            {countries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={inputVariants} className="col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">State/Province</label>
          <select
            name="state"
            required={states.length > 0}
            value={formData.state}
            onChange={handleChange}
            disabled={!formData.country || states.length === 0}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300 [&>option]:text-black [&>option]:bg-white disabled:opacity-50"
          >
            <option value="" className="text-gray-400">
              {states.length === 0 ? 'Not Required' : 'Select State/Province'}
            </option>
            {states.sort().map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={inputVariants} className="col-span-2">
          <label className="block text-gray-200 text-sm font-medium mb-1">
            <FaGraduationCap className="inline-block mr-2" />
            Profession
          </label>
          <select
            name="profession"
            required
            value={formData.profession}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300 [&>option]:text-black [&>option]:bg-white"
          >
            <option value="" className="text-gray-400">Select Profession</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="other">Other</option>
          </select>
        </motion.div>

        <AnimatePresence>
          {formData.profession === 'student' && (
            <motion.div 
              variants={studentFieldsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="col-span-2 grid grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-gray-200 text-sm font-medium mb-1">
                  <FaBuilding className="inline-block mr-2" />
                  College/University
                </label>
                <input
                  type="text"
                  name="student.college"
                  required
                  value={formData.studentDetails.college}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-gray-200 text-sm font-medium mb-1">Year</label>
                <select
                  name="student.year"
                  required
                  value={formData.studentDetails.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors duration-300 [&>option]:text-black [&>option]:bg-white"
                >
                  <option value="" className="text-gray-400">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-2 py-3 mt-4 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
        >
          Complete Registration
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AttendeeRegistration; 