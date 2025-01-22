"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is BITS 2025's focus on startups?",
      answer: "BITS 2025 provides a platform for startups to showcase their innovations, connect with investors, and participate in pitch competitions. We offer dedicated startup booths, mentorship sessions, and networking opportunities with industry leaders."
    },
    {
      question: "How can I participate in the startup pitch competition?",
      answer: "Startups can apply through our dedicated portal. Selected startups will get a chance to pitch their ideas to a panel of renowned investors and industry experts. Winners receive funding opportunities, mentorship, and valuable resources."
    },
    {
      question: "What networking opportunities are available?",
      answer: "We offer structured networking sessions, one-on-one meetings with investors, roundtable discussions with industry experts, and informal networking events. Our mobile app helps you connect with relevant attendees."
    },
    {
      question: "What technologies will be showcased at BITS 2025?",
      answer: "BITS 2025 covers cutting-edge technologies including AI/ML, Blockchain, IoT, Cloud Computing, Cybersecurity, and Sustainable Tech. We feature hands-on workshops, tech demos, and expert-led sessions."
    },
    {
      question: "Are there workshops for business development?",
      answer: "Yes, we offer workshops on business strategy, fundraising, market analysis, scaling operations, and digital transformation. These are led by successful entrepreneurs and business leaders."
    },
    {
      question: "What investment opportunities are available?",
      answer: "Investors can connect with pre-vetted startups, participate in private pitch sessions, and join investor-only networking events. We also facilitate one-on-one meetings with promising startups."
    },
    {
      question: "How can I become a sponsor or partner?",
      answer: "We offer various sponsorship tiers with different benefits. Contact our partnerships team for detailed information about sponsorship packages and custom collaboration opportunities."
    },
    {
      question: "What makes BITS 2025 different from other tech events?",
      answer: "BITS 2025 uniquely combines technology, business, and innovation. We focus on actionable insights, real networking opportunities, and tangible business outcomes rather than just presentations."
    }
  ];

  return (
    <section id="faq-section" className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-lg">
            Everything you need to know about BITS 2025
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="apple-glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-blue-400" />
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-300">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 