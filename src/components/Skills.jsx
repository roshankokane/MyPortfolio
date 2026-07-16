import React, { useState } from 'react';
import { Search, Brain, BarChart2, Database, Layout, ShieldAlert, Cpu } from 'lucide-react';

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const skillCategories = [
    {
      title: "AI/ML & Deep Learning",
      description: "Architecting computer vision models, custom CNN backbones, transfer learning, and deep neural networks.",
      icon: <Brain className="h-6 w-6 text-cyberCyan" />,
      dotColor: "bg-cyberCyan",
      hoverBorder: "hover:border-cyberCyan/40 hover:text-cyberCyan hover:shadow-cyberCyan/5",
      skills: [
        { name: "Machine Learning" },
        { name: "Deep Learning" },
        { name: "Convolutional Neural Networks (CNN)" },
         { name: "Generative AI" },
        { name: "LLMs" },
        { name: "Prompt Engineering" },
        { name: "Retrieval-Augmented Generation (RAG)" },
        { name: "PyTorch" },
        { name: "Scikit-learn" },
        { name: "Transfer Learning" },
        { name: "TensorFlow / Keras" },
        { name: "Scikit-learn" },
        { name: "OpenCV" }
      ]
    },
    {
      title: "Data Analysis & Science",
      description: "Statistical computing, exploratory data analysis, data wrangling pipelines, and BI dashboards.",
      icon: <BarChart2 className="h-6 w-6 text-cyberEmerald" />,
      dotColor: "bg-cyberEmerald",
      hoverBorder: "hover:border-cyberEmerald/40 hover:text-cyberEmerald hover:shadow-cyberEmerald/5",
      skills: [
        { name: "Pandas" },
        { name: "NumPy" },
        { name: "Matplotlib & Seaborn" },
        { name: "Exploratory Data Analysis (EDA)" },
        { name: "Power BI" },
        {name:"Data Visualization"},
        {name:"Tableau"},
        {name:"Excel"}

  
      ]
    },
    {
      title: "Full Stack & Databases",
      description: "Engineering production-ready user interfaces, caching layers, and database schemas.",
      icon: <Database className="h-6 w-6 text-cyberIndigo" />,
      dotColor: "bg-cyberIndigo",
      hoverBorder: "hover:border-cyberIndigo/40 hover:text-cyberIndigo hover:shadow-cyberIndigo/5",
      skills: [
       {name:"HTML5"},
        { name: "CSS3" },   
        {name:"JavaScript/ES6+"},
        { name: "React.js / Vite" },
        { name: "Node.js / Express.js" },
        {name:"REST APIs"},
        {name:"Bootstrap"},
         {name:"Authentication (JWT/OAuth)"}, 
        { name: "Flask" },
        { name: "MongoDB" },
        { name: "PostgreSQL" },
        { name: "Tailwind CSS" }

      ]
    },
    {
      title: "Core Computer Science",
      description: "Fundamental principles of software engineering, system architecture, database storage, and protocol suites.",
      icon: <Cpu className="h-6 w-6 text-cyberBlue" />,
      dotColor: "bg-cyberBlue",
      hoverBorder: "hover:border-cyberBlue/40 hover:text-cyberBlue hover:shadow-cyberBlue/5",
      skills: [
        { name: "Data Structures & Algorithms" },
        { name: "Object-Oriented Programming (OOP)" },
        { name: "DBMS" },
        { name: "Operating Systems" },
        { name: "Computer Networks" }
      ]
    },
    {
      title: " Programming Languages",
      description: "Writing robust code, packaging applications, orchestration, and version control workflows.",
      icon: <Layout className="h-6 w-6 text-cyberPurple" />,
      dotColor: "bg-cyberPurple",
      hoverBorder: "hover:border-cyberPurple/40 hover:text-cyberPurple hover:shadow-cyberPurple/5",
      skills: [
        { name: "Python" },
        { name: "JavaScript" },
        { name: "SQL" },
        { name: "Java" },
        { name: "C++" },
        { name: "C" }
    
      ]
    },
    {
       title: "Cloud & Deployment",
      description: "Writing robust code, packaging applications, orchestration, and version control workflows.",
      icon: <Layout className="h-6 w-6 text-cyberPurple" />,
      dotColor: "bg-cyberPurple",
      hoverBorder: "hover:border-cyberPurple/40 hover:text-cyberPurple hover:shadow-cyberPurple/5",
      skills: [
  { name: "Git" },
  { name: "GitHub" },
  { name: "Docker" },
  { name: "Kubernetes" },
  { name: "Linux" },
  { name: "AWS (Basics)" },
  { name: "Google Cloud (Basics)" },
  { name: "Azure AI (Basics)" },
  { name: "Vercel" },
  { name: "Netlify" }
]
    }
  ];

  const filteredCategories = skillCategories.map(category => {
    const filteredSkills = category.skills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...category, skills: filteredSkills };
  }).filter(category => category.skills.length > 0);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-darkBg">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyberEmerald/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Technical <span className="text-gradient-cyan-blue">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-cyberCyan mx-auto rounded-full mb-8"></div>
          
          {/* Skill Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-450" />
            <input
              type="text"
              placeholder="Search skill (e.g. Py, CNN, React...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-darkCard border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyberCyan focus:ring-1 focus:ring-cyberCyan/35 transition-all text-sm font-mono"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category, catIndex) => (
            <div key={catIndex} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center space-x-3 mb-3">
                  {category.icon}
                  <h3 className="text-xl font-bold text-slate-100 font-mono">
                    {category.title}
                  </h3>
                </div>
                
                {/* Professional category description */}
                <p className="text-xs text-slate-455 leading-relaxed mb-6 font-sans">
                  {category.description}
                </p>

                {/* Skill Chips Flex wrap */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className={`inline-flex items-center px-4 py-2 bg-slate-900/60 border border-slate-850 rounded-xl text-sm text-slate-300 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${category.hoverBorder} group cursor-default`}
                    >
                      {/* Pulse Status Bullet */}
                      <span className={`w-2 h-2 rounded-full ${category.dotColor} mr-2.5 transition-all duration-300 group-hover:scale-110`} />
                      
                      <span className="font-mono text-xs tracking-wide">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center py-12 glass-panel rounded-2xl border border-dashed border-slate-800">
              <ShieldAlert className="h-12 w-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400 font-mono text-sm">No skills found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
