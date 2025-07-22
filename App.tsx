
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PixelatedButton from './components/PixelatedButton';
import ImageDisplay from './components/ImageDisplay';
import { generatePixelArt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const examplePrompts = [
    "A knight fighting a dragon in front of a castle",
    "A futuristic cityscape at night with flying cars",
    "A cozy cabin in a snowy forest",
    "A treasure chest overflowing with gold and jewels",
    "A spaceship landing on a mysterious alien planet",
  ];

  const handleGenerateClick = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImageUrl = await generatePixelArt(prompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  
  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen text-cyan-300 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <Header />
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 mt-6">
        <div className="w-full p-4 bg-gray-800 border-2 border-purple-500 shadow-[6px_6px_0px_rgba(168,85,247,0.5)]">
          <label htmlFor="prompt" className="text-2xl text-white mb-2 block">
            Enter your prompt:
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="e.g., A wizard casting a spell in a dark forest"
            className="w-full h-28 p-3 bg-gray-900 border-2 border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xl text-white resize-none"
            disabled={isLoading}
          />
          <div className="mt-4">
            <p className="text-lg text-white mb-2">Or try an example:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((p) => (
                <button 
                  key={p} 
                  onClick={() => handleExampleClick(p)}
                  disabled={isLoading}
                  className="px-3 py-1 bg-purple-600 text-white text-sm hover:bg-purple-500 disabled:bg-gray-600 transition-colors duration-200 border-2 border-purple-400"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <PixelatedButton onClick={handleGenerateClick} disabled={isLoading || !prompt}>
          {isLoading ? 'Generating...' : 'Generate Pixel Art'}
        </PixelatedButton>

        <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} error={error} />
      </main>
      <footer className="mt-auto pt-8 text-center text-gray-500 text-lg">
        <p>Powered by Google Imagen 3</p>
      </footer>
    </div>
  );
};

export default App;
