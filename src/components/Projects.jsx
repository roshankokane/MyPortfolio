import React from 'react';
import { ExternalLink, Cpu, Database, Server, Flame, Sparkles, BookOpen } from 'lucide-react';
import { Github } from './Icons';

const Projects = () => {
  const projects = [
    {
      title: "NoteShare – Academic Notes Platform",
      category: "Full Stack Development",
      description: "A production-grade, secure academic note-sharing platform built to facilitate resource sharing among students. Features secure PDF reading controls, caching layers, and an companion Android application.",
      highlights: [
        "Onboarded 165+ registered active student users with secure document uploads.",
        "Implemented secure PDF viewing with dynamic watermarking and keyboard shortcut blocking.",
        "Created a custom 2-level caching architecture using local memory (L1) and Redis (L2) to reduce DB query latency by 65%.",
        "Packaged the frontend into a native Android app using Capacitor JS."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "Cloudinary", "JWT", "Capacitor"],
      links: {
        github: "https://github.com/roshankokane",
        live: "#" // Representing live link
      },
      icon: <BookOpen className="h-6 w-6 text-cyberCyan" />,
      accentColor: "from-cyberCyan to-cyberBlue"
    },
    {
      title: "Skin Cancer Prediction System",
      category: "AI/ML & Deep Learning",
      description: "An end-to-end computer vision solution designed to perform binary classification of dermatoscopic skin lesions into Benign and Malignant configurations, designed for clinical assistance.",
      highlights: [
        "Achieved 85% validation accuracy in binary classification on structured clinical datasets.",
        "Implemented and compared three architecture backbones: Custom CNN, MobileNetV2, and VGG19.",
        "Utilized Grad-CAM to generate visual attention heatmaps, highlighting diagnostic lesion regions.",
        "Created a Flask inference service that parses images and compiles patient-ready PDF reports."
      ],
      tech: ["Python", "TensorFlow", "Keras", "Flask", "Flask-CORS", "NumPy", "Pillow", "OpenCV"],
      links: {
        github: "https://github.com/roshankokane",
        demo: "playground" // Scroll to playground
      },
      icon: <Flame className="h-6 w-6 text-cyberPink" />,
      accentColor: "from-cyberPurple to-cyberPink"
    }
  ];

  const handleDemoScroll = (targetId) => {
    const element = document.getElementById(targetId);
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
    <section id="projects" className="py-24 relative overflow-hidden bg-darkBg">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyberIndigo/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Featured <span className="text-gradient-cyan-blue">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-cyberCyan mx-auto rounded-full"></div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div key={index} className="glass-panel rounded-2xl flex flex-col justify-between overflow-hidden border border-white/5 hover:border-cyberCyan/15 transition-all duration-300 group">
              
              {/* Card top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${project.accentColor}`}></div>

              <div className="p-8 flex-grow">
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyberCyan bg-cyberCyan/10 border border-cyberCyan/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {project.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyberCyan transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Key Engineering Details</h4>
                  {project.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start">
                      <Sparkles className="h-4 w-4 text-cyberCyan mr-2.5 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-300 text-sm leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom section (Tech + Links) */}
              <div className="p-8 border-t border-slate-850 bg-slate-900/30">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tag, tIndex) => (
                    <span key={tIndex} className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center space-x-4">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-sm font-semibold rounded-lg transition-colors border border-slate-700/50"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>

                  {project.links.live && (
                    <a
                      href={project.links.live}
                      className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-cyberCyan to-cyberBlue text-darkBg text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-cyberCyan/15 transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Platform</span>
                    </a>
                  )}

                  {project.links.demo && (
                    <button
                      onClick={() => handleDemoScroll(project.links.demo)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-cyberPurple to-cyberPink text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyberPink/15 transition-all"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Run Live Demo</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
