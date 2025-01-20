"use client"
import { motion } from 'framer-motion';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { useAudio } from '@/context/AudioContext';

const AudioControl = () => {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <motion.button
      onClick={toggleAudio}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full apple-glass hover:scale-110 transition-transform duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {isPlaying ? (
          <HiSpeakerWave className="w-6 h-6 text-white" />
        ) : (
          <HiSpeakerXMark className="w-6 h-6 text-white" />
        )}
        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
      <div className="absolute -top-10 right-0 bg-black/80 px-3 py-1 rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {isPlaying ? 'Mute Audio' : 'Play Audio'}
      </div>
    </motion.button>
  );
};

export default AudioControl; 