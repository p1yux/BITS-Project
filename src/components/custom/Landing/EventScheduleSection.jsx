"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaCalendarAlt, FaMicrophone, FaHandshake, FaAward, FaTrophy, FaUsers, FaLightbulb, FaClock, FaMapMarkerAlt, FaEye } from 'react-icons/fa';

const EventScheduleSection = () => {
  const sectionRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (session, dayData) => {
    setSelectedEvent({ ...session, date: dayData.date });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 30 }
  );

  const getSessionIcon = (type) => {
    const iconMap = {
      'Ceremony': <FaAward className="w-5 h-5" />,
      'Pitching': <FaMicrophone className="w-5 h-5" />,
      'Bis session': <FaUsers className="w-5 h-5" />,
      'Expo': <FaLightbulb className="w-5 h-5" />,
      'Networking': <FaHandshake className="w-5 h-5" />,
      'Founders forge': <FaUsers className="w-5 h-5" />,
      'Panel': <FaMicrophone className="w-5 h-5" />,
      'Competition': <FaTrophy className="w-5 h-5" />,
      'Spotlight': <FaLightbulb className="w-5 h-5" />,
      'Showcase': <FaLightbulb className="w-5 h-5" />
    };
    return iconMap[type] || <FaCalendarAlt className="w-5 h-5" />;
  };

  const getSessionColor = (type) => {
    const colorMap = {
      'Ceremony': 'from-yellow-400 to-orange-500',
      'Pitching': 'from-blue-400 to-blue-600',
      'Bis session': 'from-green-400 to-emerald-500',
      'Expo': 'from-purple-400 to-violet-500',
      'Networking': 'from-pink-400 to-rose-500',
      'Founders forge': 'from-indigo-400 to-purple-500',
      'Panel': 'from-cyan-400 to-teal-500',
      'Competition': 'from-red-400 to-red-600',
      'Spotlight': 'from-amber-400 to-yellow-500',
      'Showcase': 'from-emerald-400 to-green-500'
    };
    return colorMap[type] || 'from-gray-400 to-gray-600';
  };

  const scheduleData = [
    {
      date: "September 5, 2025",
      dayNumber: "01",
      shortDate: "Sept 5",
      sessions: [
        {
          type: "Ceremony",
          title: "Opening Ceremony & Welcome Address",
          description: "BITS Pilani Leadership & BIS Officials",
          time: "10:00 AM - 11:30 AM",
          location: "Main Auditorium",
          detailedDescription: "Grand opening with welcome addresses from BITS Pilani leadership and Bureau of Indian Standards officials, setting the stage for three days of innovation and entrepreneurship."
        },
        {
          type: "Pitching",
          title: "Startup Pitching - Angel Round (Session 1)",
          description: "Early-Stage Startups",
          time: "12:00 PM - 1:30 PM",
          location: "Pitch Arena",
          detailedDescription: "Early-stage startups present their innovative ideas to angel investors and industry experts for potential funding and mentorship opportunities."
        },
        {
          type: "Bis session",
          title: "BIS Speaker Session: Standards & Certification",
          description: "Dr. Rajesh Kumar, Director BIS",
          time: "2:30 PM - 4:00 PM",
          location: "Conference Hall A",
          detailedDescription: "Comprehensive guidance on standards, certifications, and compliance requirements for startups to ensure scalable and trusted growth in the market."
        },
        {
          type: "Expo",
          title: "Startup Expo Opening & Networking",
          description: "All Participants",
          time: "4:30 PM - 6:30 PM",
          location: "Exhibition Hall",
          detailedDescription: "Grand opening of the startup expo showcasing innovative products and services, with networking and collaboration opportunities for all attendees."
        },
        {
          type: "Networking",
          title: "Welcome Networking Dinner",
          description: "All Attendees",
          time: "7:00 PM - 9:00 PM",
          location: "Rajasthan International Centre Lawn",
          detailedDescription: "Elegant networking dinner providing an informal setting for meaningful connections between industry professionals, investors, and entrepreneurs."
        }
      ]
    },
    {
      date: "September 6, 2025",
      dayNumber: "02",
      shortDate: "Sept 6",
      sessions: [
        {
          type: "Founders forge",
          title: "Founder's Forge: Insights from 100+ CR FMCG Brands",
          description: "Successful FMCG Founders Panel",
          time: "10:00 AM - 11:30 AM",
          location: "Main Auditorium",
          detailedDescription: "A rare opportunity to hear directly from the founders of India's most successful FMCG brands. Learn about their entrepreneurial journeys, the challenges they overcame, and the strategies that propelled them to the top. Gain actionable insights on scaling, branding, and building a legacy in the fast-moving consumer goods sector."
        },
        {
          type: "Panel",
          title: "Panel Discussion: Scaling Startups in Digital Age",
          description: "Industry Leaders Panel",
          time: "12:00 PM - 1:30 PM",
          location: "Conference Hall A",
          detailedDescription: "Industry leaders and digital pioneers discuss the keys to scaling startups in today's tech-driven world. Topics include leveraging AI and IoT, building digital-first teams, and navigating the challenges of rapid growth. Perfect for founders and teams looking to future-proof their ventures."
        },
        {
          type: "Pitching",
          title: "Startup Pitching - VC Round (Session 2)",
          description: "Scalable Startups",
          time: "2:30 PM - 4:30 PM",
          location: "Pitch Arena",
          detailedDescription: "High-potential startups pitch to a panel of top venture capitalists and institutional investors. This session focuses on businesses ready to scale, with a spotlight on market traction, growth strategy, and investment readiness. A must-attend for ambitious founders and active investors."
        },
        {
          type: "Competition",
          title: "Case Competition - Preliminary Round",
          description: "Student Teams",
          time: "5:00 PM - 7:00 PM",
          location: "Multiple Breakout Rooms",
          detailedDescription: "Student teams compete in the preliminary round of the BLITS Case Competition, tackling real-world business challenges provided by industry partners. Teams present their solutions to expert judges, with the best advancing to the finals."
        },
        {
          type: "Spotlight",
          title: "Spotlight Talks: Young Startup Founders",
          description: "Young Entrepreneurs",
          time: "7:30 PM - 9:00 PM",
          location: "Innovation Stage",
          detailedDescription: "Dynamic, inspiring talks from the next generation of startup founders. Hear how young entrepreneurs are disrupting industries, building innovative products, and creating impact. Perfect for students, aspiring founders, and anyone passionate about entrepreneurship."
        }
      ]
    },
    {
      date: "September 7, 2025",
      dayNumber: "03",
      shortDate: "Sept 7",
      sessions: [
        {
          type: "Panel",
          title: "Panel Discussion: Fundraising & Team Building",
          description: "VCs, Founders & HR Experts",
          time: "10:00 AM - 11:30 AM",
          location: "Main Auditorium",
          detailedDescription: "A deep dive into the art of fundraising and building high-performance teams. Leading VCs, successful founders, and HR experts share their secrets on attracting investment, structuring deals, and assembling teams that drive growth. Essential for anyone looking to scale their startup."
        },
        {
          type: "Showcase",
          title: "Electrotechnology Innovation Showcase",
          description: "Tech Innovators",
          time: "12:00 PM - 1:30 PM",
          location: "Tech Demo Zone",
          detailedDescription: "Experience the future of technology at the Electrotechnology Innovation Showcase. See live demos of cutting-edge solutions in power electronics, smart grids, and automation. Network with inventors and discover the next big thing in tech."
        },
        {
          type: "Competition",
          title: "Case Competition - Finals",
          description: "Finalist Teams",
          time: "2:30 PM - 4:30 PM",
          location: "Main Auditorium",
          detailedDescription: "The top student teams face off in the finals of the BLITS Case Competition. Watch as they present their innovative solutions to a panel of industry leaders and compete for prizes, recognition, and career opportunities."
        },
        {
          type: "Panel",
          title: "Sustainability & Green Tech Panel",
          description: "Climate Tech Experts",
          time: "5:00 PM - 6:30 PM",
          location: "Conference Hall B",
          detailedDescription: "A forward-looking discussion on sustainability, green technology, and climate innovation. Experts share insights on building environmentally conscious businesses, accessing green funding, and leveraging tech for a better planet."
        },
        {
          type: "Ceremony",
          title: "Closing Ceremony & Awards Distribution",
          description: "Organizing Committee & Chief Guests",
          time: "7:00 PM - 8:30 PM",
          location: "Main Auditorium",
          detailedDescription: "Celebrate the conclusion of BLITS 2025 with the closing ceremony and awards distribution. Join us as we honor outstanding participants, announce competition winners, and reflect on three days of inspiration and achievement."
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const sessionVariants = {
    hidden: { 
      opacity: 0,
      transform: "translateX(-10px)"
    },
    visible: {
      opacity: 1,
      transform: "translateX(0px)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      transform: "translateX(10px)",
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
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
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-8">
              Event Schedule
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              Three days packed with startup pitching, expert sessions, networking, and innovation showcases
            </p>
          </motion.div>

          {/* Date Selector */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-12"
          >
            <div className="flex bg-white/5 rounded-2xl p-2 backdrop-blur-sm border border-white/10">
              {scheduleData.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(index)}
                  className={`relative px-6 py-4 rounded-xl transition-all duration-300 ${
                    selectedDate === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-medium">
                      {day.date}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Selected Date's Sessions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDate}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sessionVariants}
              className="space-y-6"
            >
              {/* Date Header */}
              {/* <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {scheduleData[selectedDate].date}
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto"></div>
              </div> */}

              {/* Sessions */}
              <div className="grid gap-6 md:gap-8">
                {scheduleData[selectedDate].sessions.map((session, sessionIndex) => (
                  <motion.div
                    key={sessionIndex}
                    variants={sessionVariants}
                    className="group bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6">
                      {/* Left Content */}
                      <div className="flex-1 space-y-4">
                        {/* Session Type & Icon - Top Left */}
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getSessionColor(session.type)} flex items-center justify-center text-white shadow-lg`}>
                            {getSessionIcon(session.type)}
                          </div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {session.type}
                          </span>
                        </div>

                        {/* Session Info */}
                        <div className="space-y-3">
                          <h4 className="text-xl md:text-2xl font-bold text-white">
                            {session.title}
                          </h4>
                          <p className="text-gray-300">
                            {session.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <FaClock className="w-4 h-4" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="w-4 h-4" />
                              <span>{session.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* View Details Button - Right Center */}
                      <div className="flex-shrink-0">
                        <button 
                          onClick={() => handleViewDetails(session, scheduleData[selectedDate])}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group-hover:scale-105"
                        >
                          <FaEye className="w-4 h-4" />
                          <span className="text-sm font-medium">View Details</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-gradient-to-br from-[#181c24] to-[#23283a] shadow-2xl rounded-3xl max-w-lg w-full p-8 border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Session Type Pill */}
              <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold mb-6 bg-gradient-to-r ${getSessionColor(selectedEvent.type)} bg-opacity-20 text-white/90`}>
                {getSessionIcon(selectedEvent.type)}
                <span className="uppercase tracking-wide">{selectedEvent.type}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {selectedEvent.title}
              </h2>

              {/* Description Row */}
              <div className="flex items-center gap-2 text-base text-gray-300 mb-4">
                <FaUsers className="w-5 h-5 text-blue-400" />
                <span>{selectedEvent.description}</span>
              </div>

              {/* Info Rows */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <FaCalendarAlt className="w-5 h-5 text-purple-400" />
                  <span className="text-base">{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FaClock className="w-5 h-5 text-purple-400" />
                  <span className="text-base">{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FaMapMarkerAlt className="w-5 h-5 text-green-400" />
                  <span className="text-base">{selectedEvent.location}</span>
                </div>
              </div>

              {/* Event Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Event Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedEvent.detailedDescription}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Register
                </button>
                <button 
                  onClick={handleCloseModal}
                  className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default EventScheduleSection; 