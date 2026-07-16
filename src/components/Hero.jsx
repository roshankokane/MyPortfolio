import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, Phone, Award } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import roshan from '../assets/roshan.jpeg';

const Hero = () => {
  const canvasRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [
    "Machine Learning Engineer",
    "Data Analyst",
    "IT Student at I²IT Pune"
  ];

  // Title typing/rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Neural network particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(60, Math.floor(width / 25));

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4'; // Cyan-500
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - dist / 120 / 6})`; // Cyan fade
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid pt-24 pb-16">
      {/* Canvas Particle Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      
      {/* Premium background blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyberCyan/10 rounded-full blur-3xl pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-cyberPurple/8 rounded-full blur-3xl pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-[35%] left-[50%] w-[350px] h-[350px] bg-cyberIndigo/8 rounded-full blur-3xl pointer-events-none z-0 animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-transparent to-darkBg pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio / Text */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">
            {/* Banner Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel text-xs text-cyberCyan font-mono tracking-wider mb-6 animate-float">
              <Award className="h-4 w-4" />
              <span>GATE 2026 QUALIFIED (SCORE: 320)</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 leading-none">
              Roshan Kokane
            </h1>

            {/* Animated Subtitle */}
            <div className="h-12 sm:h-16 flex items-center justify-center lg:justify-start mb-6">
              <p className="text-xl sm:text-3xl font-mono text-gradient-cyan-blue font-semibold">
                {titles[titleIndex]}<span className="text-cyberCyan animate-pulse">_</span>
              </p>
            </div>

            {/* Quick Summary */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed">
              IT student at <span className="text-slate-200 font-semibold font-sans">International Institute of Information Technology (I²IT), Pune</span> (CGPA: 9.40) specializing in Deep Learning, Data Analysis, and scalable frontend architectures.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 mb-12 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('playground')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyberCyan to-cyberBlue text-darkBg font-bold rounded-lg hover:shadow-lg hover:shadow-cyberCyan/20 transition-all duration-300 flex items-center justify-center group"
              >
                Explore ML Playground
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-8 py-3.5 glass-panel text-slate-200 font-semibold rounded-lg hover:bg-slate-800 transition-all duration-300"
              >
                View Projects
              </button>
            </div>

            {/* Social Links (Inline Flex list) */}
            <div className="flex flex-wrap gap-x-6 gap-y-3.5 justify-center lg:justify-start border-t border-white/10 pt-8 text-sm text-slate-400 w-full">
              <a href="https://github.com/roshankokane" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-cyberCyan transition-colors duration-200">
                <Github className="h-4.5 w-4.5" />
                <span className="font-mono text-xs">github.com/roshankokane</span>
              </a>
              <a href="https://linkedin.com/in/RoshanKokane" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-cyberCyan transition-colors duration-200">
                <Linkedin className="h-4.5 w-4.5" />
                <span className="font-mono text-xs">linkedin/RoshanKokane</span>
              </a>
              <a href="mailto:rkokane529@gmail.com" className="flex items-center space-x-2 hover:text-cyberCyan transition-colors duration-200">
                <Mail className="h-4.5 w-4.5" />
                <span className="font-mono text-xs">rkokane529@gmail.com</span>
              </a>
              <a href="tel:+917028226675" className="flex items-center space-x-2 hover:text-cyberCyan transition-colors duration-200">
                <Phone className="h-4.5 w-4.5" />
                <span className="font-mono text-xs">+91 70282 26675</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Picture */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div className="relative group">
              {/* Blur backdrop behind picture */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyberCyan via-cyberIndigo to-cyberPurple rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-all duration-700 pointer-events-none animate-pulse-slow"></div>

              {/* Glowing ring wrapper */}
              <div className="relative p-[4px] rounded-full bg-gradient-to-tr from-cyberCyan via-cyberIndigo to-cyberPurple shadow-[0_0_50px_rgba(6,182,212,0.12)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.25)] transition-all duration-500 animate-float">
                
                {/* Profile Photo */}
                <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-[6px] border-darkBg/95">
                  <img
                    src={roshan}
                    alt="Roshan Kokane"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>



              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
