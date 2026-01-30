
import { TransitionType, TextEffect } from './types';

export const TEXT_EFFECTS: TextEffect[] = [
  { id: 'stagger', name: 'Staggered Reveal', description: 'Characters reveal one by one with a bounce.', category: 'Entrance' },
  { id: 'glitch', name: 'Cyber Glitch', description: 'RGB splitting and flickering effect.', category: 'Loop' },
  { id: 'wave', name: 'Ocean Wave', description: 'Smooth vertical oscillation.', category: 'Loop' },
  { id: 'shimmer', name: 'Golden Shimmer', description: 'A light sweep across the text.', category: 'Loop' },
  { id: 'typewriter', name: 'Retro Typewriter', description: 'Classic character-by-character typing.', category: 'Entrance' },
  { id: 'float', name: 'Ethereal Float', description: 'Gentle 3D floating movement.', category: 'Loop' },
];

export const PAGE_TRANSITIONS: TransitionType[] = [
  {
    id: 'fade',
    name: 'Soft Fade',
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
  },
  {
    id: 'slide',
    name: 'Side Slide',
    variants: {
      initial: { x: '100vw', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100vw', opacity: 0 },
    }
  },
  {
    id: 'zoom',
    name: 'Deep Zoom',
    variants: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
    }
  },
  {
    id: 'rotate',
    name: '3D Flip',
    variants: {
      initial: { rotateY: 90, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: -90, opacity: 0 },
    }
  }
];
