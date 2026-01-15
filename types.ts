export interface BlogPostConfig {
  topic: string;
  audience: string;
  tone: string;
  keywords: string;
  wordCount: number;
}

export interface GeneratedBlogResponse {
  title: string;
  content: string; // Markdown content
}

export interface BlogPostState extends GeneratedBlogResponse {
  featuredImage?: string; // Base64 or URL
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  PLANNING = 'PLANNING', // "Thinking"
  WRITING = 'WRITING',   // "Writing"
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ImageGenerationRequest {
  prompt: string;
}

export type AppView = 'generator' | 'privacy';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}