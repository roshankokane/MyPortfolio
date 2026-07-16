import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Brain, BarChart2, ShieldAlert, FileText, Settings, Info } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// Solve 3x3 linear system using Cramer's rule
const solveQuadraticRegression = (data) => {
  const n = data.length;
  if (n < 3) return { a: 0, b: 0, c: 0 };

  let sumX = 0, sumY = 0, sumX2 = 0, sumX3 = 0, sumX4 = 0;
  let sumXY = 0, sumX2Y = 0;

  for (let i = 0; i < n; i++) {
    const x = data[i].x;
    const y = data[i].y;
    const x2 = x * x;
    sumX += x;
    sumY += y;
    sumX2 += x2;
    sumX3 += x2 * x;
    sumX4 += x2 * x2;
    sumXY += x * y;
    sumX2Y += x2 * y;
  }

  // Matrix:
  // | sumX4  sumX3  sumX2 | | a |   | sumX2Y |
  // | sumX3  sumX2  sumX  | | b | = | sumXY  |
  // | sumX2  sumX   n     | | c |   | sumY   |

  const det = 
    sumX4 * (sumX2 * n - sumX * sumX) -
    sumX3 * (sumX3 * n - sumX * sumX2) +
    sumX2 * (sumX3 * sumX - sumX2 * sumX2);

  if (Math.abs(det) < 1e-5) {
    return { a: 0, b: 0, c: 0 }; // Fallback
  }

  const detA = 
    sumX2Y * (sumX2 * n - sumX * sumX) -
    sumX3 * (sumXY * n - sumX * sumY) +
    sumX2 * (sumXY * sumX - sumX2 * sumY);

  const detB = 
    sumX4 * (sumXY * n - sumX * sumY) -
    sumX2Y * (sumX3 * n - sumX * sumX2) +
    sumX2 * (sumX3 * sumY - sumXY * sumX2);

  const detC = 
    sumX4 * (sumX2 * sumY - sumXY * sumX) -
    sumX3 * (sumX3 * sumY - sumX2Y * sumX) +
    sumX2Y * (sumX3 * sumX - sumX2 * sumX2);

  return {
    a: detA / det,
    b: detB / det,
    c: detC / det
  };
};

