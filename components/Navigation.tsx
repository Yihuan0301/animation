
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/text', label: 'Text Effects' },
    { path: '/transitions', label: 'Transitions' },
    { path: '/ai', label: 'AI Generator' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20"
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-white">AnimaPlay</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                  location.pathname === link.path ? 'text-indigo-500' : 'text-slate-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            {/* Simple mobile indicator */}
            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest">
              Playground v1.0
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
