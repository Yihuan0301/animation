
export interface TextEffect {
  id: string;
  name: string;
  description: string;
  category: 'Entrance' | 'Loop' | 'Interactive';
}

export interface TransitionType {
  id: string;
  name: string;
  variants: any;
}

export interface AIResponse {
  suggestion: string;
  cssClasses: string;
  framerCode: string;
}
