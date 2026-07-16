import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  // Read environment variables
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL || "rkokane529@gmail.com";

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) {
      tempErrors.name = "Full name is required";
    }
    
    if (!form.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    
    if (!form.subject.trim()) {
      tempErrors.subject = "Subject line is required";
    }
    
    if (!form.message.trim()) {
      tempErrors.message = "Message body cannot be empty";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message should be at least 10 characters long";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // Fallback UI Simulation if Env vars are not configured
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn(
        "EmailJS credentials missing. Running UI simulation. Create a '.env' file based on '.env.example' and add your Service ID, Template ID, and Public Key to send real emails."
      );
      
      setTimeout(() => {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }, 2200);
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
      to_email: TO_EMAIL
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        console.error('EmailJS dispatch failed:', err);
        setStatus('error');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-darkBg/60">
      {/* Glow Blur Backdrops */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyberCyan/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyberPurple/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Get In <span className="text-gradient-cyan-blue">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-cyberCyan mx-auto rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Contact Info cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-100">Let's Connect</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                I am actively looking for internship and junior roles in **Machine Learning Engineering**, **Data Science**, or **Backend Development**. Feel free to drop a message, and let's build something intelligent together!
              </p>
            </div>

            <div className="space-y-4 py-6">
              {/* Email Card */}
              <div className="flex items-center space-x-4 glass-panel p-4.5 rounded-2xl border border-white/5 hover:border-cyberCyan/25 transition-all duration-300 group">
                <div className="p-3 bg-cyberCyan/10 text-cyberCyan border border-cyberCyan/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-5.5 w-5.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-550 uppercase tracking-widest">EMAIL ADDRESS</div>
                  <a href="mailto:rkokane529@gmail.com" className="text-sm sm:text-base font-semibold text-slate-200 hover:text-cyberCyan transition-colors">
                    rkokane529@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center space-x-4 glass-panel p-4.5 rounded-2xl border border-white/5 hover:border-cyberEmerald/25 transition-all duration-300 group">
                <div className="p-3 bg-cyberEmerald/10 text-cyberEmerald border border-cyberEmerald/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5.5 w-5.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-550 uppercase tracking-widest">CALL / WHATSAPP</div>
                  <a href="tel:+917028226675" className="text-sm sm:text-base font-semibold text-slate-200 hover:text-cyberCyan transition-colors">
                    +91 70282 26675
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center space-x-4 glass-panel p-4.5 rounded-2xl border border-white/5 hover:border-cyberIndigo/25 transition-all duration-300 group">
                <div className="p-3 bg-cyberIndigo/10 text-cyberIndigo border border-cyberIndigo/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5.5 w-5.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-550 uppercase tracking-widest">LOCATION</div>
                  <span className="text-sm sm:text-base font-semibold text-slate-250">
                    Pune, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Console Prompt Note */}
            <div className="glass-panel p-4 rounded-xl border border-cyberIndigo/10 bg-cyberIndigo/5 text-xs text-slate-450 font-mono leading-relaxed">
              <span className="text-cyberCyan font-bold mr-1.5">&gt;_</span>
              Forms are routed client-side securely. Copy .env.example to configure real SMTP integrations.
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative h-full flex flex-col justify-center">
              
              {status === 'success' ? (
                <div className="text-center py-12 space-y-6 animate-scale-in">
                  <div className="w-20 h-20 bg-cyberEmerald/10 border border-cyberEmerald/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.15)] animate-pulse">
                    <CheckCircle className="h-10 w-10 text-cyberEmerald" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-100">Message Transmitted!</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you, Roshan has received your email parameters and will respond shortly.
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-mono border border-slate-700/50 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start space-x-2.5 animate-fade-in">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Transmission Error:</span> EmailJS dispatch failed. Verify API credentials, connection parameters, or retry.
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono tracking-wider text-slate-450 uppercase">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={status === 'sending'}
                        className={`w-full px-4 py-3 bg-darkCard border ${errors.name ? 'border-red-500/50' : 'border-slate-800'} rounded-xl text-slate-200 focus:outline-none focus:border-cyberCyan focus:ring-2 focus:ring-cyberCyan/15 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all text-sm`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <span className="text-xs text-red-400 flex items-center font-mono mt-1">
                          <AlertCircle className="h-3.5 w-3.5 mr-1" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono tracking-wider text-slate-450 uppercase">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={status === 'sending'}
                        className={`w-full px-4 py-3 bg-darkCard border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} rounded-xl text-slate-200 focus:outline-none focus:border-cyberCyan focus:ring-2 focus:ring-cyberCyan/15 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all text-sm`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <span className="text-xs text-red-400 flex items-center font-mono mt-1">
                          <AlertCircle className="h-3.5 w-3.5 mr-1" />
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-slate-450 uppercase">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className={`w-full px-4 py-3 bg-darkCard border ${errors.subject ? 'border-red-500/50' : 'border-slate-800'} rounded-xl text-slate-200 focus:outline-none focus:border-cyberCyan focus:ring-2 focus:ring-cyberCyan/15 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all text-sm`}
                      placeholder="Project Inquiry / Job Opportunity"
                    />
                    {errors.subject && (
                      <span className="text-xs text-red-400 flex items-center font-mono mt-1">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-slate-450 uppercase">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className={`w-full px-4 py-3 bg-darkCard border ${errors.message ? 'border-red-500/50' : 'border-slate-800'} rounded-xl text-slate-200 focus:outline-none focus:border-cyberCyan focus:ring-2 focus:ring-cyberCyan/15 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all text-sm resize-none`}
                      placeholder="Tell me about your project or requirements..."
                    />
                    {errors.message && (
                      <span className="text-xs text-red-400 flex items-center font-mono mt-1">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full py-4 bg-gradient-to-r from-cyberCyan via-cyberIndigo to-cyberPurple text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center justify-center tracking-wider font-mono uppercase text-xs sm:text-sm ${
                      status === 'sending' ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'
                    }`}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="h-4.5 w-4.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2.5"></span>
                        Transmitting Packets...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2.5" />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
