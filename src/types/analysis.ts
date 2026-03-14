import { Dimension } from './chat';

export interface UserPhrase {
  raw: string;           // verbatim from user: "writing fantasy novels"
  normalized: string;    // lowercased, trimmed
  category: string;      // broad category: "writing_content"
  subcategory: string;   // specific: "fiction_writing"
  dimension: Dimension;
}

export interface Theme {
  label: string;
  category: string;
  subcategory: string;
  keywords: string[];
  userPhrases: UserPhrase[];
  confidence: number;
  dimension: Dimension;
}

export type IntersectionType = 'passion' | 'mission' | 'vocation' | 'profession';

export interface IntersectionResult {
  type: IntersectionType;
  dimensions: [Dimension, Dimension];
  themes: string[];
  description: string;
  userEvidence: string[];
  strength: number;
}

export interface CareerPath {
  title: string;
  description: string;
  matchScore: number;
  relatedThemes: string[];
  personalizedReason: string;
}

export interface Strength {
  name: string;
  score: number;
  description: string;
  evidence: string[];
}

export interface GrowthArea {
  area: string;
  suggestion: string;
  relatedDimension: Dimension;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  specificActions: string[];
}

export interface IkigaiResult {
  dimensions: Record<Dimension, Theme[]>;
  intersections: IntersectionResult[];
  centralIkigai: {
    statement: string;
    themes: string[];
    confidence: number;
  };
  recommendations: Recommendation[];
  careerPaths: CareerPath[];
  strengths: Strength[];
  growthAreas: GrowthArea[];
  summary: string;
}
