import { Activity } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="size-full flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-800">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="bg-white rounded-xl p-4 shadow-2xl">
          <Activity className="w-12 h-12 text-black" strokeWidth={2} />
        </div>
        
        {/* Company Name */}
        <div className="text-center">
          <h1 className="text-white tracking-wider mb-1">TELCO</h1>
          <p className="text-gray-400 tracking-wide">ANALYTICS</p>
        </div>

        {/* Loading Indicator */}
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Tagline */}
        <p className="text-gray-500 tracking-widest mt-8">Intelligent Telco Analytics</p>
      </div>
    </div>
  );
}
