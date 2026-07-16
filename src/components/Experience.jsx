import React from 'react';
import { Calendar, Users, Award, ExternalLink } from 'lucide-react';

const Experience = () => {
  const roles = [
    {
      title: "Marketing Team Lead",
      organization: "Information Technology Student Association (ITSA)",
      period: "Aug 2025 – May 2026",
      achievements: [
        "Led a team of 10 students to execute comprehensive marketing campaigns for academic and technical events.",
        "Promoted the CEP (Career Enhancement Program) project, successfully onboarding 150+ active participants.",
        "Conducted multi-college outreach campaigns for the Project Expo, attracting 250+ external student participants.",
        "Coordinated with design and public relations teams to create cohesive visual assets and media outreach plans."
      ],
      skillsLearned: ["Team Leadership", "Strategic Outreach", "Campaign Management", "Event Planning"]
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-darkBg/60">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyberPurple/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Leadership & <span className="text-gradient-cyan-blue">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-cyberCyan mx-auto rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {roles.map((role, index) => (
            <div key={index} className="glass-panel p-8 rounded-2xl border border-white/5 relative hover:border-cyberCyan/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-200 font-sans group-hover:text-cyberCyan">
                    {role.title}
                  </h3>
                  <p className="text-cyberCyan font-semibold mt-1">
                    {role.organization}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3 md:mt-0">
                  <span className="inline-flex items-center text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-cyberCyan" />
                    {role.period}
                  </span>
                  
                  <a 
                    href="https://drive.google.com/file/d/1S6-GkkLtzSRT2k0cQ-l3PgNJwb8DLI02/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-mono text-cyberCyan bg-cyberCyan/10 border border-cyberCyan/35 hover:bg-cyberCyan/20 px-3 py-1 rounded-full transition-colors self-start sm:self-center"
                  >
                    <Award className="h-3.5 w-3.5 mr-1" />
                    [Certificate]
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>

              {/* Achievements list */}
              <div className="space-y-3.5 mb-8">
                {role.achievements.map((item, actIndex) => (
                  <div key={actIndex} className="flex items-start">
                    <span className="text-cyberCyan mr-3 mt-1.5 flex-shrink-0">•</span>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills Tags */}
              <div>
                <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3 flex items-center">
                  <Users className="h-4 w-4 text-cyberCyan mr-1.5" />
                  Core Competencies Exhibited
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {role.skillsLearned.map((skill, skillIdx) => (
                    <span 
                      key={skillIdx} 
                      className="text-xs bg-slate-900/60 border border-slate-850 px-3 py-1.5 rounded-md text-slate-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
