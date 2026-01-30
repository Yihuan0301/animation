
import React from 'react';
// Add missing motion import
import { motion } from 'framer-motion';

interface SidebarProps {
  activeSection: string;
}

const CATEGORIES = [
  { id: 'text', label: 'TEXT DYNAMICS' },
  { id: 'mouse', label: 'MOUSE ENGINE' },
  { id: '3d', label: '3D VIEWPORTS' },
  { id: 'ux', label: 'UX DETAIL' },
  { id: 'dataviz', label: 'INTELLIGENCE VIZ' },
  { id: 'advanced', label: 'ADVANCED SYSTEMS' },
  { id: 'transitions', label: 'STATE OVERLAYS' },
  { id: 'ai', label: 'AI LABORATORY' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-80 h-screen border-r border-slate-800 bg-slate-950 p-10 flex flex-col gap-12 shrink-0">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 bg-indigo-500 rounded-sm animate-pulse" />
          <h1 className="text-2xl font-black text-white leading-tight tracking-tighter">
            ANIMATION<br />PLAYGROUND
          </h1>
        </div>
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Motion System v2.6.4</p>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollTo(cat.id)}
            className={`w-full text-left py-3 px-4 rounded-xl text-[10px] font-bold tracking-[0.25em] transition-all duration-300 border uppercase ${
              activeSection === cat.id 
                ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-8 border-t border-slate-900">
         <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] text-slate-500 font-mono">CORE_LOAD</span>
              <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div animate={{ x: [-64, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-full h-full bg-indigo-500" />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-mono leading-tight">Uptime: 99.998%</p>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
