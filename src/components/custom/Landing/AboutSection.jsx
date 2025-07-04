"use client"
import { motion } from 'framer-motion';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { FaBolt, FaDigitalTachograph, FaLeaf, FaMicrophone, FaHandshake, FaUsers, FaAward, FaTrophy, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

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

  const focusAreas = [
    {
      icon: <FaBolt className="w-7 h-7" />,
      title: "Electrotechnology",
      description: "Innovation in electrical systems, power electronics, and smart grid technologies"
    },
    {
      icon: <FaDigitalTachograph className="w-7 h-7" />,
      title: "Digital Transformation",
      description: "AI, IoT, blockchain, and digital solutions transforming traditional industries"
    },
    {
      icon: <FaLeaf className="w-7 h-7" />,
      title: "Sustainability",
      description: "Green technology, renewable energy, and environmentally conscious business models"
    },
    {
      icon: <FaBuilding className="w-7 h-7" />,
      title: "Manufacturing & Standards",
      description: "Quality assurance, standardization processes, and manufacturing excellence for scalable products"
    },
    {
      icon: <FaUsers className="w-7 h-7" />,
      title: "Financial Technology",
      description: "Payment solutions, blockchain finance, and innovative financial services for startups"
    }
  ];

  const eventHighlights = [
    {
      icon: <FaMicrophone className="w-6 h-6" />,
      title: "Startup Pitching",
      description: "Angel & VC rounds for early-stage and scalable startups with real investment opportunities."
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: "Startup Expo",
      description: "Showcase innovative products and services with networking and collaboration opportunities."
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Founder's Forge",
      description: "Insights from founders of 100+ CR FMCG brands sharing their success stories."
    },
    {
      icon: <FaAward className="w-6 h-6" />,
      title: "BIS Speaker Sessions",
      description: "Guidance on standards, certifications, and compliance for scalable growth."
    },
    {
      icon: <FaMicrophone className="w-6 h-6" />,
      title: "Panel Discussions",
      description: "Expert advice on scaling, fundraising, and team building from industry leaders."
    },
    {
      icon: <FaTrophy className="w-6 h-6" />,
      title: "Case Competition",
      description: "Students solve real-world business challenges with exciting prizes and recognition."
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
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
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
          {/* Main Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-8">
              About BLITS
            </h2>
            <div className="max-w-7xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 font-light">
                A <span className="text-blue-400 font-semibold">three-day entrepreneurship summit</span> in collaboration with the <span className="text-blue-400 font-semibold">Bureau of Indian Standards (BIS)</span>
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                Designed to unite startups, investors, and industry leaders in Jaipur. BLITS empowers startups to showcase ideas, gain expert feedback, and embrace standardization for scalable, trusted growth.
              </p>
              
              {/* Key Stats Bar */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
                <div className="flex items-center gap-3">
                  <FaUsers className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">2,000-3,000 Attendees</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">3 Days</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaBuilding className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">BIS Partnership</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-20">

            {/* Event Highlights */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center lg:text-left">
                Event Highlights
              </h3>
              <div className="grid gap-6">
                {eventHighlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center text-blue-400">
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {highlight.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Key Focus Areas */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center lg:text-left">
                Key Focus Areas
              </h3>
              <div className="space-y-7">
                {focusAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-14 h-24 rounded-lg  flex items-center justify-center text-white">
                      {area.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">
                        {area.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-white/10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join the Future of Entrepreneurship
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              A high-visibility platform bringing together students, startups, and industry experts for an unprecedented networking and learning experience.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span>• Startup Ecosystem</span>
              <span>• Investment Opportunities</span>
              <span>• Industry Standards</span>
              <span>• Innovation Showcase</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection; 