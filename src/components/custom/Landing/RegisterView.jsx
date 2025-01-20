"use client"
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RegisterView = () => {
  const { scrollY } = useScroll();
  const sectionRef = useRef(null);

  // Create transform values for scroll-based animations
  const sectionOpacity = useTransform(
    scrollY,
    [300, 600], // Start fading in when video starts fading out
    [0, 1]
  );

  const sectionY = useTransform(
    scrollY,
    [300, 600],
    [100, 0] // Slide up as it appears
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      ref={sectionRef} 
      style={{ 
        opacity: sectionOpacity,
        y: sectionY,
      }}
      className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-b from-black/95 via-blue-950/90 to-purple-950/95 py-20 overflow-hidden"
    >
      {/* Add feather decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left feather */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[url('/feather.png')] bg-contain bg-no-repeat opacity-20 rotate-45 transform scale-x-[-1]"></div>
        
        {/* Top right feather */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[url('/feather.png')] bg-contain bg-no-repeat opacity-20 -rotate-45"></div>
        
        {/* Bottom left feather */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[url('/feather.png')] bg-contain bg-no-repeat opacity-20 rotate-[135deg] transform scale-x-[-1]"></div>
        
        {/* Bottom right feather */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[url('/feather.png')] bg-contain bg-no-repeat opacity-20 -rotate-[135deg]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto select-none">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              Join the Revolution
            </h2>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              Be part of the most anticipated tech event of 2025. Early bird registrations are now open!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Attendee Registration Card */}
            <motion.div 
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-950 to-purple-950 rounded-2xl p-8 transition-all duration-300 border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                Attendee Pass
              </h3>
              <motion.ul 
                className="text-white space-y-4 mb-8 text-lg font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
              >
                {[
                  "Access to all keynote sessions",
                  "Networking opportunities",
                  "Workshop participation",
                  "Event swag bag"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <span className="text-blue-400 mr-2 font-bold">✓</span> {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg"
              >
                Register Now
              </motion.button>
            </motion.div>

            {/* Speaker/Sponsor Card */}
            <motion.div 
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-950 to-blue-950 rounded-2xl p-8 transition-all duration-300 border-2 border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
            >
              <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                Speaker/Sponsor
              </h3>
              <motion.ul 
                className="text-white space-y-4 mb-8 text-lg font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
              >
                {[
                  "Speaking opportunities",
                  "Brand visibility",
                  "VIP networking access",
                  "Premium booth space"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <span className="text-purple-400 mr-2 font-bold">✓</span> {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all shadow-lg"
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
