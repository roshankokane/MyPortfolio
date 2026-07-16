import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'ML Playground' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('home')}>
            <Cpu className="h-8 w-8 text-cyberCyan mr-2 animate-pulse" />
            <span className="text-xl font-bold tracking-wider font-mono">
              ROSHAN<span className="text-cyberCyan">.ML</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-cyberCyan ${
                  activeSection === item.id ? 'text-cyberCyan border-b-2 border-cyberCyan pb-1' : 'text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Socials / External links */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="https://github.com/roshankokane" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyberCyan transition-colors duration-200">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/RoshanKokane" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyberCyan transition-colors duration-200">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:rkokane529@gmail.com" className="text-slate-400 hover:text-cyberCyan transition-colors duration-200">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-nav absolute top-20 left-0 right-0 py-4 shadow-xl border-t border-white/5 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full py-3 text-center text-base font-medium rounded-md transition-colors duration-200 ${
                  activeSection === item.id ? 'text-cyberCyan bg-cyberCyan/10' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex justify-center space-x-6 pt-4 border-t border-white/5 w-full mt-2">
              <a href="https://github.com/roshankokane" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyberCyan">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/roshan-kokane-3044b428a" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyberCyan">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:rkokane529@gmail.com" className="text-slate-400 hover:text-cyberCyan">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
