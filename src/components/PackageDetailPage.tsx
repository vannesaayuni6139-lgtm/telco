import { ArrowLeft, BarChart2, Phone, MessageSquare, Globe, Star, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PackageDetailPageProps {
  onBack?: () => void;
  onBuyNow?: () => void;
}

export function PackageDetailPage({ onBack, onBuyNow }: PackageDetailPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-1.5">
                <div className="size-5 bg-blue-400 rounded-sm" />
              </div>
              <span className="text-xl">Recall</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button className="text-white hover:text-blue-500 transition-colors">Home</button>
              <button className="text-blue-500">Packages</button>
              <button className="text-slate-400 hover:text-white transition-colors">My Account</button>
              <button className="text-slate-400 hover:text-white transition-colors">Support</button>
            </nav>
            <div className="flex items-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                Buy Now
              </Button>
              <div className="size-10 rounded-full bg-amber-200 flex items-center justify-center">
                <span className="text-slate-900">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <button onClick={onBack} className="hover:text-white transition-colors">Home</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-white transition-colors">Packages</button>
          <span>/</span>
          <span className="text-white">Freedom Plus 20</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-white mb-8">Freedom Plus 20</h1>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Data */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <div className="bg-blue-600/20 rounded-full p-3 w-fit mb-4">
                    <BarChart2 className="size-6 text-blue-500" />
                  </div>
                  <h3 className="text-white mb-1">20GB</h3>
                  <p className="text-slate-400">High-Speed 5G Data</p>
                </div>

                {/* Voice */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <div className="bg-blue-600/20 rounded-full p-3 w-fit mb-4">
                    <Phone className="size-6 text-blue-500" />
                  </div>
                  <h3 className="text-white mb-1">1000 Mins</h3>
                  <p className="text-slate-400">All-Network Voice</p>
                </div>

                {/* SMS */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <div className="bg-blue-600/20 rounded-full p-3 w-fit mb-4">
                    <MessageSquare className="size-6 text-blue-500" />
                  </div>
                  <h3 className="text-white mb-1">500 SMS</h3>
                  <p className="text-slate-400">All-Network SMS</p>
                </div>

                {/* Social Media */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <div className="bg-blue-600/20 rounded-full p-3 w-fit mb-4">
                    <Globe className="size-6 text-blue-500" />
                  </div>
                  <h3 className="text-white mb-1">Unlimited</h3>
                  <p className="text-slate-400">Social Media</p>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <h3 className="text-white mb-4">Package Details</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                The Freedom Plus 20 package is designed for the modern user who needs a reliable and fast connection. 
                Enjoy blazing-fast 5G speeds, ample call minutes, and SMS for all your communication needs. Plus, stay 
                connected on your favorite social platforms without worrying about data consumption.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="size-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Terms and Conditions apply.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="size-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Fair usage policy is in effect for unlimited social media data.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="size-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Package auto-renews every 30 days unless cancelled.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Pricing & CTA */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-white text-5xl">$25</span>
                  <span className="text-slate-400">/ 30 days</span>
                </div>
              </div>

              {/* AI Recommendation Badge */}
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Star className="size-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-300 mb-1">AI Recommendation</h4>
                    <p className="text-blue-200/80 text-sm">
                      We recommend this because your average use is 19GB/30 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={onBuyNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6"
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline"
                  className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700 rounded-full py-6"
                >
                  Compare with Other Packages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2024 Recall Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
