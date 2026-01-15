import React from 'react';
import { Icon } from './Icon';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto p-12 pb-24 animate-fade-in text-slate-800">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to Generator
      </button>

      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-sm text-slate-500 mb-6">Last Updated: October 2023</p>

        <p>
          Welcome to GhostWriter AI. We are committed to protecting your personal information and your right to privacy. 
          This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          GhostWriter AI is designed as a client-side application. We do not maintain a backend server to store your personal data, blog drafts, or history.
        </p>
        <ul>
          <li><strong>Input Data:</strong> Text prompts, topics, and configuration settings you enter are processed transiently to generate content.</li>
          <li><strong>API Keys:</strong> If you provide an API Key, it is stored locally in your browser session or environment and is used solely to authenticate requests with Google's services.</li>
        </ul>

        <h3>2. How We Process Data</h3>
        <p>
          To provide AI generation features, this application interacts with third-party AI services:
        </p>
        <ul>
          <li><strong>Google Gemini API:</strong> When you click "Generate," your input data (topic, tone, keywords) is sent directly from your browser to Google's servers for processing.</li>
        </ul>
        <p>
          Please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Google's Privacy Policy</a> to understand how they handle data sent to their API.
        </p>

        <h3>3. Data Retention</h3>
        <p>
          We do not retain your generated content. Once you close or refresh the browser tab, your current session data is lost unless you have manually saved it elsewhere. We do not track your usage history.
        </p>

        <h3>4. Permissions</h3>
        <p>
          The app may request access to features like the clipboard (to copy text) or file downloads (to save images). These permissions are used strictly for local functionality.
        </p>

        <h3>5. Changes to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
        </p>

        <h3>6. Contact Us</h3>
        <p>
          If you have questions or comments about this policy, you may contact us at support@ghostwriter.ai.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200">
        <p className="text-xs text-slate-400">
          GhostWriter AI is an independent application and is not affiliated with Google.
        </p>
      </div>
    </div>
  );
};