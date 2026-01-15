import React from 'react';
import { InlineImageGenerator } from './InlineImageGenerator';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  // Regex to match: ![PROMPT: ...](placeholder)
  // We capture the content inside PROMPT: ...
  const placeholderRegex = /!\[PROMPT:\s*(.*?)\]\(placeholder\)/g;

  // Split content. parts will alternate between text and image matches
  const parts = content.split(placeholderRegex);

  return (
    <article className="prose prose-lg prose-slate max-w-none font-serif leading-relaxed text-slate-800">
      {parts.map((part, index) => {
        // Even indices are regular markdown text
        if (index % 2 === 0) {
          if (!part.trim()) return null;
          
          // Simple custom rendering for headers and paragraphs
          // In a production app, we might use a library like react-markdown, 
          // but here we want lightweight control.
          return (
            <div key={index}>
              {part.split('\n').map((line, lineIdx) => {
                if (line.startsWith('### ')) {
                   return <h3 key={`${index}-${lineIdx}`} className="text-xl font-bold mt-6 mb-3 text-slate-900">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={`${index}-${lineIdx}`} className="text-2xl font-bold mt-8 mb-4 text-slate-900">{line.replace('## ', '')}</h2>;
                }
                 if (line.startsWith('# ')) {
                  return <h1 key={`${index}-${lineIdx}`} className="text-3xl font-bold mt-8 mb-4 text-slate-900">{line.replace('# ', '')}</h1>;
                }
                if (line.trim() === '') return <div key={`${index}-${lineIdx}`} className="h-4" />;
                
                return <p key={`${index}-${lineIdx}`} className="mb-4">{line}</p>;
              })}
            </div>
          );
        } else {
          // Odd indices are the captured groups (the prompt text)
          return <InlineImageGenerator key={index} prompt={part} />;
        }
      })}
    </article>
  );
};