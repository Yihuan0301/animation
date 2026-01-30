
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import AnimationCard from './components/AnimationCard';
import TextEffectRenderer from './components/TextEffectRenderer';
import { 
  TiltCard, 
  MagneticButton, 
  ProgressRing, 
  CounterAnimation, 
  SpotlightEffect, 
  RippleEffect,
  RotatingCube,
  Starfield,
  MeshFluid,
  MagneticGrid,
  SpringyBars,
  CyberSignal,
  AreaChart,
  ParticleVortex,
  GlassReveal,
  LiquidButton,
  RadarScan,
  HackerTerminal,
  NeuralLink,
  FractalLoop
} from './components/SpecialAnimations';
import AIGenerator from './pages/AIGenerator';
import PageTransitions from './pages/PageTransitions';

const SectionHeader: React.FC<{ title: string; id: string }> = ({ title, id }) => (
  <div id={id} className="sticky top-0 z-20 py-8 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mb-10">
    <div className="flex items-center gap-6">
      <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{title}</h2>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-slate-800 to-transparent" />
      <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-mono text-indigo-400">
        REF_{id.toUpperCase()}_v2.8
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('text');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = ['text', 'mouse', '3d', 'ux', 'dataviz', 'advanced', 'transitions', 'ai'];
    const observerOptions = {
      root: scrollRef.current,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-['Inter']">
      <Sidebar activeSection={activeSection} />
      
      <main ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth p-8 lg:p-16 relative bg-slate-950">
        
        {/* TEXT EFFECTS */}
        <SectionHeader title="Text Dynamics" id="text" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {['stagger', 'glitch', 'neon', 'scramble', 'blur', 'wave', 'float'].map(id => (
            <AnimationCard key={id} title={id.toUpperCase()} description="Advanced character manipulation for digital typefaces.">
              <TextEffectRenderer effectId={id} text="PLAYGROUND" />
            </AnimationCard>
          ))}
        </div>

        {/* MOUSE INTERACTIONS */}
        <SectionHeader title="Mouse Engine" id="mouse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <AnimationCard title="Spotlight Scanner" description="Dynamic radial illumination for content discovery.">
            <SpotlightEffect />
          </AnimationCard>
          <AnimationCard title="Magnetic Nexus" description="Proximity-based grid node scaling for organic interactions.">
            <MagneticGrid />
          </AnimationCard>
          <AnimationCard title="Interactive Ripple" description="State-driven click propagation system.">
            <RippleEffect />
          </AnimationCard>
          <AnimationCard title="Elastic Pull" description="Physics-based attraction model for interactive nodes.">
            <MagneticButton />
          </AnimationCard>
        </div>

        {/* 3D DIMENSIONS */}
        <SectionHeader title="3D Viewports" id="3d" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          <AnimationCard title="Perspective Matrix" description="Corrected 3D tilt transformation with Z-depth.">
            <TiltCard />
          </AnimationCard>
          <AnimationCard title="Kinetic Cube" description="Full 3D rotation with depth-buffered faces.">
            <RotatingCube />
          </AnimationCard>
          <AnimationCard title="Z-Axis Floating" description="Z-axis oscillation text component.">
             <TextEffectRenderer effectId="float" text="Z-AXIS" />
          </AnimationCard>
        </div>

        {/* UX DETAIL */}
        <SectionHeader title="UX Detail" id="ux" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <AnimationCard title="Liquid Fill" description="Internal volume simulation for interactive states.">
            <LiquidButton />
          </AnimationCard>
          <AnimationCard title="Glass Reveal" description="Complex blur and opacity transition card.">
            <GlassReveal />
          </AnimationCard>
          <AnimationCard title="Hacker Terminal" description="Retro terminal style typing animation.">
            <HackerTerminal />
          </AnimationCard>
          <AnimationCard title="Area Signal" description="Animated SVG pathing for trend analysis.">
            <AreaChart />
          </AnimationCard>
        </div>

        {/* DATA VIZ */}
        <SectionHeader title="Intelligence Viz" id="dataviz" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          <AnimationCard title="Radar Scan" description="Rotating circular scanning pattern.">
            <RadarScan />
          </AnimationCard>
          <AnimationCard title="Biosync Pulse" description="High-tech EKG waveform monitoring.">
            <CyberSignal />
          </AnimationCard>
          <AnimationCard title="Digital Gauge" description="Precision circular progress indicator (Safe-Zone v2).">
            <ProgressRing />
          </AnimationCard>
          <AnimationCard title="Metric Flux" description="High-frequency numerical transitions.">
            <CounterAnimation />
          </AnimationCard>
        </div>

        {/* ADVANCED */}
        <SectionHeader title="Advanced Systems" id="advanced" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <AnimationCard title="Neural Link" description="Bespoke node network with dynamic pathing.">
            <NeuralLink />
          </AnimationCard>
          <AnimationCard title="Fractal Loop" description="Recursive 3D geometry tunnel simulation.">
            <FractalLoop />
          </AnimationCard>
          <AnimationCard title="Particle Vortex" description="Cinematic orbital particle simulation.">
            <ParticleVortex />
          </AnimationCard>
          <AnimationCard title="Audio Flux" description="Dynamic staggered bars for audio simulation.">
            <SpringyBars />
          </AnimationCard>
        </div>

        {/* BACKGROUNDS */}
        <SectionHeader title="Environment" id="backgrounds" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <AnimationCard title="Plasma Flow" description="Organic moving radial gradients with liquid blending (v2).">
            <MeshFluid />
          </AnimationCard>
          <AnimationCard title="Deep Starfield" description="Parallax particle simulation for space aesthetics.">
            <Starfield />
          </AnimationCard>
        </div>

        {/* TRANSITIONS */}
        <SectionHeader title="State Overlays" id="transitions" />
        <div className="mb-32">
          <PageTransitions />
        </div>

        {/* AI GEN */}
        <SectionHeader title="AI Motion Laboratory" id="ai" />
        <div className="mb-32">
          <AIGenerator />
        </div>

        <footer className="py-24 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-mono tracking-widest uppercase gap-8">
          <div className="flex gap-12">
            <span>© 2025 Playground.sys</span>
            <span>Kernel: V2.8.2_LTS</span>
            <span>Build: 0xAF321D</span>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-3 bg-cyan-500/20" />)}
              <div className="w-1 h-3 bg-cyan-500 animate-pulse" />
            </div>
            <span>Systems Optimal</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
