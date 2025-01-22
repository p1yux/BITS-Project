"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AttendeeRegistration = ({ onComplete }) => {
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
    }
  });

  const [states, setStates] = useState([]);

  // This is a simplified list - you might want to use a more complete country-state database
  const countries = [
    { code: 'IN', name: 'India', states: [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
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
    // Add more countries as needed
  ];

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.name === formData.country);
      setStates(selectedCountry ? selectedCountry.states : []);
      setFormData(prev => ({ ...prev, state: '' })); // Reset state when country changes
    }
  }, [formData.country]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="apple-glass rounded-3xl p-8 max-w-2xl w-full mx-auto"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Attendee Registration</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-gray-200 text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none [&>option]:bg-gray-900 [&>option]:text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">Country</label>
          <select
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none [&>option]:bg-gray-900 [&>option]:text-white"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-gray-200 text-sm font-medium mb-1">State</label>
          <select
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            disabled={!formData.country}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none [&>option]:bg-gray-900 [&>option]:text-white disabled:opacity-50"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-200 text-sm font-medium mb-1">Profession</label>
          <select
            name="profession"
            required
            value={formData.profession}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none [&>option]:bg-gray-900 [&>option]:text-white"
          >
            <option value="">Select Profession</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="other">Other</option>
          </select>
        </div>

        {formData.profession === 'student' && (
          <>
            <div className="col-span-1">
              <label className="block text-gray-200 text-sm font-medium mb-1">College/University</label>
              <input
                type="text"
                name="student.college"
                required
                value={formData.studentDetails.college}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-200 text-sm font-medium mb-1">Year</label>
              <select
                name="student.year"
                required
                value={formData.studentDetails.year}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none [&>option]:bg-gray-900 [&>option]:text-white"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-2 py-3 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
        >
          Continue
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AttendeeRegistration; 