const MLSandbox = () => {
  const [activeTab, setActiveTab] = useState('classifier');

  // --- Dermatology AI State ---
  const [selectedLesion, setSelectedLesion] = useState('nevus');
  const [inferenceStep, setInferenceStep] = useState(0);
  const [inferenceProgress, setInferenceProgress] = useState(0);
  const [isClassifying, setIsClassifying] = useState(false);
  const [showGradCam, setShowGradCam] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const lesions = {
    nevus: {
      name: "Nevus (Common Mole)",
      type: "Benign",
      confidence: 94.2,
      risk: "Low",
      diameter: "4.2 mm",
      asymmetry: "Symmetric",
      color: "Uniform Light Brown",
      description: "A melanocytic nevus showing sharp margins, symmetric distribution of pigment, and a uniform brown color palette. Consistent with standard benign configurations.",
      gradCamCenter: { cx: 100, cy: 100, r: 60 },
      svgPath: "M100,40 C133,40 160,67 160,100 C160,133 133,160 100,160 C67,160 40,133 40,100 C40,67 67,40 100,40 Z",
      fill: "#a87a55"
    },
    melanoma: {
      name: "Superficial Spreading Melanoma",
      type: "Malignant",
      confidence: 87.5,
      risk: "High (Excision Recommended)",
      diameter: "8.7 mm",
      asymmetry: "Highly Asymmetric",
      color: "Variegated (Black, Dark Brown, Grey)",
      description: "Asymmetrical malignant neoplastic growth showing irregular, notched borders, color variegation, and rapid diameter expansion.",
      gradCamCenter: { cx: 120, cy: 90, r: 50 },
      svgPath: "M90,35 C130,25 175,55 170,95 C165,135 125,165 95,155 C65,145 50,110 55,80 C60,50 60,40 90,35 Z",
      fill: "#2b1c11"
    },
    keratosis: {
      name: "Seborrheic Keratosis",
      type: "Benign",
      confidence: 91.8,
      risk: "Low",
      diameter: "6.5 mm",
      asymmetry: "Mildly Asymmetric",
      color: "Dull Brown, Waxy Texture",
      description: "A benign epidermal proliferation with a classic 'stuck-on' appearance. Shows waxy surface structures and distinct margin borders.",
      gradCamCenter: { cx: 90, cy: 105, r: 60 },
      svgPath: "M95,45 C125,35 155,60 150,95 C145,130 120,150 90,145 C60,140 50,115 55,85 C60,55 65,55 95,45 Z",
      fill: "#6b503c"
    }
  };

  const steps = [
    "Initializing Custom VGG19/MobileNetV2 backbone weights...",
    "Resizing image input tensor to (224, 224, 3)...",
    "Running forward pass through convolutional layer activations...",
    "Generating Grad-CAM saliency localization maps...",
    "Executing dense softmax classification layer..."
  ];

  const startClassification = () => {
    setIsClassifying(true);
    setInferenceStep(0);
    setInferenceProgress(0);
    setShowGradCam(false);
    setShowReport(false);
  };

  useEffect(() => {
    if (!isClassifying) return;

    const interval = setInterval(() => {
      setInferenceProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsClassifying(false);
          setShowGradCam(true);
          setShowReport(true);
          return 100;
        }
        const nextProgress = prev + 4;
        const currentStep = Math.floor(nextProgress / 20.1);
        setInferenceStep(Math.min(currentStep, steps.length - 1));
        return nextProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isClassifying]);


  // --- Data Analysis State ---
  const [dataPoints, setDataPoints] = useState(25);
  const [noiseLevel, setNoiseLevel] = useState(1.5);
  const [fitModel, setFitModel] = useState('linear');
  const [rawData, setRawData] = useState([]);
  const [plotData, setPlotData] = useState([]);

  // Generate synthetic data
  useEffect(() => {
    const data = [];
    // Base function: y = 0.5 * x^2 - 2 * x + 4 + noise
    for (let i = 1; i <= dataPoints; i++) {
      const x = (i / dataPoints) * 10;
      const cleanY = 0.05 * x * x + 0.3 * x + 2;
      const noise = (Math.random() - 0.5) * noiseLevel;
      data.push({ x: parseFloat(x.toFixed(2)), y: parseFloat((cleanY + noise).toFixed(2)) });
    }
    setRawData(data);
  }, [dataPoints, noiseLevel]);

  // Compute fits in real time
  useEffect(() => {
    if (rawData.length === 0) return;

    let fitLine = [];
    if (fitModel === 'linear') {
      // Calculate linear regression: y = mx + c
      const n = rawData.length;
      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
      rawData.forEach(pt => {
        sumX += pt.x;
        sumY += pt.y;
        sumXY += pt.x * pt.y;
        sumX2 += pt.x * pt.x;
      });
      const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const c = (sumY - m * sumX) / n;

      fitLine = rawData.map(pt => ({
        x: pt.x,
        yRaw: pt.y,
        yFit: parseFloat((m * pt.x + c).toFixed(2))
      }));
    } else if (fitModel === 'quadratic') {
      // Calculate quadratic fit: y = ax^2 + bx + c
      const { a, b, c } = solveQuadraticRegression(rawData);
      fitLine = rawData.map(pt => ({
        x: pt.x,
        yRaw: pt.y,
        yFit: parseFloat((a * pt.x * pt.x + b * pt.x + c).toFixed(2))
      }));
    }

    // Sort by X for line plotting correctness
    setPlotData(fitLine.sort((a, b) => a.x - b.x));
  }, [rawData, fitModel]);

  return (
    <section id="playground" className="py-24 relative overflow-hidden bg-darkBg/60">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyberIndigo/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Interactive <span className="text-gradient-cyan-blue">ML Playground</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Interact with live ML inference diagnostics and data fitting models computed directly inside your browser.
          </p>
          <div className="h-1 w-20 bg-cyberCyan mx-auto rounded-full mt-4"></div>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab('classifier')}
            className={`px-6 py-3 rounded-lg text-sm font-bold font-mono tracking-wider flex items-center space-x-2 border transition-all ${
              activeTab === 'classifier' 
                ? 'bg-cyberCyan/10 border-cyberCyan text-cyberCyan glow-shadow-lg' 
                : 'bg-darkCard/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="h-4 w-4" />
            <span>CNN Classifier (Grad-CAM)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('regression')}
            className={`px-6 py-3 rounded-lg text-sm font-bold font-mono tracking-wider flex items-center space-x-2 border transition-all ${
              activeTab === 'regression' 
                ? 'bg-cyberEmerald/10 border-cyberEmerald text-cyberEmerald glow-shadow-lg' 
                : 'bg-darkCard/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Statistical Regressor</span>
          </button>
        </div>

        {/* --- Tab Content: Classifier --- */}
        {activeTab === 'classifier' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Box: Controls & Canvas */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-200 font-mono flex items-center">
                  <Settings className="h-5 w-5 text-cyberCyan mr-2" />
                  Model Configuration
                </h3>
                <span className="text-xs font-mono text-slate-500">Backbone: VGG19</span>
              </div>

              {/* Lesion Selection */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">Select Dermatoscopic Image</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.keys(lesions).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (!isClassifying) {
                          setSelectedLesion(key);
                          setShowReport(false);
                          setShowGradCam(false);
                        }
                      }}
                      disabled={isClassifying}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedLesion === key 
                          ? 'bg-cyberCyan/5 border-cyberCyan text-cyberCyan font-semibold' 
                          : 'bg-slate-900/50 border-slate-850 text-slate-400 hover:border-slate-800'
                      }`}
                    >
                      <div className="text-xs font-semibold truncate">{lesions[key].name.split(" ")[0]}</div>
                      <div className="text-[10px] font-mono opacity-60 mt-0.5">{lesions[key].type}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Block */}
              <div className="bg-slate-900 border border-slate-850 rounded-xl aspect-square max-w-[340px] mx-auto relative overflow-hidden flex items-center justify-center">
                {/* SVG representing dermatology slide */}
                <svg className="w-full h-full p-8" viewBox="0 0 200 200">
                  <defs>
                    {/* Background slide texture */}
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  
                  <rect width="200" height="200" fill="url(#grid)" />
                  <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Dynamic Lesion Draw */}
                  <path
                    d={lesions[selectedLesion].svgPath}
                    fill={lesions[selectedLesion].fill}
                    className="transition-all duration-500"
                    style={{
                      filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
                      stroke: selectedLesion === 'melanoma' ? '#111' : '#8c5a3c',
                      strokeWidth: '1.5'
                    }}
                  />
                  
                  {/* Irregular spots inside lesion representing derm features */}
                  {selectedLesion === 'melanoma' && (
                    <>
                      <circle cx="110" cy="80" r="8" fill="#111" />
                      <circle cx="85" cy="110" r="10" fill="#000" />
                      <path d="M125,120 Q130,130 115,135" fill="none" stroke="#4a3b32" strokeWidth="3" />
                    </>
                  )}
                  {selectedLesion === 'keratosis' && (
                    <>
                      <circle cx="95" cy="70" r="6" fill="#4d3625" />
                      <circle cx="120" cy="110" r="5" fill="#4d3625" />
                      <circle cx="80" cy="100" r="7" fill="#5c422f" />
                    </>
                  )}
                  {selectedLesion === 'nevus' && (
                    <>
                      <circle cx="100" cy="100" r="12" fill="#9c6d48" opacity="0.6" />
                    </>
                  )}

                  {/* Grad-CAM Heatmap overlay */}
                  {showGradCam && (
                    <circle
                      cx={lesions[selectedLesion].gradCamCenter.cx}
                      cy={lesions[selectedLesion].gradCamCenter.cy}
                      r={lesions[selectedLesion].gradCamCenter.r}
                      fill="url(#gradCamGrad)"
                      className="animate-fade-in"
                    />
                  )}

                  <defs>
                    <radialGradient id="gradCamGrad">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                      <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.55" />
                      <stop offset="70%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Loading overlay */}
                {isClassifying && (
                  <div className="absolute inset-0 bg-darkBg/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
                    <div className="h-10 w-10 border-4 border-cyberCyan border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-xs font-mono text-cyberCyan text-center px-4 animate-pulse">
                      {steps[inferenceStep]}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={startClassification}
                  disabled={isClassifying}
                  className="flex-1 py-3 bg-gradient-to-r from-cyberCyan to-cyberBlue text-darkBg font-bold rounded-lg hover:shadow-lg hover:shadow-cyberCyan/15 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="h-4.5 w-4.5 mr-2" />
                  Classify Lesion
                </button>
                <button
                  onClick={() => {
                    setShowGradCam(false);
                    setShowReport(false);
                  }}
                  disabled={isClassifying || (!showGradCam && !showReport)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/50 rounded-lg text-slate-300 transition-all disabled:opacity-50"
                  title="Reset Demo"
                >
                  <RotateCcw className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Right Box: Results Output */}
            <div className="lg:col-span-6 space-y-6">
              {showReport ? (
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6 animate-scale-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-slate-200 font-mono flex items-center">
                      <FileText className="h-5 w-5 text-cyberCyan mr-2" />
                      Inference Report
                    </h3>
                    <span className="text-xs bg-slate-900 border border-slate-850 px-2.5 py-0.5 rounded text-slate-400 font-mono">
                      Status: Done
                    </span>
                  </div>

                  {/* Diagnostic Banner */}
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    lesions[selectedLesion].type === 'Malignant' 
                      ? 'bg-red-500/5 border-red-500/30 text-red-400' 
                      : 'bg-emerald-500/5 border-emerald-500/30 text-emerald-400'
                  }`}>
                    <div>
                      <div className="text-xs font-mono opacity-80 uppercase tracking-widest">Model Classification</div>
                      <div className="text-xl font-bold font-sans mt-0.5">{lesions[selectedLesion].type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono opacity-80 uppercase tracking-widest">Confidence</div>
                      <div className="text-xl font-extrabold font-mono mt-0.5">{lesions[selectedLesion].confidence}%</div>
                    </div>
                  </div>

                  {/* Grad-CAM Toggle Option */}
                  <div className="flex items-center justify-between bg-slate-900/50 p-3.5 rounded-xl border border-slate-850">
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <Info className="h-4.5 w-4.5 text-cyberCyan" />
                      <span>Visualize Grad-CAM Feature Attentions</span>
                    </div>
                    <button
                      onClick={() => setShowGradCam(!showGradCam)}
                      className={`px-3 py-1.5 rounded text-xs font-bold font-mono transition-all border ${
                        showGradCam 
                          ? 'bg-cyberCyan/10 border-cyberCyan/40 text-cyberCyan' 
                          : 'bg-slate-850 border-slate-800 text-slate-400'
                      }`}
                    >
                      {showGradCam ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {/* Anatomical Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm bg-slate-900/20 p-4 rounded-xl border border-white/5">
                    <div>
                      <span className="text-slate-500 text-xs block font-mono">LESION TYPE</span>
                      <span className="font-semibold text-slate-350">{lesions[selectedLesion].name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block font-mono">DIAMETER</span>
                      <span className="font-semibold text-slate-350">{lesions[selectedLesion].diameter}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block font-mono">ASYMMETRY</span>
                      <span className="font-semibold text-slate-350">{lesions[selectedLesion].asymmetry}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block font-mono">COLOR VARIANCE</span>
                      <span className="font-semibold text-slate-350">{lesions[selectedLesion].color}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                    <p className="font-mono text-xs text-slate-500 mb-1.5 uppercase">Clinical Summary Description</p>
                    {lesions[selectedLesion].description}
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-12 rounded-2xl border border-dashed border-slate-800/80 text-center flex flex-col items-center justify-center min-h-[350px]">
                  <Brain className="h-12 w-12 text-slate-500 mb-4 animate-pulse" />
                  <h4 className="text-lg font-bold text-slate-300 font-mono mb-2">Model Diagnostic Idle</h4>
                  <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                    Select a lesion on the left and trigger the classification network. The output metrics and saliency overlay will display here.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- Tab Content: Regression --- */}
        {activeTab === 'regression' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Box: Regression Controls */}
            <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-200 font-mono flex items-center">
                  <Settings className="h-5 w-5 text-cyberEmerald mr-2" />
                  Solver Params
                </h3>
                <span className="text-xs font-mono text-slate-500">Pure JS OLS</span>
              </div>

              {/* Data points slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-slate-450">
                  <span>Data Points (N)</span>
                  <span className="text-cyberEmerald font-bold">{dataPoints}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={dataPoints}
                  onChange={(e) => setDataPoints(parseInt(e.target.value))}
                  className="w-full accent-cyberEmerald bg-slate-900 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Noise slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-slate-450">
                  <span>Gaussian Noise</span>
                  <span className="text-cyberEmerald font-bold">{noiseLevel}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.25"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                  className="w-full accent-cyberEmerald bg-slate-900 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Model Choice */}
              <div>
                <label className="text-xs font-mono text-slate-450 uppercase tracking-widest block mb-3">Fitting Algorithm</label>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setFitModel('linear')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      fitModel === 'linear'
                        ? 'bg-cyberEmerald/5 border-cyberEmerald text-cyberEmerald font-semibold'
                        : 'bg-slate-900/50 border-slate-850 text-slate-400 hover:border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-semibold">Linear Fit</div>
                    <div className="text-[10px] font-mono opacity-60 mt-0.5">y = mx + c (Least Squares)</div>
                  </button>
                  <button
                    onClick={() => setFitModel('quadratic')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      fitModel === 'quadratic'
                        ? 'bg-cyberEmerald/5 border-cyberEmerald text-cyberEmerald font-semibold'
                        : 'bg-slate-900/50 border-slate-850 text-slate-400 hover:border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-semibold">Quadratic Fit</div>
                    <div className="text-[10px] font-mono opacity-60 mt-0.5">y = ax² + bx + c (Poly Determinant)</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Box: Live Recharts Plot */}
            <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-200 font-mono">
                  Live Fit Visualizer
                </h3>
                <div className="text-xs font-mono text-slate-400 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyberCyan/80 mr-1.5 inline-block"></span>
                  Raw Data
                  <span className="w-4 h-0.5 bg-cyberEmerald mr-1.5 ml-3 inline-block"></span>
                  Fit line
                </div>
              </div>

              {/* Chart container */}
              <div className="h-[340px] w-full bg-slate-950/40 rounded-xl p-2 border border-slate-900 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                    <XAxis type="number" dataKey="x" name="X" stroke="#64748b" fontSize={11} domain={[0, 10]} />
                    <YAxis type="number" dataKey="y" name="Y" stroke="#64748b" fontSize={11} domain={[0, 11]} />
                    <Tooltip 
                      contentStyle={{ background: '#161b26', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#94a3b8', fontFamily: 'monospace' }}
                      itemStyle={{ color: '#38bdf8' }}
                    />
                    {/* Raw Scatter Points */}
                    <Scatter name="Raw Dataset" data={plotData} fill="#38bdf8" fillOpacity={0.7} line={false} shape="circle" />
                    {/* Fitted Line */}
                    <Line 
                      name="Regression Fit" 
                      data={plotData} 
                      type="monotone" 
                      dataKey="yFit" 
                      stroke="#10b981" 
                      strokeWidth={2.5} 
                      dot={false} 
                      activeDot={false} 
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="text-xs text-slate-500 font-mono text-center leading-relaxed">
                *Dataset is dynamically regenerated when noise or count parameters scale. Fitting matrix computed via browser CPU.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default MLSandbox;
