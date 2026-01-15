import React, { useState } from 'react';
import { BlogPostConfig, BlogPostState, GenerationStatus, AppView } from './types';
import { generateBlogPost } from './services/geminiService';
import { Sidebar } from './components/Sidebar';
import { EmptyState } from './components/EmptyState';
import { MarkdownContent } from './components/MarkdownContent';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [config, setConfig] = useState<BlogPostConfig>({
    topic: '',
    audience: 'General Reader',
    tone: 'Informative and Engaging',
    keywords: '',
    wordCount: 800,
  });

  const [currentView, setCurrentView] = useState<AppView>('generator');
  const [blogPost, setBlogPost] = useState<BlogPostState | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    setStatus(GenerationStatus.PLANNING);
    setErrorMsg(null);
    setBlogPost(null);
    setCurrentView('generator'); // Ensure we are on the generator view
    setIsCopied(false);

    try {
      // Simulate "Thinking" vs "Writing" delay for better UX
      setTimeout(() => {
        if (status !== GenerationStatus.ERROR) setStatus(GenerationStatus.WRITING);
      }, 2000);

      const response = await generateBlogPost(config);
      
      setBlogPost({
        title: response.title,
        content: response.content,
      });
      setStatus(GenerationStatus.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setStatus(GenerationStatus.ERROR);
      setErrorMsg(error.message || "Failed to generate blog post. Please check your API key or try again.");
    }
  };

  const handleCopy = async () => {
    if (!blogPost) return;
    try {
      const fullContent = `# ${blogPost.title}\n\n${blogPost.content}`;
      await navigator.clipboard.writeText(fullContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderContent = () => {
    if (currentView === 'privacy') {
      return <PrivacyPolicy onBack={() => setCurrentView('generator')} />;
    }

    if (status === GenerationStatus.IDLE) {
        return <EmptyState />;
    }

    if (status === GenerationStatus.PLANNING || status === GenerationStatus.WRITING) {
      return (
        <div className="h-full flex flex-col items-center justify-center animate-pulse">
          <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full animate-ping opacity-25"></div>
              <Icon name="feather" className="w-12 h-12 text-indigo-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-700">
            {status === GenerationStatus.PLANNING ? 'Outlining structure...' : 'Drafting content...'}
          </h3>
          <p className="text-slate-500 mt-2">Crafting your unique voice</p>
        </div>
      );
    }

    if (status === GenerationStatus.ERROR) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
            !
          </div>
          <h3 className="text-lg font-bold text-slate-800">Something went wrong</h3>
          <p className="text-slate-600 mt-2 max-w-md">{errorMsg}</p>
          <button 
            onClick={() => setStatus(GenerationStatus.IDLE)}
            className="mt-6 px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm hover:bg-slate-50"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (status === GenerationStatus.SUCCESS && blogPost) {
      const featuredPrompt = `A high-quality, editorial style featured image for a blog post titled "${blogPost.title}" about ${config.topic}. Minimalist, artistic, professional photography.`;

      return (
        <div className="max-w-4xl mx-auto p-12 pb-24 animate-fade-in-up">
          
          {/* Featured Image Prompt Section */}
          <div className="mb-10 p-6 bg-slate-100/50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-3 text-slate-500 uppercase tracking-widest text-xs font-bold">
              <Icon name="image" className="w-4 h-4" />
              Featured Image Concept
            </div>
            <div className="text-slate-700 italic font-medium">
              "{featuredPrompt}"
            </div>
          </div>

          {/* Title and Actions */}
          <div className="flex justify-between items-start gap-6 mb-4">
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              {blogPost.title}
            </h1>
            <button 
              onClick={handleCopy}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-all ${isCopied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
              title="Copy markdown to clipboard"
            >
              {isCopied ? (
                <>
                  <Icon name="check" className="w-4 h-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Icon name="copy" className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-10 border-b border-slate-200">
            <span className="flex items-center gap-1">
              <Icon name="file-text" className="w-4 h-4" />
              ~{config.wordCount} words
            </span>
            <span>•</span>
            <span>Target: {config.audience}</span>
          </div>

          {/* Content */}
          <MarkdownContent content={blogPost.content} />

        </div>
      );
    }
    
    return <EmptyState />;
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <Sidebar 
        config={config} 
        setConfig={setConfig} 
        onGenerate={handleGenerate} 
        status={status}
        currentView={currentView}
        onChangeView={setCurrentView}
      />

      <main className="flex-1 overflow-y-auto h-screen relative scroll-smooth">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;