import { useState } from 'react';
import { Star, ChevronRight, Heart } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';

interface PackageItem {
  id: string;
  name: string;
  price: string;
  perks: string[];
  recommendedReason?: string;
  rating?: number; // 0-5
}

const samplePackages: PackageItem[] = [
  { id: 'p1', name: 'Data Booster 10GB', price: '$15', perks: ['Fast 5G', 'Flexible'], recommendedReason: 'You often run out of data mid-month.', rating: 4.5 },
  { id: 'p2', name: 'Unlimited Talk & Text', price: '$25', perks: ['No caps', 'Good value'], recommendedReason: 'Great for heavy callers', rating: 4.2 },
  { id: 'p3', name: 'Weekend Data Pack', price: '$8', perks: ['Cheap', 'Weekend use only'], rating: 3.8 },
  { id: 'p4', name: 'International Roaming Pass', price: '$30', perks: ['Global', 'Pay-as-you-go'], rating: 4.9 },
];

export function RecommendedPackagesPage() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white">Recommended for you</h1>
          <p className="text-slate-400 text-sm">Personalized package recommendations to save money and match your usage.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4">View All Packages</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {samplePackages.map((pkg) => (
          <Card key={pkg.id} className="p-6 bg-slate-900 border border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white text-lg font-semibold">{pkg.name}</h3>
                  {pkg.recommendedReason && <Badge className="bg-amber-600/20 text-amber-400 border-amber-500/30">Recommended</Badge>}
                </div>
                <p className="text-slate-300 text-sm mb-3">{pkg.perks.join(' • ')}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="size-4" />
                    <span className="text-white font-semibold">{pkg.rating ?? '—'}</span>
                  </div>
                  <div className="text-slate-400 text-sm">• {pkg.price}</div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(pkg.id)}
                    className={`p-2 rounded-full ${liked[pkg.id] ? 'text-pink-400' : 'text-slate-400'}`}
                  >
                    <Heart className="size-4" />
                  </Button>
                </div>

                <div className="mt-2">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-4 py-2 flex items-center gap-2">
                    Buy
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {pkg.recommendedReason && <div className="mt-4 text-slate-300 text-sm">Why: {pkg.recommendedReason}</div>}
          </Card>
        ))}
      </div>
    </main>
  );
}
