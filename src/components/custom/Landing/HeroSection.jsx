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
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2 + 0.1;
        this.size = Math.random() * 1.5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.speedZ = Math.random() * 0.01 - 0.005;
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
        const scale = Math.max(0.1, (2 - this.z) * 2);
        const opacity = Math.max(0.1, (2 - this.z) * 0.3);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size * scale), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      particles.forEach(a => {
        particles.forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - distance/80})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', setCanvasSize);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
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
            className="object-cover w-full h-full brightness-150 contrast-125"
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
            <h1 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 md:text-7xl lg:text-8xl glow-text">
              Welcome to BITS 2025
            </h1>
            
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-300 md:text-xl lg:text-2xl">
              Join us for the biggest technology summit of the year. 
              <span className="block mt-2">Experience innovation, connect with industry leaders, and shape the future.</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={scrollToRegister}
                className="px-8 py-3 text-lg font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 hover:glow-button"
              >
                Register Now
              </button>
              <button 
                onClick={scrollToRegister}
                className="px-8 py-3 text-lg font-semibold text-blue-400 transition-all border-2 border-blue-400 rounded-full hover:bg-blue-400/10 hover:scale-105 hover:glow-border"
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