"use client"
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const RegisterView = () => {
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

  return (
    <motion.div 
      ref={sectionRef} 
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="absolute top-0 left-0 w-full min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Apple-style background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 py-20 relative h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            className="text-center mb-20 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={textVariants}
              className="text-5xl md:text-7xl font-bold apple-text-gradient"
            >
              Join the Revolution
            </motion.h2>
            <motion.p 
              variants={textVariants}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Be part of the most anticipated tech event of 2025
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Cards with Apple-style glass morphism */}
            <motion.div 
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="apple-glass rounded-3xl p-10 space-y-8"
            >
              <motion.h3 
                variants={textVariants}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
              >
                Attendee Pass
              </motion.h3>
              <motion.ul className="text-white/90 space-y-6 mb-8 text-lg">
                {[
                  "Access to all keynote sessions",
                  "Networking opportunities",
                  "Workshop participation",
                  "Event swag bag"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    custom={index}
                    variants={textVariants}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-blue-400 text-xl">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button 
                variants={textVariants}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium 
                         shadow-lg shadow-purple-500/20 transition-all duration-300"
              >
                Register Now
              </motion.button>
            </motion.div>

            <motion.div 
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="apple-glass rounded-3xl p-10 space-y-8"
            >
              <motion.h3 
                variants={textVariants}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6"
              >
                Speaker/Sponsor
              </motion.h3>
              <motion.ul className="text-white/90 space-y-6 mb-8 text-lg">
                {[
                  "Speaking opportunities",
                  "Brand visibility",
                  "VIP networking access",
                  "Premium booth space"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    custom={index}
                    variants={textVariants}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-purple-400 text-xl">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button 
                variants={textVariants}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium 
                         shadow-lg shadow-purple-500/20 transition-all duration-300"
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
