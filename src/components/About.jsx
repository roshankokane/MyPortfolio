import React from 'react';
import { BookOpen, GraduationCap, Award, Calendar, FileText, Download } from 'lucide-react';

const About = () => {
  const education = [
    {
      institution: "International Institute of Information Technology (I²IT), Pune",
      degree: "B.E. Information Technology",
      period: "2023 – 2027",
      score: "CGPA: 9.40",
      description: "Focusing on core computer science subjects, algorithms, data structures, and statistical modeling. Actively involved in the Information Technology Student Association (ITSA)."
    },
    {
      institution: "Mahatma Phule Arts, Commerce and Science College, Panvel",
      degree: "HSC (MSBSHSE)",
      period: "2023",
      score: "Score: 87.67%",
      description: "Specialized in Science stream with mathematics."
    },
    {
      institution: "Shri Datta Vidyalaya, Pimperkhed",
      degree: "SSC (MSBSHSE)",
      period: "2021",
      score: "Score: 93.20%",
      description: "Secondary School Certificate."
    }
  ];

  const stats = [
    { label: "Academic CGPA", value: "9.40", desc: "Out of 10.0" },
    { label: "GATE 2026 Score", value: "320", desc: "Qualified IT Paper" },
    { label: "Active Project Users", value: "165+", desc: "On NoteShare Platform" },
    { label: "Kaggle Coursework", value: "ML", desc: "Intermediate Level" }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-darkBg/60">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyberIndigo/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            About <span className="text-gradient-cyan-blue">Me</span>
          </h2>
          <div className="h-1 w-20 bg-cyberCyan mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-semibold text-slate-200">
              Aspiring Machine Learning Engineer & Data Analyst
            </h3>
            <p className="text-slate-400 leading-relaxed">
              I am a third-year Information Technology undergraduate at I²IT Pune, heavily invested in the intersections of statistical data modeling, deep neural networks, and scalable engineering. I enjoy extracting actionable insights from data, building highly accurate prediction systems, and deploying optimized models.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My hands-on projects, such as NoteShare and the Skin Cancer Classification pipeline, demonstrate my ability to bridge full-stack system architecture with advanced AI models. Whether optimizing caching algorithms or designing CNN models, I aim for high engineering quality.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="glass-panel p-4 rounded-xl text-center glass-panel-hover">
                  <div className="text-3xl font-extrabold text-gradient-cyan-blue mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Resume Download Section */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 hover:border-cyberCyan/20 transition-all duration-300 space-y-4 shadow-lg mt-6 hover:-translate-y-1 hover:shadow-cyberCyan/5 group">
              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-cyberCyan/10 text-cyberCyan border border-cyberCyan/20 rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-100">Download Resume</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Download my latest resume to learn more about my education, technical skills, projects, certifications, and experience.
                  </p>
                </div>
              </div>
              
              <a
                href="https://drive.google.com/file/d/1PK-nir89tnJumhKEKJ2bdBIOuE4VaRym/view"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-cyberCyan to-cyberBlue hover:shadow-lg hover:shadow-cyberCyan/25 text-darkBg font-bold rounded-xl transition-all duration-300 flex items-center justify-center text-sm font-mono uppercase tracking-wider hover:scale-[1.01]"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </div>
          </div>

          {/* Education Timeline Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <GraduationCap className="h-6 w-6 text-cyberCyan" />
              <h3 className="text-2xl font-bold text-slate-200 font-mono">Academic Timeline</h3>
            </div>

            <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative group">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[31px] top-1.5 bg-darkBg border border-cyberCyan/50 w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-cyberCyan group-hover:scale-125 transition-all duration-300">
                    <div className="w-1.5 h-1.5 bg-cyberCyan rounded-full group-hover:bg-darkBg"></div>
                  </div>

                  <div className="glass-panel p-5 rounded-xl glass-panel-hover">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-lg font-bold text-slate-200 group-hover:text-cyberCyan transition-colors">
                        {edu.institution}
                      </h4>
                      <span className="inline-flex items-center text-xs text-slate-500 font-mono mt-1 sm:mt-0">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {edu.period}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-300 font-semibold mb-3">
                      <span>{edu.degree}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyberCyan/10 text-cyberCyan text-xs border border-cyberCyan/20">
                        {edu.score}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-400 leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
