"use client"
import { motion } from 'framer-motion';
import Navbar from '@/components/custom/Navigation/Navbar';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 text-center">
            Contact Us
          </h1>
          <div className="apple-glass rounded-3xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 