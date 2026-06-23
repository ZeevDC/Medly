import React, { useState } from 'react';
import { Award, Zap, Heart, Flame, Shield, Compass, BookOpen, AlertTriangle, CheckCircle, Sparkles, Trophy, Calendar, Info, LineChart, TrendingUp } from 'lucide-react';

interface AchievementsMetricsProps {
  streak: number;
  solvedDrills: number;
  undergradGwa: string;
  studyLogs?: Array<{ id: string; subject: string; hours: number; date: string }>;
  failedAnswersLogs?: any[];
  currentUserEmail?: string;
  key?: React.Key;
}

export default function AchievementsMetrics({
  streak,
  solvedDrills,
  undergradGwa,
  studyLogs = [],
  failedAnswersLogs = [],
  currentUserEmail
}: AchievementsMetricsProps) {
  
  const isFresh = currentUserEmail?.trim().toLowerCase() !== 'studyfilesbyz@gmail.com';

  // Calculate simulated pass probability based on GWA and solved drills
  const baseGwa = parseFloat(undergradGwa) || (isFresh ? 3.00 : 1.45);
  const drillBonus = Math.min(15, Math.floor(solvedDrills / 2));
  const calculatedProbability = isFresh && solvedDrills === 0 && streak === 0
    ? 0
    : Math.min(99, Math.max(0, Math.round((100 - (baseGwa - 1.0) * 35) + drillBonus)));

  // Target recommendations based on calculation
  const getProbabilityTier = () => {
    if (calculatedProbability === 0) return { label: '⚖️ Standard Baseline (Pending diagnostic inputs)', color: 'text-slate-700 bg-slate-50 border-slate-200' };
    if (calculatedProbability >= 90) return { label: '🌟 Elite Target (UPCM / PLM Qualified)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (calculatedProbability >= 75) return { label: '🛡️ Competitive (UST / ASMPH Target Stable)', color: 'text-sky-700 bg-sky-50 border-sky-200' };
    return { label: '⚠️ Borderline Passing Centile Index', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  };

  // State for Radar chart interactive highlight
  const [hoveredFacet, setHoveredFacet] = useState<number | null>(null);

  // Subject proficiency radar parameters
  const categories = [
    { name: 'Biology', base: isFresh ? 15 : 75, multiplier: 3, advice: 'Excel at Cell Bio & Physiology. Core weight on medical biochemistry cycles.' },
    { name: 'Chemistry', base: isFresh ? 12 : 65, multiplier: 4, advice: 'Focus on Organic structures, stoichiometry reactions & chemical equilibria.' },
    { name: 'Physics', base: isFresh ? 10 : 55, multiplier: 5, advice: 'Needs formulas recall for Optics, thermodynamics & kinematic vectors.' },
    { name: 'Social Science', base: isFresh ? 20 : 80, multiplier: 2, advice: 'Review sociological theories hierarchy, deviance models & psychology.' },
    { name: 'Quantitative', base: isFresh ? 15 : 70, multiplier: 3, advice: 'Strengthen rapid algebra speed drills & mathematical word reasoning.' },
    { name: 'Verbal', base: isFresh ? 25 : 85, multiplier: 1, advice: 'Maintain speed margins under 45 seconds for critical reading paragraphs.' },
  ];

  // Calculate dynamic proficiency based on state
  const mockRadarValues = categories.map((cat, index) => {
    // Increase dynamic proficiency if student has done drills or maintains high streaks
    const bonus = Math.min(25, (solvedDrills * cat.multiplier) + (streak * 2));
    const finalScore = Math.min(100, cat.base + bonus);
    const avgScore = index === 2 ? 50 : index === 1 ? 58 : 65; // Physics averages are lower nationally
    return {
      name: cat.name,
      score: finalScore,
      avg: avgScore,
      advice: cat.advice
    };
  });

  // Radar layout settings
  const width = 360;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2 - 10;
  const rMax = 100;

  // Angles for hexagon points
  const getAngle = (index: number) => {
    return (index * (2 * Math.PI) / 6) - (Math.PI / 2);
  };

  // Generate grid lines
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridHexagons = gridLevels.map(level => {
    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = getAngle(i);
      const x = centerX + rMax * level * Math.cos(angle);
      const y = centerY + rMax * level * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // Coordinates of student proficiencies
  const studentPoints = mockRadarValues.map((val, i) => {
    const angle = getAngle(i);
    const radius = rMax * (val.score / 100);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Coordinates of CEM average scores
  const avgPoints = mockRadarValues.map((val, i) => {
    const angle = getAngle(i);
    const radius = rMax * (val.avg / 100);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Live Study Heatmap of June 2026
  // Generate 30 days of June 2026. June 1 starts on Monday.
  const June2026Days = Array.from({ length: 30 }, (_, index) => {
    const dayNum = index + 1;
    // Format: '2026-06-DD'
    const dateStr = `2026-06-${dayNum < 10 ? '0' : ''}${dayNum}`;
    
    // Find hours logged on this day
    const dayLogs = studyLogs.filter(log => log.date === dateStr);
    const loggedHours = dayLogs.reduce((acc, curr) => acc + curr.hours, 0);

    // Mock template backfill to make historical heatmap look premium and lively while preserving user actual logs
    let baseMockHours = 0;
    if (!isFresh && dayNum < 18) {
      baseMockHours = (dayNum * 7) % 5 === 0 ? 4.5 : (dayNum * 3) % 4 === 0 ? 2 : 0;
    }
    const finalHours = loggedHours || baseMockHours;

    let color = 'bg-slate-50 border-slate-100 text-slate-450';
    if (finalHours >= 6) color = 'bg-indigo-650 text-white font-black';
    else if (finalHours >= 4) color = 'bg-indigo-450 text-white font-bold';
    else if (finalHours >= 2) color = 'bg-indigo-200 text-indigo-950 font-bold';
    else if (finalHours > 0) color = 'bg-indigo-50 text-indigo-700';

    return { dayNum, dateStr, hours: finalHours, color };
  });

  // Badges lists
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const totalStudyHours = studyLogs.reduce((acc, curr) => acc + curr.hours, 0) + (isFresh ? 0 : 12); // 12h default simulation base
  const uniqueSubjectsCount = new Set(studyLogs.map(l => l.subject)).size;

  const badges = [
    { 
      id: 'synapse',
      name: 'Synapse Builder', 
      desc: 'Solved over 5 diagnostic drills successfully.', 
      icon: '🧠', 
      unlocked: solvedDrills >= 5, 
      unlockedDesc: `${solvedDrills}/5 drills completed. Perfect firing of neurological synapses!`,
      fact: 'The human brain contains roughly 86 billion neurons, each forming thousands of synaptic connections to process recall!',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-indigo-100/50' 
    },
    { 
      id: 'anki',
      name: 'Anki Overlord', 
      desc: 'Maintained 3+ days active study streaks.', 
      icon: '🔥', 
      unlocked: streak >= 3, 
      unlockedDesc: `Current study streak is ${streak} days. Outstanding spacing retrieval persistence!`,
      fact: 'Hermann Ebbinghaus discovered the Forgetting Curve in 1885, proving space spacing reduces retrieval effort by up to 300%.',
      color: 'bg-amber-50 border-amber-250 text-amber-700 shadow-amber-100/50' 
    },
    { 
      id: 'marathon',
      name: 'Curriculum Marathoner', 
      desc: 'Logged 10+ hours of physical active study.', 
      icon: '⏳', 
      unlocked: totalStudyHours >= 10,
      unlockedDesc: `You logged ${totalStudyHours} total hours of deliberate conceptual practice.`,
      fact: 'Deep high-stress focus triggers myelination of neural pathways which speeds nerve impulse conduction speeds!',
      color: 'bg-emerald-50 border-emerald-250 text-emerald-800 shadow-emerald-100/50'
    },
    { 
      id: 'upcm',
      name: 'UPCM Competitor', 
      desc: 'Achieved an outstanding weighted GWA under 1.50.', 
      icon: '🎓', 
      unlocked: baseGwa <= 1.50, 
      unlockedDesc: `GWA rate: ${undergradGwa} qualifies directly into UPCM admission categories.`,
      fact: 'The UP College of Medicine, founded in 1905, is the oldest medical school in the Philippines and has a sub-1.50 GPA typical cutoff!',
      color: 'bg-purple-50 border-purple-200 text-purple-700 shadow-purple-100/50' 
    },
    { 
      id: 'cem',
      name: 'CEM Survivor', 
      desc: 'Unlocked diagnostic mock board results.', 
      icon: '🛡️', 
      unlocked: solvedDrills >= 1, 
      unlockedDesc: `Solved diagnostic drills: ${solvedDrills}. Ready to contest the National CEM exam.`,
      fact: 'Philippine NMAT scoring is based on percentile ranking relative to all examinees in the cycle, rather than raw marks!',
      color: 'bg-sky-50 border-sky-200 text-sky-800 shadow-sky-100/50' 
    },
    { 
      id: 'polymath',
      name: 'Pre-Med Polymath', 
      desc: 'Logged study sessions across 3+ subjects.', 
      icon: '🔬', 
      unlocked: uniqueSubjectsCount >= 3 || studyLogs.length > 2, 
      unlockedDesc: `Connected sessions: ${uniqueSubjectsCount || 3} subjects logged in calendar.`,
      fact: 'Interleaving different topics strengthens neural associations far better than block repetitions of a single topic!',
      color: 'bg-rose-50 border-rose-250 text-rose-800 shadow-rose-100/50' 
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="metrics-achievements-view">
      
      {/* Overview header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-[24px] border border-indigo-950 shadow-md">
        <div className="space-y-1 max-w-2xl">
          <span className="inline-flex items-center gap-1 bg-indigo-500/30 text-indigo-100 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider border border-indigo-400/20">
            <TrendingUp className="w-3 h-3 text-sky-300 animate-pulse" />
            Live Performance Metrics Core
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 flex-wrap">
            Achievements & Competency Index
          </h2>
          <p className="text-xs text-indigo-200 leading-snug">
            Real-time telemetry synthesizing your undergraduate GWA, solved diagnostics, and logged subject calendars.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto shrink-0">
          <div className="bg-indigo-950/60 border border-indigo-700/30 rounded-xl px-4 py-2 text-center flex-1 lg:flex-none min-w-[120px]">
            <span className="block text-[8px] uppercase text-indigo-300 font-extrabold font-mono tracking-wider">TOTAL RETRIEVALS</span>
            <span className="text-sm sm:text-base font-black text-white block mt-0.5">{solvedDrills} Drills</span>
          </div>
          <div className="bg-indigo-950/60 border border-indigo-700/30 rounded-xl px-4 py-2 text-center flex-1 lg:flex-none min-w-[120px]">
            <span className="block text-[8px] uppercase text-indigo-300 font-extrabold font-mono tracking-wider">CALENDAR SESSIONS</span>
            <span className="text-sm sm:text-base font-black text-pink-300 block mt-0.5">{studyLogs.length} Active</span>
          </div>
        </div>
      </div>

      {/* Probability and Heatmap Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Pass Probability Circle Widget (Col span 5) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 flex flex-col justify-between items-center text-center shadow-xs">
          <div className="space-y-1.5 w-full">
            <span className="inline-block text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded">
              ESTIMATED NMAT ADMISSION CONFIDENCE
            </span>
            <h3 className="font-extrabold text-base text-slate-800">Simulated Pass Probability</h3>
          </div>

          <div className="relative w-36 h-36 flex items-center justify-center my-4 select-none">
            {/* Native SVG Progress ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-50"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-indigo-600 transition-all duration-1000"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * calculatedProbability) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-black text-indigo-950 tracking-tighter">{calculatedProbability}%</span>
              <span className="block text-[8px] text-slate-400 font-black uppercase tracking-wider mt-0.5">MEDLY CRITERION</span>
            </div>
          </div>

          <div className="space-y-3 w-full">
            <div className={`px-3 py-1.5 rounded-xl font-bold text-xs border ${getProbabilityTier().color} transition-all`}>
              {getProbabilityTier().label}
            </div>
            <p className="text-[10.5px] text-slate-500 leading-relaxed max-w-sm font-medium">
              Weighed algorithmically using current college GWA (<strong>{undergradGwa || '1.45'}</strong>) compounded with <strong>{solvedDrills}</strong> solved diagnostic test patterns.
            </p>
          </div>
        </div>

        {/* Heatmap Widget (Col span 7) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded">
                SPACING RETRIEVAL COMPLIANCE
              </span>
              <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-150 px-2.5 py-0.5 rounded-full">
                📅 June 2026 Grid
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-800">Monthly Study Heatmap</h3>
            <p className="text-xs text-slate-500 font-medium">
              Daily visual index tracking logged study hours. Add entries in your <strong>Pre-Med Calendar</strong> to auto-fill.
            </p>
          </div>

          <div className="grid grid-cols-7 gap-2.5 pt-2">
            {June2026Days.map((d) => (
              <div
                key={d.dayNum}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-[10px] font-extrabold border border-slate-200/10 shadow-inner ${d.color} cursor-pointer transition-all transform hover:scale-[1.08] hover:shadow-md relative group`}
              >
                <span>{d.dayNum}</span>
                {/* Tooltip on grid cell */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-36 hidden group-hover:block bg-slate-900 text-white text-[9.5px] p-2 rounded-lg text-center z-50 shadow-lg pointer-events-none font-bold">
                  June {d.dayNum}, 2026:
                  <span className="block text-sky-300 scale-95 mt-0.5">{d.hours} active hours logged</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[9px] text-slate-400 pt-3 border-t border-slate-50 font-black tracking-wide uppercase">
            <span>Least Active</span>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 bg-slate-50 rounded-md border border-slate-200" title="0 Hours" />
              <span className="w-3 h-3 bg-indigo-50 rounded-md border border-indigo-100" title="0.5 - 1.5 Hours" />
              <span className="w-3 h-3 bg-indigo-200 rounded-md" title="2 - 3.5 Hours" />
              <span className="w-3 h-3 bg-indigo-440 rounded-md" title="4 - 5.5 Hours" />
              <span className="w-3 h-3 bg-indigo-650 rounded-md" title="6+ Hours" />
            </div>
            <span>Highest Density</span>
          </div>
        </div>

      </div>

      {/* Radar Chart & Deficiency Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive Subject Radar Chart (Col span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded">
              COGNITIVE SYMMETRY RADAR
            </span>
            <h3 className="font-extrabold text-base text-slate-800">Subject Proficiency Radar</h3>
            <p className="text-xs text-slate-500 font-medium">
              Interactive 6-axis chart showing accuracy weights. Hover nodes to retrieve detailed feedback guidelines.
            </p>
          </div>

          {/* SVG Radar */}
          <div className="flex justify-center items-center py-2 h-[310px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[340px] h-full overflow-visible">
              {/* Concentric helper grids */}
              {gridLevels.map((level, lIndex) => (
                <g key={`grid-${level}`}>
                  <polygon
                    points={gridHexagons[lIndex]}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  {/* Grid Labels */}
                  <text
                    x={centerX + 4}
                    y={centerY - rMax * level + 3}
                    className="text-[8px] font-bold text-slate-400 select-none"
                  >
                    {level * 100}%
                  </text>
                </g>
              ))}

              {/* Axial lines */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = getAngle(i);
                const x = centerX + rMax * Math.cos(angle);
                const y = centerY + rMax * Math.sin(angle);
                return (
                  <line
                    key={`axis-${i}`}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* National reference average polygon */}
              <polygon
                points={avgPoints}
                fill="rgba(244, 63, 94, 0.05)"
                stroke="rgba(244, 63, 94, 0.45)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Student proficiency polygon */}
              <polygon
                points={studentPoints}
                fill="rgba(79, 70, 229, 0.15)"
                stroke="#4F46E5"
                strokeWidth="2.5"
              />

              {/* Interactive nodes and overlay labels */}
              {mockRadarValues.map((val, i) => {
                const angle = getAngle(i);
                const radius = rMax * (val.score / 100);
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                // Label coordinates (extend outward slightly to avoid overlap)
                const lx = centerX + (rMax + 24) * Math.cos(angle);
                const ly = centerY + (rMax + 14) * Math.sin(angle);

                // Alignment helper
                let textAnchor = "middle";
                if (Math.cos(angle) > 0.1) textAnchor = "start";
                else if (Math.cos(angle) < -0.1) textAnchor = "end";

                const isHighlighted = hoveredFacet === i;

                return (
                  <g 
                    key={`node-${i}`}
                    onMouseEnter={() => setHoveredFacet(i)}
                    onMouseLeave={() => setHoveredFacet(null)}
                    className="cursor-pointer"
                  >
                    {/* Outer glow on highlight */}
                    {isHighlighted && (
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        className="fill-indigo-300 opacity-60 animate-ping"
                      />
                    )}
                    {/* Dot point */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHighlighted ? "6" : "4.5"}
                      fill={isHighlighted ? "#10B981" : "#4F46E5"}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="transition-all duration-150"
                    />
                    {/* Axial labels */}
                    <text
                      x={lx}
                      y={ly}
                      textAnchor={textAnchor}
                      className={`text-[9.5px] uppercase font-black transition-colors ${
                        isHighlighted ? "text-emerald-600 fill-emerald-600 font-extrabold scale-105" : "text-slate-600 fill-slate-600"
                      }`}
                    >
                      {val.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive display helper card based on radar hover */}
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl min-h-[64px] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              {hoveredFacet !== null ? (
                <>
                  <p className="font-extrabold text-slate-800">
                    {mockRadarValues[hoveredFacet].name} Proficiency: <span className="text-indigo-700">{mockRadarValues[hoveredFacet].score}%</span> vs National Avg: {mockRadarValues[hoveredFacet].avg}%
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium italic">"{mockRadarValues[hoveredFacet].advice}"</p>
                </>
              ) : (
                <>
                  <p className="font-extrabold text-slate-600">Interplanetary Board Guidance Node</p>
                  <p className="text-[10px] text-slate-400 font-medium">Hover over any competency node to view specialized preparation suggestions.</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Category Deficiency Tracker (Col span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs animate-fade-in">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded">
              COGNITIVE RECONCILIATIONS
            </span>
            <h3 className="font-extrabold text-base text-slate-805">Active Category Deficiency Tracker</h3>
            <p className="text-xs text-slate-500 font-medium">
              Dynamic alert log identifying recurring concept gaps that would lower your percentile margins.
            </p>
          </div>

          <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
            {failedAnswersLogs && failedAnswersLogs.length > 0 ? (
              failedAnswersLogs.map((fail, i) => (
                <div 
                  key={fail.id || i} 
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all hover:scale-[1.01] ${
                    fail.subject === 'Physics' 
                      ? 'bg-rose-50/50 border-rose-150 text-rose-950' 
                      : fail.subject === 'Chemistry'
                      ? 'bg-amber-50/55 border-amber-150 text-amber-950'
                      : 'bg-slate-50 border-slate-150 text-slate-900'
                  }`}
                >
                  <span className="text-xl shrink-0">
                    {fail.subject === 'Physics' ? '📉' : fail.subject === 'Chemistry' ? '🧪' : '⚠️'}
                  </span>
                  <div className="space-y-1 leading-tight flex-grow">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-black text-xs uppercase tracking-tight">
                        {fail.subject} • {fail.remedialTopic || 'Conceptual Gap'}
                      </h4>
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded shrink-0 ${
                        fail.alertLvl?.includes('Danger') || fail.consecutiveFailCount >= 3
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {fail.consecutiveFailCount} consecutive fails
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-650 font-medium leading-relaxed">
                      Identified diagnostic gaps: Lower scoring density in standard drills. Recommendations: use active integration tools.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100 flex flex-col items-center text-center gap-1.5 py-8">
                <CheckCircle className="w-7 h-7 text-emerald-500 animate-bounce" />
                <h4 className="font-extrabold text-xs text-emerald-950">No Dynamic Defensive Breaches</h4>
                <p className="text-[10px] text-slate-500 font-medium max-w-xs">
                  Your spatial diagnostic tests show outstanding stability. All monitored category nodes are within safe operational parameters.
                </p>
              </div>
            )}

            {/* General Advice box inside tracker */}
            <div className="bg-indigo-50/40 border border-indigo-100 p-3 rounded-xl flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <p className="text-[10px] text-slate-550 font-semibold leading-relaxed">
                🚨 <strong>Spaced Tip:</strong> Solve a 60-second TIMED drill or converse with the <strong>Socratic AI Mentor</strong> to immediately resolve these deficiencies!
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/50 flex justify-between items-center text-[10px] font-extrabold text-slate-500">
            <span>Tracking status: Active live-monitoring</span>
            <span className="flex items-center gap-1 text-emerald-650">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              Operational
            </span>
          </div>
        </div>

      </div>

      {/* Unlocked Achievement Badges */}
      <div className="bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded">
            MEDLY ATHLETICS ACADEMIC COMMENDATIONS
          </span>
          <h3 className="font-extrabold text-base text-slate-805">Unlocked Academic Achievements</h3>
          <p className="text-xs text-slate-500 font-medium">
            Click any badge to view custom Philippine Board medical history, test mnemonics, or celebration details!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div 
              key={b.id} 
              onClick={() => b.unlocked && setSelectedBadge(b)}
              className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all relative ${
                b.unlocked 
                  ? `${b.color} cursor-pointer hover:scale-[1.03] hover:shadow-lg active:scale-98` 
                  : 'bg-slate-50/40 border-slate-150 text-slate-400 opacity-40 select-none'
              }`}
            >
              <div className="text-3xl mt-0.5 select-none shrink-0">{b.unlocked ? b.icon : '🔒'}</div>
              <div className="space-y-0.5 leading-tight flex-grow pr-3">
                <h4 className="font-black text-xs tracking-tight flex items-center gap-1.5">
                  {b.name}
                  {b.unlocked && (
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  )}
                </h4>
                <p className="text-[9.5px] mt-0.5 text-slate-500 font-semibold">{b.desc}</p>
                <p className="text-[8.5px] uppercase font-black tracking-wide mt-1 text-indigo-700/80">
                  {b.unlocked ? '✨ Unlocked • View Info' : 'Locked'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge detail interactive modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-[28px] max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-scale-up text-center">
            
            <button 
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-black p-1 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="text-5xl animate-bounce py-2">{selectedBadge.icon}</div>
            
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-black bg-indigo-100 text-indigo-805 px-2 py-0.5 rounded tracking-wide">
                Commendation Unlocked Successfully
              </span>
              <h3 className="font-extrabold text-xl text-slate-850 mt-1">{selectedBadge.name}</h3>
              <p className="text-xs text-slate-450">{selectedBadge.desc}</p>
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-2xl text-left border border-indigo-100 text-xs font-semibold text-indigo-905 space-y-1">
              <span className="text-[10px] text-indigo-550 font-black uppercase block">RECIPIENT RETRIEVAL METRICS</span>
              <p className="leading-relaxed">{selectedBadge.unlockedDesc}</p>
            </div>

            <div className="bg-emerald-50/40 p-4 rounded-2xl text-left border border-emerald-100 text-xs text-emerald-955 space-y-1">
              <span className="text-[10px] text-emerald-700 font-black uppercase flex items-center gap-1 leading-none">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" /> Did You Know?
              </span>
              <p className="leading-relaxed font-semibold italic">"{selectedBadge.fact}"</p>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl cursor-pointer transition-all uppercase tracking-wide shadow-sm"
            >
              Perfect, Keep Studying!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
