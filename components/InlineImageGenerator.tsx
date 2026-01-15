import React from 'react';
import { Icon } from './Icon';

interface InlineImageGeneratorProps {
  prompt: string;
}

export const InlineImageGenerator: React.FC<InlineImageGeneratorProps> = ({ prompt }) => {
  return (
    <div className="my-8 border border-indigo-100 bg-indigo-50/30 rounded-lg p-6 transition-all hover:border-indigo-200">
      <div className="flex items-center gap-2 text-indigo-700 font-medium mb-3">
        <Icon name="image" className="w-5 h-5" />
        <span className="font-serif text-sm uppercase tracking-wider">Suggested Illustration</span>
      </div>
      <div className="bg-white p-4 rounded border border-indigo-100 text-slate-600 font-medium text-sm leading-relaxed shadow-sm">
        {prompt}
      </div>
    </div>
  );
};