import { useState } from 'react';
import { BarChart2, Phone, Clock, Sparkles, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface RecommendedPackagesPageProps {
  onPackageSelect?: (packageName: string) => void;
  onBuyNow?: () => void;
}

const recommendedPackages = [
  {
    name: "Streamer's Delight",
    price: 29,
    period: '/mo',
    data: '50 GB Data',
    calls: '100 Mins Calls',
    validity: '30 Days Validity',
    description: '*Based on your recent streaming behavior on video apps.*',
    aiSuggested: true,
  },
  {
    name: 'Talk & Text Weekly',
    price: 12,
    period: '/week',
    data: '5 GB Data',
    calls: 'Unlimited Calls',
    validity: '7 Days Validity',
    description: '*Perfect for your frequent international calls.*',
    aiSuggested: true,
  },
  {
    name: 'Weekend Data Blast',
    price: 5,
    period: '/day',
    data: '10 GB Data',
    calls: '50 Mins Calls',
    validity: '1 Day Validity',
    description: '*Based on your high data usage on weekends.*',
    aiSuggested: true,
  },
];

export function RecommendedPackagesPage({ onPackageSelect, onBuyNow }: RecommendedPackagesPageProps) {
  const [priceRange, setPriceRange] = useState([10, 50]);
  const [duration, setDuration] = useState('daily');
  const [packageTypes, setPackageTypes] = useState({
    data: false,
    voice: true,
    bundles: false,
  });

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
              <button className="text-slate-400 hover:text-white transition-colors">Home</button>
              <button className="text-blue-500">Plans</button>
              <button className="text-slate-400 hover:text-white transition-colors">Usage</button>
              <button className="text-slate-400 hover:text-white transition-colors">Support</button>
            </nav>
            <div className="flex items-center gap-4">
              <Bell className="size-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                My Account
              </Button>
              <div className="size-10 rounded-full bg-amber-200 flex items-center justify-center">
                <span className="text-slate-900">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
              <h3 className="text-white mb-2">Filters</h3>
              <p className="text-slate-400 text-sm mb-6">Refine your results</p>

              {/* Price Filter */}
              <div className="mb-6">
                <Label className="text-white mb-4 block flex items-center gap-2">
                  <span className="bg-blue-600/20 rounded p-1">
                    <span className="text-blue-500 text-xs">$</span>
                  </span>
                  Price
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={50}
                  step={5}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">${priceRange[0]}</span>
                  <span className="text-slate-400">${priceRange[1]}</span>
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <Label className="text-white mb-4 block flex items-center gap-2">
                  <span className="bg-blue-600/20 rounded p-1">
                    <Clock className="size-3 text-blue-500" />
                  </span>
                  Duration
                </Label>
                <RadioGroup value={duration} onValueChange={setDuration}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="daily" id="daily" className="border-slate-600 text-blue-600" />
                    <Label htmlFor="daily" className="text-slate-300 cursor-pointer flex items-center">
                      <Checkbox
                        checked={duration === 'daily'}
                        className="mr-2 border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      Daily
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="weekly" id="weekly" className="border-slate-600 text-blue-600" />
                    <Label htmlFor="weekly" className="text-slate-300 cursor-pointer flex items-center">
                      <Checkbox
                        className="mr-2 border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" className="border-slate-600 text-blue-600" />
                    <Label htmlFor="monthly" className="text-slate-300 cursor-pointer flex items-center">
                      <Checkbox
                        className="mr-2 border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      Monthly
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Package Type Filter */}
              <div className="mb-6">
                <Label className="text-white mb-4 block flex items-center gap-2">
                  <span className="bg-blue-600/20 rounded p-1">
                    <BarChart2 className="size-3 text-blue-500" />
                  </span>
                  Package Type
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="data"
                      checked={packageTypes.data}
                      onCheckedChange={(checked) =>
                        setPackageTypes({ ...packageTypes, data: checked as boolean })
                      }
                      className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="data" className="text-slate-300 cursor-pointer">
                      Data
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="voice"
                      checked={packageTypes.voice}
                      onCheckedChange={(checked) =>
                        setPackageTypes({ ...packageTypes, voice: checked as boolean })
                      }
                      className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="voice" className="text-slate-300 cursor-pointer">
                      Voice
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bundles"
                      checked={packageTypes.bundles}
                      onCheckedChange={(checked) =>
                        setPackageTypes({ ...packageTypes, bundles: checked as boolean })
                      }
                      className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="bundles" className="text-slate-300 cursor-pointer">
                      Bundles
                    </Label>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl">
                Clear All
              </Button>
            </div>
          </aside>

          {/* Main Content - Recommended Packages */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-white mb-2">Recommended For You</h1>
              <p className="text-slate-400">
                These recommendations are personalized by our AI based on your usage patterns.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendedPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500/50 transition-all relative"
                >
                  {pkg.aiSuggested && (
                    <Badge className="absolute -top-3 right-6 bg-teal-500/20 text-teal-400 border border-teal-500/50 px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="size-3" />
                      AI Suggested
                    </Badge>
                  )}

                  <div className="mb-6">
                    <h3 className="text-white mb-4">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-white text-4xl">${pkg.price}</span>
                      <span className="text-slate-400">{pkg.period}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <BarChart2 className="size-4 text-blue-500" />
                        <span className="text-slate-300">{pkg.data}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="size-4 text-blue-500" />
                        <span className="text-slate-300">{pkg.calls}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="size-4 text-blue-500" />
                        <span className="text-slate-300">{pkg.validity}</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm italic">{pkg.description}</p>
                  </div>

                  <Button
                    onClick={onBuyNow}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  >
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
