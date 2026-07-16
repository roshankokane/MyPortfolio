import React from 'react';
import { Award, Cloud, GraduationCap, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const list = [
    {
      title: "GATE 2026 Qualified",
      issuer: "Ministry of Education, Govt. of India",
      date: "March 2026",
      score: "Score: 320/1000",
      description: "Qualified the Graduate Aptitude Test in Engineering in Information Technology. Proved conceptual strength in Computer Architecture, OS, DBMS, Algorithms, and Mathematics.",
      icon: <GraduationCap className="h-6 w-6 text-cyberCyan" />,
      color: "border-cyberCyan/20 text-cyberCyan bg-cyberCyan/5"
    },
    {
      title: "Intermediate Machine Learning",
      issuer: "Kaggle",
      date: "2025",
      score: "Verified Credential",
      description: "Demonstrated skills in handling missing values, encoding categorical variables, building pipelines, hyperparameter tuning, XGBoost, and avoiding data leakage.",
      icon: <Award className="h-6 w-6 text-cyberEmerald" />,
      color: "border-cyberEmerald/20 text-cyberEmerald bg-cyberEmerald/5",
      link: "https://drive.google.com/file/d/14mMe-o2JgcZk03nURzvdmXVZokZ1Upbv/view"
    },
    {
      title: "AWS AI-Powered Cloud Engineer",
      issuer: "AICTE EduSkills Virtual Internship",
      date: "2025",
      score: "Virtual Internship",
      description: "Hands-on virtual internship focusing on deploying AI/ML workloads on AWS. Covered Amazon SageMaker, AWS Lambda, IAM policies, and cloud infrastructure management.",
      icon: <Cloud className="h-6 w-6 text-cyberIndigo" />,
      color: "border-cyberIndigo/20 text-cyberIndigo bg-cyberIndigo/5",
      link: "https://drive.google.com/file/d/1v2wTl0MX4T9iH60yIKzxw10LuP2R1f0D/view"
    },
    {
      title: "ITSA Marketing Head",
      issuer: "Information Technology Student Association",
      date: "May 2026",
      score: "Leadership Credential",
      description: "Awarded for leading the ITSA marketing team. Managed campaigns for technical events and public outreach, onboarding 150+ students for CEP and 250+ for Project Expo.",
      icon: <Award className="h-6 w-6 text-cyberPurple" />,
      color: "border-cyberPurple/20 text-cyberPurple bg-cyberPurple/5",
      link: "https://drive.google.com/file/d/1S6-GkkLtzSRT2k0cQ-l3PgNJwb8DLI02/view"
    },
    
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-darkBg">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyberCyan/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Certifications & <span className="text-gradient-cyan-blue">Achievements</span>
          </h2>
          <div className="h-1 w-20 bg-cyberCyan mx-auto rounded-full"></div>
        </div>

        {/* Grid Layout (3 columns on large screens to display 5 items beautifully) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((cert, index) => (
            <div key={index} className="glass-panel p-6 rounded-2xl flex flex-col justify-between glass-panel-hover group relative">
              {/* Corner Glow Effect */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div>
                {/* Header Icon + Details */}
                <div className="flex items-center space-x-3.5 mb-5">
                  <div className={`p-3 rounded-xl border ${cert.color}`}>
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 leading-snug group-hover:text-cyberCyan transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{cert.issuer}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              {/* View Certificate Link Button */}
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono text-cyberCyan bg-cyberCyan/10 border border-cyberCyan/35 hover:bg-cyberCyan/20 px-3.5 py-2 rounded-full transition-colors mb-5 self-start"
                >
                  <Award className="h-3.5 w-3.5 mr-1" />
                  View Certificate
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}

              {/* Bottom Row: Score & Date */}
              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between mt-auto">
                <span className="text-xs font-mono text-slate-500">{cert.date}</span>
                <span className="text-xs font-mono font-bold text-cyberCyan bg-cyberCyan/10 border border-cyberCyan/20 px-2 py-0.5 rounded">
                  {cert.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
