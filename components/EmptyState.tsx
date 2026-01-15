import React from 'react';
import { Icon } from './Icon';

export const EmptyState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <Icon name="feather" className="w-10 h-10 text-slate-300" />
      </div>
      <h2 className="text-2xl font-serif text-slate-700 font-medium mb-2">Ready to Write</h2>
      <p className="max-w-md text-slate-500">
        Configure your topic, audience, and tone in the sidebar to generate a human-like, editorial-quality blog post.
      </p>
    </div>
  );
};