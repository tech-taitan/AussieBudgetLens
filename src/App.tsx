/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  User, 
  Clock, 
  Database, 
  ChevronRight, 
  ArrowLeft,
  Info,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Menu,
  History,
  Target,
  Zap,
  ArrowRight,
  Check,
  Users,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MEASURES, SOURCES, USER_PROFILES, FISCAL_SUMMARY, SECTOR_INSIGHTS, KEY_HIGHLIGHTS, UPDATE_LOGS, FISCAL_CHART_DATA, QUIZ_QUESTIONS } from './data';
import { BudgetMeasure, UserProfile } from './types';

// --- Components ---

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  key?: string | number;
}

const Badge = ({ children, color = 'gray' }: BadgeProps) => {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blue: 'bg-sky-50 text-sky-700 border-sky-100',
    orange: 'bg-amber-50 text-amber-700 border-amber-100',
    red: 'bg-rose-50 text-rose-700 border-rose-100',
    purple: 'bg-violet-50 text-violet-700 border-violet-100',
    gray: 'bg-slate-50 text-slate-700 border-slate-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-none text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border inline-block whitespace-nowrap ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'official': return 'indigo';
    case 'expected': return 'blue';
    case 'commentary': return 'purple';
    case 'not-announced': return 'gray';
    case 'withdrawn': return 'red';
    default: return 'gray';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'green';
    default: return 'gray';
  }
};

