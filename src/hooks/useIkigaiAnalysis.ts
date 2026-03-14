import { useState, useCallback } from 'react';
import { Dimension } from '../types/chat';
import { IkigaiResult } from '../types/analysis';
import { computeIkigai } from '../analysis/ikigaiCalculator';

export function useIkigaiAnalysis() {
  const [result, setResult] = useState<IkigaiResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyze = useCallback((responses: Record<Dimension, string[]>): Promise<IkigaiResult> => {
    setIsAnalyzing(true);

    return new Promise((resolve) => {
      // Simulate processing time for dramatic effect
      setTimeout(() => {
        const ikigaiResult = computeIkigai(responses);
        setResult(ikigaiResult);
        setIsAnalyzing(false);
        resolve(ikigaiResult);
      }, 4000);
    });
  }, []);

  return { result, isAnalyzing, analyze };
}
