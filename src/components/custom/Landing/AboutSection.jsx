"use client"
import { motion } from 'framer-motion';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { FaRocket, FaUsers, FaLightbulb, FaMicrochip } from 'react-icons/fa';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    { stiffness: 100, damping: 30 }
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 30 }
  );

  const features = [
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Innovation Hub",
      description: "Experience cutting-edge technology and groundbreaking innovations that shape the future."
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Networking",
      description: "Connect with industry leaders, innovators, and like-minded tech enthusiasts."
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Knowledge Sharing",
      description: "Gain insights from expert talks, workshops, and interactive sessions."
    },
    {
      icon: <FaMicrochip className="w-8 h-8" />,
      title: "Tech Showcase",
      description: "Witness the latest advancements in AI, blockchain, IoT, and more."
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
    <motion.section
      ref={sectionRef}
      id="about-section"
      style={{ opacity }}
      className="relative min-h-screen bg-black overflow-hidden py-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
              About BLITS
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              BLITS is where technology meets innovation, bringing together the brightest minds 
              and latest advancements in the tech industry.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="apple-glass rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-block p-4 rounded-full bg-blue-400/10 text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Statistics */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            {[
              { number: "5000+", label: "Attendees" },
              { number: "50+", label: "Speakers" },
              { number: "100+", label: "Tech Workshops" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="apple-glass rounded-3xl p-8 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection; 