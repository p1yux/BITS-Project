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
  const videoOpacity = useTransform(
    scrollY,
    [0, 300, 600],  // Adjusted scroll points
    [1, 0.8, 0]     // Start fully visible, maintain longer, then fade
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
        this.size = Math.random() * 2 + 1.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.speedZ = Math.random() * 0.02 - 0.01;
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
      for (let i = 0; i < 100; i++) {
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

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/100})`;
            ctx.lineWidth = 1;
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
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: videoOpacity }}
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
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-blue-950"
        style={{ opacity }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
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
              Experience innovation, connect with industry leaders, and shape the future.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={scrollToRegister}
                className="px-8 py-3 text-lg font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
              >
                Register Now
              </button>
              <button 
                onClick={scrollToRegister}
                className="px-8 py-3 text-lg font-semibold text-blue-400 transition-all border-2 border-blue-400 rounded-full hover:bg-blue-400/10 hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-white text-sm font-light tracking-wider">
            SCROLL TO EXPLORE
          </p>
          <div className="w-6 h-10 border-2 border-white rounded-full mt-2 relative">
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [2, 20, 2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
