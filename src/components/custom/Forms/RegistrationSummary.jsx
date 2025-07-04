"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaDownload, FaTicketAlt, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import { downloadTicket } from '@/utils/pdfGenerator';

const RegistrationSummary = ({ data }) => {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    // Auto-download ticket only on first registration (not on reload)
    const hasAutoDownloaded = sessionStorage.getItem('ticketAutoDownloaded');
    if (!hasAutoDownloaded) {
      handleDownloadTicket();
      sessionStorage.setItem('ticketAutoDownloaded', 'true');
    }
  }, []);

  const handleDownloadTicket = async () => {
    setIsDownloading(true);
    try {
      const success = downloadTicket(data);
      if (success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error downloading ticket:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFinish = () => {
    router.push('/landing');
  };

  const getPassColor = (passType) => {
    switch(passType) {
      case 'student': return 'from-blue-400 to-blue-600';
      case 'professional': return 'from-purple-400 to-purple-600';
      case 'corporate': return 'from-green-400 to-green-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getPassIcon = (passType) => {
    switch(passType) {
      case 'student': return <FaGraduationCap className="w-6 h-6" />;
      case 'professional': return <FaUser className="w-6 h-6" />;
      case 'corporate': return <FaTicketAlt className="w-6 h-6" />;
      default: return <FaTicketAlt className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4"
        >
          <FaCheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          Registration Successful!
        </h1>
        <p className="text-gray-300 text-lg">
          Welcome to BLITS 2025! Your ticket has been generated automatically.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Registration Summary Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="apple-glass rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaTicketAlt className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Registration Details</h2>
          </div>
          
          {/* Pass Type Banner */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${getPassColor(data.passType)} mb-6`}>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {getPassIcon(data.passType)}
                <div>
                  <h3 className="font-bold text-lg">
                    {data.passType?.charAt(0).toUpperCase() + data.passType?.slice(1)} Pass
                  </h3>
                  <p className="text-white/80">BLITS 2025</p>
                </div>
              </div>
              {/* <div className="text-right">
                <p className="text-2xl font-bold">₹{data.passPrice?.toLocaleString()}</p>
                <p className="text-white/80 text-sm">Registration Fee</p>
              </div> */}
            </div>
          </div>

          {/* Personal Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
              <FaUser className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-white font-medium">{data.fullName}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
              <FaEnvelope className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Email Address</p>
                <p className="text-white font-medium">{data.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
              <FaPhone className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Contact Number</p>
                <p className="text-white font-medium">{data.contactNumber}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
              <FaMapMarkerAlt className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white font-medium">{data.state}, {data.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
              <FaUser className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Profession</p>
                <p className="text-white font-medium capitalize">{data.profession}</p>
              </div>
            </div>

            {data.profession === 'student' && data.studentDetails && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                <FaGraduationCap className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-gray-400 text-sm">College Details</p>
                  <p className="text-white font-medium">
                    {data.studentDetails.college} - Year {data.studentDetails.year}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Ticket Download Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="apple-glass rounded-3xl p-8 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaDownload className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Your Ticket</h2>
          </div>

          {/* Event Info */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">BLITS 2025</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📅 September 5-7, 2025</p>
              <p>📍 Jaipur, Rajasthan</p>
              <p>🎯 3 Days of Innovation & Networking</p>
              <p>👥 2,000-3,000 Expected Attendees</p>
            </div>
          </div>

          {/* Download Status */}
          {downloadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-4"
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Ticket Downloaded!</p>
                  <p className="text-green-300 text-sm">Check your downloads folder</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4 mt-auto">
            <motion.button
              onClick={handleDownloadTicket}
              disabled={isDownloading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FaDownload className="w-5 h-5" />
                  Download Ticket Again
                </>
              )}
            </motion.button>

            <motion.button
              onClick={handleFinish}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-semibold bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
            >
              Complete Registration
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 apple-glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div className="flex items-start gap-3">
            <span className="text-blue-400">📧</span>
            <div>
              <p className="font-medium text-white">Check your email</p>
              <p className="text-sm">You'll receive confirmation and event updates</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-400">💾</span>
            <div>
              <p className="font-medium text-white">Save your ticket</p>
              <p className="text-sm">Keep the PDF for event entry</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">👥</span>
            <div>
              <p className="font-medium text-white">Join our community</p>
              <p className="text-sm">Follow @BLITS2025 for updates</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-400">📅</span>
            <div>
              <p className="font-medium text-white">Mark your calendar</p>
              <p className="text-sm">September 5-7, 2025 in Jaipur</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationSummary; 