import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MLSandbox from './components/MLSandbox';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-darkBg text-slate-100 flex flex-col">
      {/* Global Background Grid */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0"></div>
      
      {/* Navigation Header */}
      <Navbar />

      {/* Page Sections */}
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <MLSandbox />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-10 text-slate-500 text-xs font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center items-center space-x-2 text-sm text-slate-400">
            <Terminal className="h-4 w-4 text-cyberCyan" />
            <span>Roshan Kokane &bull; Portfolio 2026</span>
          </div>
          <p className="max-w-md mx-auto text-slate-500 leading-relaxed">
            IT Undergraduate at I²IT Pune. Specialized in deep learning diagnostic pipelines, data visualizations, and full-stack software development.
          </p>
          <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-650">
            <span>Built with React, Tailwind CSS, &</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-cyberCyan/10 border border-cyberCyan/35 text-cyberCyan rounded-full hover:bg-cyberCyan hover:text-darkBg hover:shadow-lg hover:shadow-cyberCyan/20 transition-all duration-300 animate-fade-in"
          title="Scroll to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default App;
