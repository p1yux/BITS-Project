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
    [0.3, 0.8, 0.3]  // Start more transparent
  );

  const scrollToRegister = () => {
    // Scroll to 100vh to reveal the register section
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const scrollToSchedule = () => {
    // Scroll to event schedule section
    const scheduleSection = document.querySelector('#event-schedule-section');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
        this.speedX = (Math.random() * 1 - 0.5); // Increased range from 0.5 to 1
        this.speedY = (Math.random() * 1 - 0.5); // Increased range from 0.5 to 1
        this.speedZ = (Math.random() * 0.01 - 0.005); // Increased from 0.005 to 0.01
      }

      update() {
        // Add minimum speed threshold
        const minSpeed = 0.1;
        
        // Ensure minimum movement speed
        if (Math.abs(this.speedX) < minSpeed) {
          this.speedX = minSpeed * (this.speedX < 0 ? -1 : 1);
        }
        if (Math.abs(this.speedY) < minSpeed) {
          this.speedY = minSpeed * (this.speedY < 0 ? -1 : 1);
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;

        // Bounce effect for z-axis
        if (this.z <= 0.1) {
          this.z = 0.1;
          this.speedZ = Math.abs(this.speedZ); // Ensure positive speed
        } else if (this.z >= 2) {
          this.z = 2;
          this.speedZ = -Math.abs(this.speedZ); // Ensure negative speed
        }
        
        // Wrap around screen edges
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
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
          className="object-cover w-full h-full"
        >
          <source src="/bg-img.jpg" type="image/jpg" />
        </video> */}
        <img src="./bg-img.jpg"/>
        <div className="cover-bg inset-0 bg-black/40" />
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
            <source src="/tech-bg.mp4" type="video/mp4" />
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
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5
              }}
              className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 md:text-7xl lg:text-8xl"
            >
              Welcome to BLITS
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="max-w-5xl mx-auto mb-8"
            >
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.4 
                }}
                className="text-lg text-gray-300 md:text-xl lg:text-2xl leading-relaxed"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut",
                    delay: 1.6 
                  }}
                >
                  A flagship startup event by BITS Pilani and Bureau of Indian Standards (BIS), offering pitching, certification support, and networking with global industry leaders.
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut",
                    delay: 1.8 
                  }}
                  className="block mt-4"
                >
                  Empowering startups in electrotechnology, digital transformation, and sustainability to innovate and connect with investors. Join 2,000-3,000 attendees including students, startups, and industry experts.
                </motion.span>
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 2.0 
              }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: 2.1 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToRegister}
                className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Register Now
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: 2.2 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToSchedule}
                className="px-8 py-3 text-lg font-semibold text-blue-400 border-2 border-blue-400 rounded-full hover:bg-blue-400/10 transition-colors duration-200"
              >
                View Schedule
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;