import React from 'react';
import { BlogPostConfig, GenerationStatus, AppView } from '../types';
import { Icon } from './Icon';

interface SidebarProps {
  config: BlogPostConfig;
  setConfig: React.Dispatch<React.SetStateAction<BlogPostConfig>>;
  onGenerate: () => void;
  status: GenerationStatus;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, onGenerate, status, currentView, onChangeView }) => {
  const handleChange = (field: keyof BlogPostConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const isGenerating = status === GenerationStatus.PLANNING || status === GenerationStatus.WRITING;

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 h-screen overflow-y-auto flex flex-col sticky top-0">
      <div 
        className="p-6 border-b border-slate-100 cursor-pointer"
        onClick={() => onChangeView('generator')}
      >
        <div className="flex items-center gap-2 text-indigo-600 mb-1">
          <Icon name="feather" className="w-6 h-6" />
          <h1 className="font-bold text-xl tracking-tight text-slate-900">GhostWriter AI</h1>
        </div>
        <p className="text-xs text-slate-500">Editorial-grade content generator</p>
      </div>

      <div className="p-6 flex-1 space-y-6">
        {/* Topic */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Topic / Title Idea</label>
          <input
            type="text"
            value={config.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder="e.g. The Future of Sustainable Coffee"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
            disabled={isGenerating || currentView === 'privacy'}
          />
        </div>

        {/* Audience */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Target Audience</label>
          <input
            type="text"
            value={config.audience}
            onChange={(e) => handleChange('audience', e.target.value)}
            placeholder="e.g. Eco-conscious millenials"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
            disabled={isGenerating || currentView === 'privacy'}
          />
        </div>

        {/* Tone */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Tone of Voice</label>
          <input
            type="text"
            value={config.tone}
            onChange={(e) => handleChange('tone', e.target.value)}
            placeholder="e.g. Witty, Investigative, Professional"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
            disabled={isGenerating || currentView === 'privacy'}
          />
        </div>

        {/* Keywords */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Key Themes / Keywords</label>
          <textarea
            value={config.keywords}
            onChange={(e) => handleChange('keywords', e.target.value)}
            placeholder="fair trade, climate change, brewing methods..."
            rows={3}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
            disabled={isGenerating || currentView === 'privacy'}
          />
        </div>

        {/* Word Count */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700">Length</label>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              ~{config.wordCount} words
            </span>
          </div>
          <input
            type="range"
            min="300"
            max="2000"
            step="100"
            value={config.wordCount}
            onChange={(e) => handleChange('wordCount', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            disabled={isGenerating || currentView === 'privacy'}
          />
          <div className="flex justify-between text-xs text-slate-400 px-1">
            <span>Short</span>
            <span>Long-form</span>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 bg-slate-50">
        <button
          onClick={() => {
            if (currentView === 'privacy') onChangeView('generator');
            else onGenerate();
          }}
          disabled={isGenerating || (!config.topic && currentView === 'generator')}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium text-white shadow-md transition-all mb-4
            ${isGenerating 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:transform active:scale-95'
            }`}
        >
          {isGenerating ? (
            <>
              <Icon name="refresh-cw" className="w-5 h-5 animate-spin" />
              {status === GenerationStatus.PLANNING ? 'Planning Structure...' : 'Writing Draft...'}
            </>
          ) : (
            <>
              <Icon name="sparkles" className="w-5 h-5" />
              {currentView === 'privacy' ? 'Go to Generator' : 'Generate Blog Post'}
            </>
          )}
        </button>

        <div className="flex justify-center">
            <button 
                onClick={() => onChangeView('privacy')}
                className="text-xs text-slate-400 hover:text-indigo-600 hover:underline transition-colors"
            >
                Privacy Policy
            </button>
        </div>
      </div>
    </aside>
  );
};