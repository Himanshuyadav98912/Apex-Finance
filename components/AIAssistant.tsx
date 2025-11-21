

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAIAssistantResponseStream } from '../services/geminiService';
import { ICONS } from '../constants';

const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const responseEndRef = useRef<HTMLDivElement>(null);

  const popularPrompts = [
    "Summarize today's market performance.",
    "What are the key economic indicators to watch this week?",
    "Provide an analysis of the semiconductor industry.",
    "Explain the concept of 'quantitative easing' in simple terms."
  ];

  useEffect(() => {
    responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [response]);

  const handleSubmit = async (currentPrompt: string) => {
    if (!currentPrompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');
    
    try {
      const stream = await getAIAssistantResponseStream(currentPrompt);
      for await (const chunk of stream) {
        setResponse(prev => prev + chunk.text);
      }
    } catch (e: any) {
      console.error("Failed to get AI response:", e);
      setError(e.message || "An error occurred while fetching the AI response. Ensure your API key is set.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit(prompt);
  };
  
  const handlePopularPromptClick = (p: string) => {
    setPrompt(p);
    handleSubmit(p);
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex items-center space-x-3">
        <div className="p-2 bg-indigo-500/20 rounded-full text-indigo-400">
            {ICONS.insights}
        </div>
        <div>
            <h2 className="text-lg font-bold text-white">ApexAI Assistant</h2>
            <p className="text-sm text-slate-400">Your personal market intelligence analyst</p>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        {error && <div className="p-3 mb-4 text-red-200 bg-red-800/50 rounded-lg">{error}</div>}
        
        {!response && !isLoading && (
            <div className="text-center text-slate-400">
                <h3 className="text-lg font-semibold text-white mb-4">What would you like to know?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {popularPrompts.map((p, i) => (
                        <button key={i} onClick={() => handlePopularPromptClick(p)} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-colors text-sm">
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <div className="prose prose-invert prose-sm max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white prose-blockquote:border-l-indigo-400 prose-blockquote:text-slate-400 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-code:text-yellow-400 prose-pre:bg-slate-900/50">
            {isLoading && !response && (
                 <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-400 ml-2">ApexAI is thinking...</span>
                </div>
            )}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
        </div>
        <div ref={responseEndRef} />
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-800">
        <form onSubmit={handleFormSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a financial question..."
            disabled={isLoading}
            className="flex-1 w-full px-4 py-2 text-white bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt}
            className="px-5 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '...' : 'Ask'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;