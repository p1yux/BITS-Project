"use client"
import { motion } from 'framer-motion';
import Navbar from '@/components/custom/Navigation/Navbar';

export default function AboutPage() {
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
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
            About BITS 2025
          </h1>
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">
              BITS 2025 is the premier technology conference bringing together innovators,
              thought leaders, and tech enthusiasts from around the globe.
            </p>
            {/* Add more content as needed */}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 