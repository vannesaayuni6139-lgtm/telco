import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1563884705074-7c8b15f16295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjaG9vc2luZyUyMG9wdGlvbnMlMjBuZXR3b3JrfGVufDF8fHx8MTc2Mzk4ODY3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Recommendations, Personalized.',
    description: 'Recall analyzes how you use our services to suggest products and plans that perfectly fit your lifestyle.',
    bgGradient: 'from-indigo-950 via-purple-950 to-purple-900',
  },
  {
    image: 'https://images.unsplash.com/photo-1762279388979-6a430989284c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGF0YSUyMG5ldHdvcmslMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYzOTg4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Smart Insights, Smarter Savings',
    description: 'Understand your data usage and discover personalized ways to save money every month.',
    bgGradient: 'from-slate-900 via-indigo-950 to-blue-950',
  },
  {
    image: 'https://images.unsplash.com/photo-1653301430435-be2b599f95ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBjb25uZWN0aXZpdHklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzk4ODY3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Reduce Churn, Maximize Value',
    description: 'Get recommendations based on machine learning analysis of your consumption patterns.',
    bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
  },
];

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center p-4 transition-all duration-700`}>
      <div className="max-w-4xl w-full">
        {/* Card Container */}
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
          {/* Image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-teal-400 via-blue-200 to-purple-300 rounded-2xl p-1">
                <ImageWithFallback 
                  src={slide.image}
                  alt="Onboarding illustration"
                  className="w-full max-w-md h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-white">{slide.title}</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {slide.description}
            </p>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-slate-600 w-2 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <Button 
              onClick={nextSlide}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-full text-lg"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Bottom Navigation (Optional) */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="size-8" />
          </button>

          <button 
            onClick={nextSlide}
            className="text-slate-400 hover:text-white transition-all"
          >
            <ChevronRight className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