const SourcePill = ({ sourceId, sources = SOURCES, color = 'gray' }: { sourceId: string, sources?: typeof SOURCES, color?: 'gray' | 'indigo', key?: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const source = sources.find(s => s.id === sourceId);
  if (!source) return null;
  
  const colors = {
    gray: 'bg-slate-50 border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-indigo-600',
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 hover:text-white'
  };

  // Extract a short reference name from the title if it contains "Budget Paper No."
  const titleMatch = source.title.match(/Budget Paper No\. \d+/i);
  const shortTitle = titleMatch ? ` (${titleMatch[0]})` : '';

  return (
    <div className="relative inline-block">
      <a 
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-[7px] font-black uppercase tracking-widest transition-all rounded-none ${colors[color]}`}
      >
        <ExternalLink size={8} strokeWidth={3} />
        {source.publisher}{shortTitle}
      </a>
      
      {shortTitle && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-slate-900 text-white p-3 text-[8px] font-black uppercase tracking-widest leading-tight shadow-2xl z-50 pointer-events-none border border-white/10 text-center"
            >
              <div className="text-indigo-400 mb-1 border-b border-white/10 pb-1">Document Registry</div>
              {source.title}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-white/10" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const InteractiveTooltip = ({ title, content, iconSize = 14, align = 'right' }: { title: string, content: string, iconSize?: number, align?: 'left' | 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block leading-none">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-slate-300 hover:text-indigo-500 transition-colors flex items-center justify-center p-1 -m-1 focus:outline-none"
        aria-label={`More information about ${title}`}
      >
        <Info size={iconSize} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} bottom-full mb-2 w-64 bg-slate-900 text-white p-4 text-[10px] font-medium leading-relaxed shadow-2xl z-50 pointer-events-none sm:pointer-events-auto border border-white/10`}
          >
            <div className="font-black uppercase text-indigo-400 mb-2 border-b border-white/10 pb-1">{title}</div>
            {content}
            <div className={`absolute top-full ${align === 'right' ? 'right-4' : 'left-4'} w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-white/10`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FiscalChart = () => {
  return (
    <div className="h-[200px] w-full bg-white p-4 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Surplus/Deficit Trend ($bn)</div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-indigo-500" />
            <div className="text-[8px] font-bold text-slate-400 uppercase">Net Surplus</div>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={FISCAL_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} 
          />
          <YAxis 
            hide 
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white p-2 text-[10px] font-bold uppercase tracking-widest">
                    {payload[0].payload.year}: ${payload[0].value}BN
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="surplus" radius={[2, 2, 0, 0]}>
            {FISCAL_CHART_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.surplus > 0 ? '#6366f1' : '#f43f5e'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const BudgetQuiz = ({ onProfileFound }: { onProfileFound: (id: string) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (profileId: string) => {
    const newAnswers = [...answers, profileId];
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      // Find mode profile or just the last one for simplicity
      setIsFinished(true);
      setTimeout(() => onProfileFound(profileId), 1000);
    }
  };

  return (
    <div className="bg-emerald-50 border-2 border-emerald-500/20 p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Target size={120} />
      </div>
      
      {!isFinished ? (
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 flex items-center">
            <Zap size={14} className="mr-2" />
            Quick Discovery • {currentStep + 1}/{QUIZ_QUESTIONS.length}
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            {QUIZ_QUESTIONS[currentStep].text}
          </h2>
          <div className="space-y-2">
            {QUIZ_QUESTIONS[currentStep].options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.profileId)}
                className="w-full text-left p-4 bg-white border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-bold text-sm text-slate-700 flex justify-between items-center group"
              >
                {opt.text}
                <ArrowRight size={14} className="text-emerald-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-emerald-500 rounded-none mx-auto mb-4 flex items-center justify-center text-white"
          >
            <Check size={32} strokeWidth={3} />
          </motion.div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Profile Identified</h2>
          <p className="text-sm font-medium text-emerald-700">Customizing your budget lens...</p>
        </div>
      )}
    </div>
  );
};

interface BudgetCardProps {
  measure: BudgetMeasure;
  onClick: () => void;
  key?: string | number;
  isSelected?: boolean;
  onToggleCompare?: (id: string, e: React.MouseEvent) => void;
}

const BudgetCard = ({ measure, onClick, isSelected, onToggleCompare }: BudgetCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.99 }}
      whileHover={{ 
        y: -5,
        borderColor: isSelected ? "rgb(99, 102, 241)" : "rgb(99, 102, 241)",
        boxShadow: "0 10px 30px -10px rgba(79, 70, 229, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`bg-white p-5 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] border ${isSelected ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200'} mb-4 cursor-pointer transition-all group relative overflow-hidden`}
      id={`measure-${measure.id}`}
    >
      {/* Pulsing Background Glow */}
      <motion.div 
        className={`absolute inset-0 ${isSelected ? 'bg-indigo-500/10 opacity-100' : 'bg-indigo-500/5 opacity-0 group-hover:opacity-100'} pointer-events-none transition-opacity`}
        animate={{ 
          opacity: isSelected ? [0.1, 0.2, 0.1] : [0.03, 0.08, 0.03],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="flex gap-1.5 flex-wrap">
          <Badge color={getStatusColor(measure.status)}>{measure.status}</Badge>
          <Badge color="gray">{measure.category.replace('-', ' ')}</Badge>
        </div>
        <div className="flex items-center gap-2">
          {onToggleCompare && (
            <button
              onClick={(e) => onToggleCompare(measure.id, e)}
              className={`p-1 border transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-300 hover:border-indigo-400 hover:text-indigo-400'}`}
            >
              {isSelected ? <Check size={10} strokeWidth={4} /> : <div className="w-2.5 h-2.5" />}
            </button>
          )}
          <Badge color={getImpactColor(measure.impact)}>{measure.impact}</Badge>
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight mb-2 group-hover:text-indigo-700 transition-colors break-words">
        {measure.title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 font-medium break-words">
        {measure.summaryShort}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">
          <Clock size={12} className="mr-1.5 flex-shrink-0" />
          <span className="truncate">REF: {new Date(measure.lastUpdated).toLocaleDateString().replace(/\//g, '.')}</span>
        </div>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </motion.div>
  );
};

// --- Pages ---

const Home = ({ onSelectMeasure, onSelectProfile, compareIds, toggleCompare, sources }: { 
  onSelectMeasure: (m: BudgetMeasure) => void, 
  onSelectProfile: (p: string) => void,
  compareIds: string[],
  toggleCompare: (id: string, e: React.MouseEvent) => void,
  sources: typeof SOURCES
}) => {
  const latestUpdates = MEASURES.slice(0, 3);
  const [activeBento, setActiveBento] = useState<string | null>(null);

  return (
    <div className="pb-32">
      <header className="mb-8 sm:mb-10">
        <div className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 leading-none">Budget Dashboard</div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 leading-[1.1] break-words">Budget Lens <span className="text-indigo-600">2026–27</span></h1>
        <div className="flex items-center text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-none mr-2 flex-shrink-0" />
          <span className="truncate text-amber-600">Pre-Budget Intelligence • Last Data: {FISCAL_SUMMARY.updateDate}</span>
        </div>
      </header>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Fiscal Momentum</h2>
            <div className="flex items-center gap-1.5 ml-1">
              <span className="text-[7px] font-black text-slate-300 uppercase tracking-[0.2em]">Source:</span>
              {FISCAL_SUMMARY.sourceId && <SourcePill sourceId={FISCAL_SUMMARY.sourceId} sources={sources} />}
            </div>
          </div>
          <InteractiveTooltip 
            title="Economic Velocity" 
            content="Tracking the trajectory of the Australian economy through net debt cycles and headline balances. Synthesized from Budget Paper No. 1." 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          <div className="col-span-1 md:col-span-2 bg-white">
            <FiscalChart />
          </div>
          <div className="bg-white flex flex-col justify-center divide-y divide-slate-100">
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Headline Balance</div>
                <InteractiveTooltip 
                  title="Fiscal Outcome" 
                  content="The difference between total revenue and total expenditure. A surplus helps cooling down inflation." 
                  iconSize={10} 
                />
              </div>
              <div className="text-xl font-black text-indigo-600">{FISCAL_SUMMARY.surplus}</div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Net Public Debt</div>
                <InteractiveTooltip 
                  title="Debt Exposure" 
                  content="Total government debt minus liquid financial assets. Expressed as a percentage of GDP to show relative weight." 
                  iconSize={10} 
                />
              </div>
              <div className="text-xl font-black text-slate-900">{FISCAL_SUMMARY.netDebt}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-slate-200 border-x border-b border-slate-200">
          <div className="bg-white p-4">
            <div className="flex justify-between items-center mb-1">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GDP Growth Est.</div>
              <InteractiveTooltip 
                title="Economic Pace" 
                content="Projected annual increase in the market value of all goods and services produced within Australia." 
                iconSize={10} 
              />
            </div>
            <div className="text-xl font-black text-slate-900">{FISCAL_SUMMARY.growth}</div>
          </div>
          <div className="bg-white p-4">
            <div className="flex justify-between items-center mb-1">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Inflation</div>
              <InteractiveTooltip 
                title="Price Stability" 
                content="The Treasury's projected Consumer Price Index (CPI) target for the upcoming fiscal cycle." 
                iconSize={10} 
              />
            </div>
            <div className="text-xl font-black text-slate-900">{FISCAL_SUMMARY.inflation}</div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <BudgetQuiz onProfileFound={(id) => onSelectProfile(id)} />
      </section>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Resource Allocation</h2>
            <div className="flex items-center gap-1.5 ml-1">
              <span className="text-[7px] font-black text-slate-300 uppercase tracking-[0.2em]">Source:</span>
              {FISCAL_SUMMARY.sourceId && <SourcePill sourceId={FISCAL_SUMMARY.sourceId} sources={sources} />}
            </div>
          </div>
          <InteractiveTooltip 
            title="Capital Distribution" 
            content="Visualization of projected expenditure, indexed by cabinet-priority sectors. Sourced from Ministerial Portfolios and Budget Paper No. 1." 
          />
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-1 min-h-[300px]">
          <div 
            onClick={() => setActiveBento(activeBento === 'social' ? null : 'social')}
            className="col-span-2 row-span-2 bg-indigo-600 p-4 text-white hover:bg-indigo-700 transition-all cursor-pointer group relative flex flex-col justify-between"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-60 leading-tight">Social Security</div>
              <Info size={12} className="opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tighter leading-none">$230BN</div>
            <div className="mt-4 pt-4 flex items-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              View Measures <ChevronRight size={10} />
            </div>
            <div className={`absolute inset-0 bg-slate-900 p-4 sm:p-6 ${activeBento === 'social' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-20 flex flex-col justify-center pointer-events-none`}>
              <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 border-b border-white/10 pb-1">Age, Disability & Family</div>
              <div className="text-[9px] sm:text-[10px] font-medium leading-relaxed opacity-90 line-clamp-4">Covers the Age Pension, NDIS funding, and Family Tax Benefits. The largest individual category.</div>
            </div>
          </div>
          <div 
            onClick={() => setActiveBento(activeBento === 'health' ? null : 'health')}
            className="bg-emerald-500 p-3 text-white hover:bg-emerald-600 transition-all cursor-pointer group relative flex flex-col justify-between"
          >
            <div>
              <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest opacity-70 mb-1 leading-tight">Health</div>
              <div className="text-base sm:text-lg font-black tracking-tighter leading-none">$110BN</div>
            </div>
            <div className={`absolute inset-0 bg-slate-900 p-3 ${activeBento === 'health' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-20 flex flex-col justify-center pointer-events-none`}>
              <div className="text-[8px] sm:text-[9px] font-black uppercase text-emerald-400 mb-1">Medicare</div>
              <div className="text-[8px] sm:text-[9px] font-medium leading-tight opacity-90 line-clamp-3">Subsidies for hospitals and medicine.</div>
            </div>
          </div>
          <div 
            onClick={() => setActiveBento(activeBento === 'defense' ? null : 'defense')}
            className="bg-amber-500 p-3 text-white hover:bg-amber-600 transition-all cursor-pointer group relative flex flex-col justify-between"
          >
            <div>
              <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest opacity-70 mb-1 leading-tight">Defense</div>
              <div className="text-base sm:text-lg font-black tracking-tighter leading-none">$55BN</div>
            </div>
            <div className={`absolute inset-0 bg-slate-900 p-3 ${activeBento === 'defense' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-20 flex flex-col justify-center pointer-events-none`}>
              <div className="text-[8px] sm:text-[9px] font-black uppercase text-amber-400 mb-1">Security</div>
              <div className="text-[8px] sm:text-[9px] font-medium leading-tight opacity-90 line-clamp-3">Personnel and procurement.</div>
            </div>
          </div>
          <div 
            onClick={() => setActiveBento(activeBento === 'education' ? null : 'education')}
            className="bg-sky-500 p-3 text-white hover:bg-sky-600 transition-all cursor-pointer group relative flex flex-col justify-between"
          >
            <div>
              <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest opacity-70 mb-1 leading-tight">Education</div>
              <div className="text-base sm:text-lg font-black tracking-tighter leading-none">$48BN</div>
            </div>
            <div className={`absolute inset-0 bg-slate-900 p-3 ${activeBento === 'education' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-20 flex flex-col justify-center pointer-events-none`}>
              <div className="text-[8px] sm:text-[9px] font-black uppercase text-sky-400 mb-1">Skills</div>
              <div className="text-[8px] sm:text-[9px] font-medium leading-tight opacity-90 line-clamp-3">Schools and Universities.</div>
            </div>
          </div>
          <div 
            onClick={() => setActiveBento(activeBento === 'other' ? null : 'other')}
            className="bg-slate-800 p-3 text-white hover:bg-slate-900 transition-all cursor-pointer group relative flex flex-col justify-between"
          >
            <div>
              <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest opacity-70 mb-1 leading-tight">Other</div>
              <div className="text-base sm:text-lg font-black tracking-tighter leading-none">$120BN</div>
            </div>
            <div className={`absolute inset-0 bg-slate-900 border border-white/10 p-3 ${activeBento === 'other' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-20 flex flex-col justify-center pointer-events-none`}>
              <div className="text-[8px] sm:text-[9px] font-black uppercase text-slate-400 mb-1">Mixed</div>
              <div className="text-[8px] sm:text-[9px] font-medium leading-tight opacity-90 line-clamp-3">Environment and Industry.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">Executive Briefing</h2>
        <div className="space-y-4">
          {KEY_HIGHLIGHTS.map((h, i) => (
            <div key={i} className="p-5 bg-white border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">{h.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-slate-600 mb-4">{h.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Source:</span>
                {h.sourceIds?.map((sid: string) => <SourcePill key={sid} sourceId={sid} sources={sources} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Critical Measures</h2>
          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Full Index</button>
        </div>
        {latestUpdates.map(m => (
          <BudgetCard 
            key={m.id} 
            measure={m} 
            onClick={() => onSelectMeasure(m)} 
            isSelected={compareIds.includes(m.id)}
            onToggleCompare={toggleCompare}
          />
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">Select Profile</h2>
        <div className="grid grid-cols-1 gap-3">
          {USER_PROFILES.slice(0, 4).map(p => (
            <button 
              key={p.id}
              onClick={() => onSelectProfile(p.id)}
              className="p-5 bg-white rounded-none border border-slate-200 text-left hover:border-indigo-400 transition-all flex justify-between items-center group shadow-[2px_2px_0px_0px_rgba(0,0,0,0.01)]"
            >
              <div>
                <div className="font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors uppercase tracking-tight">{p.label}</div>
                <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{p.description}</div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </section>

      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-none relative overflow-hidden ring-1 ring-white/10 shadow-xl">
        <div className="relative z-10">
          <div className="text-[9px] sm:text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] mb-4">Awaiting Treasury Papers</div>
          <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight leading-none">Budget Night 2026</h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed break-words">Official documents are not yet available. All FY27 figures are based on pre-budget consensus and ministerial leaks.</p>
          <div className="flex flex-col gap-4 items-start">
            <button className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-none font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-colors shadow-lg shadow-amber-900/20">
              Set Telemetry Alert
            </button>
            <SourcePill sourceId="s1" sources={sources} color="indigo" />
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-amber-500/10 to-transparent" />
      </div>
    </div>
  );
};

const MeasureForecastChart = ({ category }: { category: string }) => {
  // Stable forecast data based on category name length to make it look different but predictable
  const seed = category.length;
  const data = [
    { name: 'FY24', val: 100 },
    { name: 'FY25', val: 105 + (seed % 10) },
    { name: 'FY26', val: 110 + (seed % 15) },
    { name: 'FY27', val: 115 + (seed % 20) },
    { name: 'FY28', val: 120 + (seed % 12) },
  ];

  return (
    <div className="h-[150px] w-full bg-slate-50 p-4 border border-slate-100 mt-4">
      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Projected Expenditure Trace: {category.replace('-', ' ')}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="val" stroke="#8884d8" strokeWidth={3} dot={{ r: 4, fill: '#8884d8' }} />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-slate-200 p-1 text-[8px] font-black">
                    {payload[0].value?.toFixed(0)} INDEX
                  </div>
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const MeasureDetail = ({ measure, sources: allSources, onBack, onSelectRelated }: { measure: BudgetMeasure, sources: typeof SOURCES, onBack: () => void, onSelectRelated: (m: BudgetMeasure) => void }) => {
  const sources = allSources.filter(s => measure.sourceIds.includes(s.id));
  const budgetPaperSources = sources.filter(s => s.sourceType === 'official-budget' || s.title.toLowerCase().includes('budget paper'));
  const otherSources = sources.filter(s => !budgetPaperSources.find(bp => bp.id === s.id));

  const relatedMeasures = MEASURES.filter(m => 
    m.id !== measure.id && (
      measure.relatedMeasureIds?.includes(m.id) || 
      m.category === measure.category ||
      m.audience.some(a => measure.audience.includes(a))
    )
  ).slice(0, 5);
  
  const logs = UPDATE_LOGS.filter(l => l.measureId === measure.id).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  
  return (
    <div className="pb-32">
      <button onClick={onBack} className="flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-8 hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Return to Index
      </button>

      <div className="flex gap-2 mb-6">
        <Badge color={getStatusColor(measure.status)}>{measure.status}</Badge>
        <Badge color="indigo">Ref: {measure.id}</Badge>
        <Badge color="gray">{measure.category.replace('-', ' ')}</Badge>
        <div className="ml-auto">
          <InteractiveTooltip 
            title="Governance Insight" 
            content="Always cross-reference this announcement with the relevant Portfolio Budget Statement (PBS) for detailed performance criteria. This measure may be subject to legislative disallowance in the Senate." 
          />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 sm:mb-8 leading-[1.1] tracking-tighter break-words">{measure.title}</h1>

      <div className="space-y-8 sm:space-y-10">
        <section>
          <h2 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
            <Info size={14} className="mr-2 text-indigo-500 flex-shrink-0" />
            Executive Summary
          </h2>
          <div className="bg-indigo-50/50 p-5 sm:p-6 rounded-none border border-indigo-100 text-slate-800 font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(79,70,229,0.05)] text-base sm:text-lg break-words">
            {measure.plainEnglish}
          </div>
        </section>

        {measure.professionalSummary && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
              <ShieldCheck size={14} className="mr-2 text-indigo-500" />
              Institutional Analysis
            </h2>
            <div className="bg-white p-6 rounded-none border border-slate-200 text-slate-600 text-sm leading-relaxed font-medium relative italic">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
              {measure.professionalSummary}
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Analysis Source:</span>
                {measure.sourceIds.map(sid => <SourcePill key={sid} sourceId={sid} sources={allSources} />)}
              </div>
            </div>
          </section>
        )}

        {measure.technicalNotes && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
              <Menu size={14} className="mr-2 text-indigo-500" />
              Technical Specification
            </h2>
            <div className="bg-slate-50 p-6 rounded-none border border-slate-100 text-slate-500 text-[11px] leading-relaxed font-mono uppercase tracking-tight">
              {measure.technicalNotes}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
            <Users size={14} className="mr-2 text-indigo-500" />
            Community Sentiment
          </h2>
          <div className="bg-white p-6 border border-slate-200">
            <div className="flex justify-between items-end mb-2">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">General Approval</div>
              <div className="text-sm font-black text-indigo-600">72% Support</div>
            </div>
            <div className="h-2 w-full bg-slate-100 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                className="h-full bg-indigo-500"
              />
            </div>
            <div className="flex justify-between mt-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Oppose</span>
              <span>Neutral</span>
              <span>Support</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 shadow-sm relative">
          <div className="bg-white p-5">
            <div className="flex justify-between items-center mb-1">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fiscal Allocation</div>
              <InteractiveTooltip 
                title="Funding Envelope" 
                content="Represents the total committed funding over the 4-year forward estimates period. Subject to annual review based on departmental performance." 
                iconSize={10} 
              />
            </div>
            <div className="text-xl font-black text-slate-900">{measure.financialAmount || 'UNSPECIFIED'}</div>
            <MeasureForecastChart category={measure.category} />
          </div>
          <div className="bg-white p-5">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Effective Date</div>
            <div className="text-xl font-black text-slate-900">{measure.startDate ? `FY${new Date(measure.startDate).getFullYear().toString().slice(-2)}` : 'TBC'}</div>
          </div>
        </div>

        {logs.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
              <History size={14} className="mr-2 text-indigo-500" />
              Chronological Update Log
            </h2>
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="bg-white p-4 border border-slate-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.01)] relative">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[9px] font-black uppercase tracking-widest text-indigo-500 px-2 py-0.5 bg-indigo-50 border border-indigo-100 italic">
                      {log.updateType.replace('-', ' ')}
                    </div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      {new Date(log.updatedAt).toLocaleString('en-AU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-700 mb-3">{log.updateSummary}</p>
                  
                  {log.relatedSourceId && (
                    <div className="mb-3">
                      <SourcePill sourceId={log.relatedSourceId} sources={allSources} />
                    </div>
                  )}

                  {(log.previousValue || log.newValue) && log.updateType !== 'source-added' && (
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 border border-slate-100">
                      <div>
                        <div className="text-[8px] font-black text-slate-400 uppercase mb-1">Previous</div>
                        <div className="text-[10px] font-mono text-slate-500 truncate">{log.previousValue || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-[8px] font-black text-indigo-400 uppercase mb-1">Current</div>
                        <div className="text-[10px] font-mono text-indigo-600 font-bold truncate">{log.newValue || 'N/A'}</div>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 pt-3 border-t border-slate-50 text-right">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Verified by: {log.updatedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedMeasures.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
              <ArrowRight size={14} className="mr-2 text-indigo-500" />
              Related Measures
            </h2>
            <div className="space-y-3">
              {relatedMeasures.map(rm => (
                <button 
                  key={rm.id}
                  onClick={() => onSelectRelated(rm)}
                  className="w-full text-left p-4 bg-white border border-slate-200 hover:border-indigo-400 transition-all flex justify-between items-center group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-indigo-500 transition-colors" />
                  <div className="pl-2">
                    <div className="text-[8px] font-black text-indigo-500 uppercase tracking-widest mb-1 italic opacity-0 group-hover:opacity-100 transition-opacity">
                      {rm.category.replace('-', ' ')}
                    </div>
                    <div className="text-xs font-black uppercase text-slate-900 tracking-tight group-hover:text-indigo-700 transition-colors">{rm.title}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase mt-1">{rm.impact} Impact • {rm.status}</div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </section>
        )}


        {budgetPaperSources.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
              <Database size={14} className="mr-2 text-indigo-500" />
              Official Budget Paper References
            </h2>
            <div className="space-y-3">
              {budgetPaperSources.map(s => (
                <a 
                  key={s.id} 
                  href={s.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block p-5 bg-indigo-50/30 border border-indigo-100 rounded-none hover:border-indigo-400 transition-all shadow-[4px_4px_0px_0px_rgba(79,70,229,0.05)] group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">{s.publisher} • Official Document</div>
                      <div className="text-sm font-black text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors">{s.title}</div>
                    </div>
                    <ExternalLink size={14} className="text-indigo-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Targeted Demographics</h2>
          <div className="flex flex-wrap gap-2">
            {measure.audience.map(a => (
              <span key={a} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-none text-[10px] font-black uppercase tracking-widest border border-slate-200">
                {a}
              </span>
            ))}
          </div>
        </section>

        {otherSources.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
              <ShieldCheck size={14} className="mr-2 text-indigo-500" />
              Supplementary Analysis & Evidence
            </h2>
            <div className="space-y-4">
              {otherSources.map(s => (
                <a 
                  key={s.id} 
                  href={s.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block p-5 bg-white border border-slate-200 rounded-none hover:border-indigo-400 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.01)]"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-black text-slate-900 leading-tight mb-1">{s.title}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.publisher} • {s.sourceType.replace('-', ' ')}</div>
                    </div>
                    <ExternalLink size={14} className="text-slate-300" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {measure.legalStatus === 'announcement-only' && (
        <div className="mt-12 p-5 bg-slate-900 text-white rounded-none flex items-start text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          <AlertCircle size={16} className="mr-4 flex-shrink-0 text-indigo-400" />
          Status: Announcement Only. Subject to legislative ratification and regulatory framework development.
        </div>
      )}
    </div>
  );
};

const TaxPulse = ({ measures, onSelectMeasure, compareIds, toggleCompare, sources }: { 
  measures: BudgetMeasure[], 
  onSelectMeasure: (m: BudgetMeasure) => void,
  compareIds: string[],
  toggleCompare: (id: string, e: React.MouseEvent) => void,
  sources: typeof SOURCES
}) => {
  const taxCategories = [
    { name: 'Individual', filter: 'individual', desc: 'Personal income and direct household levies.' },
    { name: 'Business', filter: 'small-business', desc: 'Concessions and compliance for the private sector.' },
    { name: 'Corporate', filter: 'professionals', desc: 'Multinational integrity and transparency frameworks.' },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
          <Database size={20} />
        </div>
        <div>
          <div className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] leading-none mb-1">Policy Domain</div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 leading-tight">Taxation Deep Dive</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {taxCategories.map(cat => {
          const catMeasures = measures.filter(m => m.audience.includes(cat.filter as any));
          return (
            <div key={cat.name} className="bg-white border border-slate-200 p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.02)] relative group hover:border-indigo-400 transition-all flex flex-col">
              <div className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">{cat.name} Reforms</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 truncate">
                {catMeasures.length} <span className="text-xs sm:text-sm font-bold text-slate-400">Indexed</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 break-words">
                {cat.desc}
              </p>
              <div className="mt-auto flex -space-x-2 group-hover:space-x-1 transition-all">
                {catMeasures.slice(0, 3).map(m => (
                  <div key={m.id} className="w-6 h-6 bg-slate-100 border border-white flex items-center justify-center text-[8px] font-black text-slate-400 rounded-none group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    {m.id}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-none border border-indigo-700/50 mb-10 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap size={140} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <div className="flex-1">
            <div className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <ShieldCheck size={14} className="flex-shrink-0" />
              Fiscal Integrity Summary
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight mb-4 break-words">Combating Bracket Creep & Tax Avoidance</h3>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed font-medium max-w-2xl mb-4 break-words">
              The 2026 tax packages represent a two-pronged strategy: protecting individual domestic purchasing power via <span className="text-white">WPI-linked indexation</span>, while simultaneously closing loopholes for <span className="text-white">multinational transfer pricing</span>. This is projected to generate a net fiscal improvement of $6.2BN over the medium term.
            </p>
            <SourcePill sourceId="s1" sources={sources} color="indigo" />
          </div>
          <div className="flex-shrink-0 self-center md:self-auto relative">
            <div className="px-5 py-3 sm:px-6 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-center">
              <div className="text-[9px] sm:text-[10px] font-black uppercase text-indigo-300 mb-1">Net Impact</div>
              <div className="text-xl sm:text-2xl font-black whitespace-nowrap">+$14.2BN</div>
              <div className="text-[8px] font-bold text-indigo-400 uppercase whitespace-nowrap">Per BP No. 1</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
         <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 border-b border-slate-100 pb-2">Consolidated Taxation Measures ({measures.length})</div>
         {measures.map(m => (
           <BudgetCard 
             key={m.id} 
             measure={m} 
             onClick={() => onSelectMeasure(m)} 
             isSelected={compareIds.includes(m.id)}
             onToggleCompare={toggleCompare}
           />
         ))}
      </div>
    </section>
  );
};

const Explore = ({ onSelectMeasure, compareIds, toggleCompare, sources }: { 
  onSelectMeasure: (m: BudgetMeasure) => void,
  compareIds: string[],
  toggleCompare: (id: string, e: React.MouseEvent) => void,
  sources: typeof SOURCES
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(MEASURES.map(m => m.category)));

  const filtered = MEASURES.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.summaryShort.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const activeInsight = activeCategory ? SECTOR_INSIGHTS[activeCategory] : SECTOR_INSIGHTS['general'];

  return (
    <div className="pb-32">
      <header className="mb-8 sm:mb-10">
        <div className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 leading-none">Repository</div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 break-words leading-tight">Budget 2026–27 Measures</h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm mt-2 break-words">Comprehensive tracking of all federal announcements.</p>
      </header>

      {/* Professional Analysis Insights Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 bg-slate-900 text-white rounded-none border border-slate-800 shadow-[20px_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} strokeWidth={1} />
        </div>
        
        <div className="p-8 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Institutional Intelligence</div>
            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 bg-indigo-400 mr-2" />
              Verified Outlook
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tighter leading-tight break-words">{activeInsight.title}</h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium mb-6 sm:mb-8 border-l-2 border-slate-700 pl-4 italic break-words line-clamp-4">
            "{activeInsight.summary}"
          </p>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {activeInsight.keyTakeaways.map((k: string, i: number) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="text-indigo-500 font-black text-xs">0{i+1}</div>
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-200">{k}</div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-600/10 p-5 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Market Sentiment</span>
            </div>
            <p className="text-[11px] font-bold leading-relaxed text-slate-300 mb-4">
              {activeInsight.professionalOutlook}
            </p>
            <div className="flex flex-wrap gap-1">
              {activeInsight.sourceIds?.map((sid: string) => <SourcePill key={sid} sourceId={sid} color="indigo" sources={sources} />)}
            </div>
          </div>
        </div>
      </motion.section>

      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Filter by keyword..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-none shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-bold placeholder:text-slate-300 uppercase tracking-widest text-[10px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
        <button 
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors border ${!activeCategory ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-400'}`}
        >
          Total Index
        </button>
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors border ${activeCategory === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-400'}`}
          >
            {c.replace('-', ' ')}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeCategory === 'tax' && !search ? (
          <motion.div
            key="tax-pulse"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <TaxPulse 
              measures={filtered} 
              onSelectMeasure={onSelectMeasure} 
              compareIds={compareIds} 
              toggleCompare={toggleCompare}
              sources={sources}
            />
          </motion.div>
        ) : (
          <motion.div
            key="results-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-1"
          >
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 border-b border-slate-100 pb-2">{filtered.length} Indexed Measures</div>
            {filtered.map(m => (
              <BudgetCard 
                key={m.id} 
                measure={m} 
                onClick={() => onSelectMeasure(m)} 
                isSelected={compareIds.includes(m.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <div className="text-slate-200 mb-6 flex justify-center">
                  <Search size={64} strokeWidth={1} />
                </div>
                <div className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No matches found within database parameters</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileView = ({ profileId, onSelectMeasure, onBack, compareIds, toggleCompare }: { 
  profileId: string, 
  onSelectMeasure: (m: BudgetMeasure) => void, 
  onBack: () => void,
  compareIds: string[],
  toggleCompare: (id: string, e: React.MouseEvent) => void
}) => {
  const profile = USER_PROFILES.find(p => p.id === profileId);
  const relevantMeasures = MEASURES.filter(m => m.audience.includes(profile?.audienceTag as any));

  return (
    <div className="pb-32">
      <button onClick={onBack} className="flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-8 hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Profile Selection
      </button>

      <header className="mb-8 sm:mb-12">
        <div className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Personal Filter</div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 mb-4 break-words leading-tight">{profile?.label} View</h1>
        <p className="text-slate-500 font-medium leading-relaxed italic border-l-2 border-indigo-100 pl-4 text-xs sm:text-sm break-words">{profile?.description}</p>
      </header>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-100 pb-2">Relevant Intelligence</h2>
        {relevantMeasures.map(m => (
          <BudgetCard 
            key={m.id} 
            measure={m} 
            onClick={() => onSelectMeasure(m)} 
            isSelected={compareIds.includes(m.id)}
            onToggleCompare={toggleCompare}
          />
        ))}
        {relevantMeasures.length === 0 && (
          <div className="p-12 text-center bg-white rounded-none border border-dashed border-slate-200">
            <div className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No specific profile records identified</div>
          </div>
        )}
      </section>
    </div>
  );
};

const Timeline = () => {
  const milestones = [
    { date: '12 May 2026', time: '19:30', title: 'Federal Budget Night', desc: 'Treasurer addresses the House of Representatives.', status: 'official' },
    { date: '10 May 2026', time: '09:00', title: 'Analyst Consensus', desc: 'Pre-budget briefing released by institutional partners.', status: 'commentary', current: true },
    { date: '08 May 2026', time: '11:00', title: 'Energy Subsidies Briefing', desc: 'Treasury sources indicate extension of bill relief.', status: 'expected' },
  ];

  return (
    <div className="pb-32">
       <header className="mb-8 sm:mb-12">
        <div className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Audit Trail</div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 leading-tight">Budget 2026–27 Timeline</h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm mt-2">Sequential record of budget developments.</p>
      </header>

      <div className="relative pl-10 space-y-12">
        <div className="absolute left-[13px] top-4 bottom-4 w-[2px] bg-slate-100" />
        
        {milestones.map((m, i) => (
          <div key={i} className="relative">
            <div className={`absolute -left-[32px] top-1.5 w-3 h-3 rounded-none border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] ${m.current ? 'bg-indigo-600 scale-125' : 'bg-slate-300'}`} />
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{m.date}</span>
                  <span className="text-[10px] text-slate-300 font-bold tracking-widest">{m.time}</span>
                </div>
                <SourcePill sourceId="s1" />
              </div>
      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 leading-tight break-words">{m.title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium mb-3 break-words line-clamp-3">{m.desc}</p>
              <div>
                <Badge color={getStatusColor(m.status)}>{m.status}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Sources = ({ sources, onUpdate }: { sources: typeof SOURCES, onUpdate: (id: string, updates: any) => void }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="pb-32">
      <header className="mb-8 sm:mb-12">
        <div className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Verification</div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 leading-tight">Source Registry</h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm mt-2">Official documentation and references.</p>
      </header>

      <div className="space-y-4">
        {sources.map(s => (
          <div 
            key={s.id} 
            className="block p-6 bg-white border border-slate-200 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.01)]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <Badge color={s.reliability === 'high' || s.reliability === 'official' ? 'indigo' : s.reliability === 'medium' ? 'blue' : 'orange'}>
                  {s.reliability}
                </Badge>
                <Badge color="gray">{s.sourceType.replace('-', ' ')}</Badge>
              </div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-right">
                LAST AUDIT: {new Date(s.lastChecked).toLocaleDateString()}
              </div>
            </div>

            <div className="text-xl font-extrabold text-slate-900 mb-1 leading-tight">{s.title}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{s.publisher}</div>
            
            {editingId === s.id ? (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-slate-50 p-4 border border-slate-200 mt-4 mb-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[8px] font-black text-slate-400 uppercase mb-1 block">Reliability Score</label>
                    <select 
                      value={s.reliability}
                      onChange={(e) => onUpdate(s.id, { reliability: e.target.value })}
                      className="w-full bg-white border border-slate-200 p-2 text-[10px] font-bold uppercase"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                      <option value="official">Official</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[8px] font-black text-slate-400 uppercase mb-1 block">Verification Date</label>
                    <input 
                      type="date"
                      value={new Date(s.lastChecked).toISOString().split('T')[0]}
                      onChange={(e) => onUpdate(s.id, { lastChecked: new Date(e.target.value).toISOString() })}
                      className="w-full bg-white border border-slate-200 p-2 text-[10px] font-bold uppercase"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setEditingId(null)}
                  className="mt-4 w-full bg-slate-900 text-white py-2 text-[10px] font-black uppercase tracking-widest"
                >
                  Confirm Audit
                </button>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <a 
                  href={s.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 mt-2 pt-4 border-t border-slate-50 flex items-center justify-between text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                >
                  <span>Access Source Document</span>
                  <ExternalLink size={14} />
                </a>
                <button 
                  onClick={() => setEditingId(s.id)}
                  className="mt-2 pt-4 border-t border-slate-50 flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                  <History size={14} className="mr-1" />
                  Audit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ComparisonBar = ({ selectedCount, onCompare, onClear }: { selectedCount: number, onCompare: () => void, onClear: () => void }) => {
  if (selectedCount === 0) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-32 left-8 right-8 z-50 flex justify-center pointer-events-none"
    >
      <div className="bg-slate-900 text-white px-6 py-4 shadow-2xl flex items-center gap-6 rounded-none border border-white/10 pointer-events-auto">
        <div className="flex flex-col">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Analysis Queue</div>
          <div className="text-sm font-bold">{selectedCount} {selectedCount === 1 ? 'Measure' : 'Measures'} Selected</div>
        </div>
        
        <div className="flex gap-2">
          {selectedCount >= 2 && (
            <button 
              onClick={onCompare}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              Compare <ArrowRight size={14} />
            </button>
          )}
          <button 
            onClick={onClear}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ComparisonView = ({ measures, onBack, onSelectMeasure }: { 
  measures: BudgetMeasure[], 
  onBack: () => void,
  onSelectMeasure: (m: BudgetMeasure) => void
}) => {
  const compareFields = [
    { label: 'Category', key: 'category' },
    { label: 'Financial Impact', key: 'financialAmount' },
    { label: 'Status', key: 'status' },
    { label: 'Confidence', key: 'confidence' },
    { label: 'Legal Status', key: 'legalStatus' },
  ];

  return (
    <div className="pb-32">
      <button onClick={onBack} className="flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-8 hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Exit Analysis
      </button>

      <header className="mb-8 sm:mb-12">
        <div className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 leading-none">Side-by-Side Comparison</div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">2026–27 Comparative Analysis</h1>
        <p className="text-slate-500 font-medium text-xs sm:text-sm">Identifying structural variances across indexed fiscal shifts.</p>
      </header>

      <div className="flex overflow-x-auto pb-8 gap-4 no-scrollbar">
        {measures.map(m => (
          <div key={m.id} className="min-w-[280px] flex-1">
            <div className="bg-white border-x border-t border-slate-200 p-6 h-48 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Badge color={getStatusColor(m.status)}>{m.status}</Badge>
                <Badge color={getImpactColor(m.impact)}>{m.impact}</Badge>
              </div>
              <div className="text-lg sm:text-xl font-black tracking-tight leading-tight text-slate-900 break-words">{m.title}</div>
              <button 
                onClick={() => onSelectMeasure(m)}
                className="text-[9px] sm:text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline text-left mt-2"
              >
                Full Detail
              </button>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 bg-white">
              {compareFields.map(field => (
                <div key={field.label} className="p-4">
                  <div className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{field.label}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-700 capitalize break-words">
                    {(m as any)[field.key] || 'N/A'}
                  </div>
                </div>
              ))}
              <div className="p-4 bg-slate-50/50 min-h-[120px]">
                <div className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Contextual Summary</div>
                <p className="text-[10px] sm:text-[11px] leading-relaxed text-slate-600 font-medium break-words line-clamp-6">
                  {m.summaryShort}
                </p>
              </div>
            </div>
          </div>
        ))}
        {measures.length < 3 && Array.from({ length: 3 - measures.length }).map((_, i) => (
          <div key={i} className="min-w-[280px] flex-1 bg-slate-50/50 border border-dashed border-slate-200 flex items-center justify-center p-12 text-center">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Analysis Slot Available</div>
          </div>
        ))}
      </div>
      
      <section className="mt-12 bg-indigo-900 text-white p-8 rounded-none ring-1 ring-white/10">
        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Zap size={14} />
          Synthetic Insight
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1 bg-indigo-500" />
            <div>
              <div className="text-xs font-black uppercase mb-1">Fiscal Synergy</div>
              <p className="text-xs text-indigo-200 leading-relaxed font-medium">
                The selected measures represent a combined allocation of approximately {' '}
                <span className="text-white font-black">
                  ${measures.reduce((acc, m) => acc + (parseFloat(m.financialAmount?.replace(/[^0-9.]/g, '') || '0')), 0).toFixed(1)}BN
                </span> over the forward estimates.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-amber-500" />
            <div>
              <div className="text-xs font-black uppercase mb-1">Impact Convergence</div>
              <p className="text-xs text-indigo-200 leading-relaxed font-medium">
                {measures.every(m => m.status === measures[0].status) 
                  ? `All active measures share a status of '${measures[0].status.toUpperCase()}', indicating high legislative stability.`
                  : "Mixed legislative statuses suggest varying levels of implementation risk across the selected cohort."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'measures' | 'timeline' | 'sources' | 'profile'>('home');
  const [selectedMeasure, setSelectedMeasure] = useState<BudgetMeasure | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [sourcesState, setSourcesState] = useState(SOURCES);

  const updateSource = (id: string, updates: Partial<typeof SOURCES[0]>) => {
    setSourcesState(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const toggleCompare = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const startComparison = () => {
    if (compareIds.length >= 2) {
      setIsComparing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    if (isComparing) {
      const selectedMeasures = MEASURES.filter(m => compareIds.includes(m.id));
      return (
        <ComparisonView 
          measures={selectedMeasures} 
          onBack={() => setIsComparing(false)} 
          onSelectMeasure={(m) => {
            setSelectedMeasure(m);
            setIsComparing(false);
          }} 
        />
      );
    }

    if (selectedMeasure) {
      return (
        <MeasureDetail 
          measure={selectedMeasure} 
          sources={sourcesState}
          onBack={() => setSelectedMeasure(null)} 
          onSelectRelated={(m) => setSelectedMeasure(m)} 
        />
      );
    }
    
    if (selectedProfileId) {
      return (
        <ProfileView 
          profileId={selectedProfileId} 
          onSelectMeasure={(m) => setSelectedMeasure(m)} 
          onBack={() => setSelectedProfileId(null)} 
          compareIds={compareIds}
          toggleCompare={toggleCompare}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <Home 
            onSelectMeasure={(m) => setSelectedMeasure(m)} 
            onSelectProfile={(p) => setSelectedProfileId(p)} 
            compareIds={compareIds}
            toggleCompare={toggleCompare}
            sources={sourcesState}
          />
        );
      case 'measures':
        return (
          <Explore 
            onSelectMeasure={(m) => setSelectedMeasure(m)} 
            compareIds={compareIds}
            toggleCompare={toggleCompare}
            sources={sourcesState}
          />
        );
      case 'timeline':
        return <Timeline />;
      case 'sources':
        return <Sources sources={sourcesState} onUpdate={updateSource} />;
      case 'profile':
        return (
          <div className="pb-32">
             <header className="mb-12">
              <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Onboarding</div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">Select Profile</h1>
              <p className="text-slate-500 font-medium text-sm mt-2">Calibrate budget insights for your specific role.</p>
            </header>
            <div className="grid grid-cols-1 gap-4">
              {USER_PROFILES.map(p => (
                <button 
                  key={p.id}
                  onClick={() => setSelectedProfileId(p.id)}
                  className="p-6 bg-white rounded-none border border-slate-200 text-left hover:border-indigo-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.01)] group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-black text-slate-900 group-hover:text-indigo-700 transition-colors uppercase tracking-tight">{p.label}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{p.description}</div>
                    </div>
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <Home 
            onSelectMeasure={(m) => setSelectedMeasure(m)} 
            onSelectProfile={(p) => setSelectedProfileId(p)} 
            compareIds={compareIds}
            toggleCompare={toggleCompare}
            sources={sourcesState}
          />
        );
    }
  };

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Control' },
    { id: 'measures', icon: Search, label: 'Measures' },
    { id: 'timeline', icon: Clock, label: 'Audit Log' },
    { id: 'sources', icon: Database, label: 'Registry' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFE] text-slate-900 font-sans selection:bg-indigo-100 italic-small overflow-x-hidden">
      <div className="w-full max-w-2xl mx-auto min-h-screen bg-[#FBFCFE] relative flex flex-col pt-8 sm:pt-12 px-4 sm:px-8">
        
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedMeasure?.id || '') + (selectedProfileId || '') + (isComparing ? 'comparing' : '')}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.1 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <ComparisonBar 
          selectedCount={compareIds.length} 
          onCompare={startComparison} 
          onClear={() => setCompareIds([])} 
        />

        {/* Floating FAB Menu */}
        <div className="fixed bottom-10 right-8 z-[60] flex flex-col items-end gap-3">
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-slate-900 border border-slate-800 shadow-2xl p-2 rounded-none mb-2 overflow-hidden w-48"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setSelectedMeasure(null);
                      setSelectedProfileId(null);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-4 text-left transition-colors ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <item.icon size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.1em]">{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform ${isMenuOpen ? 'bg-slate-800 rotate-90' : 'bg-indigo-600 hover:scale-105 active:scale-95'}`}
          >
            {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Backdrop for Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[50]"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
