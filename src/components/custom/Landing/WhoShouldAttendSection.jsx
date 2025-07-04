"use client"
import { motion } from 'framer-motion';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaMoneyBillWave, FaUserTie } from 'react-icons/fa';

const WhoShouldAttendSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 30 }
  );

  const attendees = [
    {
      icon: <FaGraduationCap className="w-10 h-10" />,
      title: "Students & Entrepreneurs",
      description: "From colleges across India looking to learn, network, and showcase their innovative ideas",
      color: "text-blue-400"
    },
    {
      icon: <FaMoneyBillWave className="w-10 h-10" />,
      title: "Investors & VCs",
      description: "Angel investors and venture capitalists seeking high-potential startups and investment opportunities",
      color: "text-purple-400"
    },
    {
      icon: <FaUserTie className="w-10 h-10" />,
      title: "Industry Leaders",
      description: "Government officials, corporate executives, and thought leaders driving innovation",
      color: "text-green-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -30
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      // style={{ opacity }}
      className="relative bg-black overflow-hidden py-24 lg:py-32"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-8">
              Who Should Attend
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              BLITS brings together diverse stakeholders in the entrepreneurship ecosystem
            </p>
          </motion.div>

          {/* Attendee Categories - Clean List Layout */}
          <div className="max-w-5xl mx-auto space-y-12">
            {attendees.map((attendee, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 rounded-2xl bg-white/5 border-l-4 border-transparent hover:border-white/30 transition-all duration-500 hover:bg-white/10"
                style={{
                  borderLeftColor: attendee.color === 'text-blue-400' ? '#60a5fa' : 
                                  attendee.color === 'text-purple-400' ? '#c084fc' : '#4ade80'
                }}
              >
                {/* Icon */}
                <div className={`${attendee.color} flex-shrink-0`}>
                  {attendee.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {attendee.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-md">
                    {attendee.description}
                  </p>
                </div>

                {/* Number Indicator */}
                <div className="hidden md:block text-6xl font-bold text-white/10 select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Statistics */}
          {/* <motion.div 
            variants={itemVariants}
            className="text-center mt-20"
          >
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  2000+
                </div>
                <div className="text-gray-400">Expected Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  3
                </div>
                <div className="text-gray-400">Target Audiences</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                  100%
                </div>
                <div className="text-gray-400">Innovation Focus</div>
              </div>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhoShouldAttendSection; 