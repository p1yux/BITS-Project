"use client"
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Enhanced transform values for more dramatic E-Summit like effect
  const scale = useTransform(scrollY, [0, 1000], [1, 25]); // Increased max scale
  const opacity = useTransform(scrollY, [0, 600], [1, 0]); // Faster fade out
  
  // Make tech01 fully visible at start and disappear quickly on scroll
  const tech01Opacity = useTransform(
    scrollY,
    [0, 50],     // Very short scroll range for quick disappearance
    [1, 0]       // Start fully visible, disappear quickly
  );
  
  // Keep main video subtle at start
  const techBgOpacity = useTransform(
    scrollY,
    [0, 300, 600],
    [0.3, 0.8, 0]  // Start more transparent
  );

  const scrollToRegister = () => {
    // Scroll to 100vh to reveal the register section
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let lastTime = 0;
    const FPS = 30; // Limit FPS to 30
    const frameDelay = 1000 / FPS;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Optimize Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2 + 0.1;
        this.size = Math.random() * 1.5 + 1;
        this.speedX = (Math.random() * 0.5 - 0.25); // Reduced speed
        this.speedY = (Math.random() * 0.5 - 0.25); // Reduced speed
        this.speedZ = (Math.random() * 0.005 - 0.0025); // Reduced speed
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;

        if (this.z <= 0.1) {
          this.z = 0.1;
          this.speedZ *= -1;
        } else if (this.z >= 2) {
          this.z = 2;
          this.speedZ *= -1;
        }
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        const scale = Math.max(0.1, (2 - this.z) * 1.5);
        const opacity = Math.max(0.1, (2 - this.z) * 0.2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size * scale), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Reduced number of particles
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle());
      }
    };

    const animate = (currentTime) => {
      // Add FPS limiting
      if (currentTime - lastTime < frameDelay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Use a single loop for better performance
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update();
        particle.draw();
        
        // Only check connections with particles ahead in the array
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 - distance/80})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Throttle resize handler
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        init();
      }, 250);
    };

    init();
    animate(0);

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {/* Main Tech-bg Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: techBgOpacity }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
          className="object-cover w-full h-full"
        >
          <source src="/tech-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-blue-950"
        style={{ opacity }}
      >
        {/* Overlay Tech01 Video - Moved here */}
        <motion.div 
          className="absolute inset-0 w-full h-full mix-blend-soft-light" 
          style={{ opacity: tech01Opacity }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full brightness-125 contrast-100"
          >
            <source src="/tech01.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full mix-blend-screen"
        />
        
        <motion.div 
          ref={containerRef}
          style={{ 
            scale,
            transformOrigin: 'center center'
          }}
          className="absolute inset-0 flex items-center justify-center w-full h-full px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 md:text-7xl lg:text-8xl">
              Welcome to BITS 2025
            </h1>
            
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-300 md:text-xl lg:text-2xl">
              Join us for the biggest technology summit of the year. 
              <span className="block mt-2">Experience innovation, connect with industry leaders, and shape the future.</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={scrollToRegister}
                className="px-8 py-3 text-lg font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-102"
              >
                Register Now
              </button>
              <button 
                onClick={scrollToRegister}
                className="px-8 py-3 text-lg font-semibold text-blue-400 transition-all border-2 border-blue-400 rounded-full hover:bg-blue-400/10 hover:scale-102"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;