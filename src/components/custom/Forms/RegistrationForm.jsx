"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: 'attendee', // attendee or speaker/sponsor
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Registration failed');
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        role: 'attendee',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="apple-glass rounded-3xl p-6 md:p-8 max-w-xl mx-auto w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-gray-200 text-sm font-medium">
            Full Name
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-gray-200 text-sm font-medium">
            Email Address
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="block text-gray-200 text-sm font-medium">
            Phone Number
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="organization" className="block text-gray-200 text-sm font-medium">
            Organization
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            type="text"
            id="organization"
            name="organization"
            required
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="role" className="block text-gray-200 text-sm font-medium">
            Registration Type
          </label>
          <motion.select
            whileFocus="focus"
            variants={inputVariants}
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none transition-colors [&>option]:text-gray-900 [&>option]:bg-white"
          >
            <option value="attendee">Attendee</option>
            <option value="speaker">Speaker/Sponsor</option>
          </motion.select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-full font-semibold transition-all duration-300
            ${formData.role === 'attendee' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10'}`}
        >
          {isSubmitting ? 'Registering...' : 'Complete Registration'}
        </motion.button>

        {submitStatus === 'success' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-center mt-4"
          >
            Registration successful! Check your email for confirmation.
          </motion.p>
        )}

        {submitStatus === 'error' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center mt-4"
          >
            Registration failed. Please try again.
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default RegistrationForm;
