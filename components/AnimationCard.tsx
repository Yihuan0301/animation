
import React from 'react';
import { motion } from 'framer-motion';

interface AnimationCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  hint?: string;
}

const AnimationCard: React.FC<AnimationCardProps> = ({ title, description, children, hint }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-slate-700 transition-colors">
      <div className="relative h-64 w-full bg-slate-950 flex items-center justify-center p-4">
        {hint && (
          <div className="absolute top-4 left-4 text-[10px] text-slate-600 font-mono uppercase tracking-widest">
            {hint}
          </div>
        )}
        {children}
      </div>
      <div className="p-6 border-t border-slate-800/50">
        <h3 className="text-lg font-bold text-slate-100 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default AnimationCard;
