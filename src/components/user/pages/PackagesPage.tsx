import { useState } from 'react';
import { Check, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Slider } from '../../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../ui/sheet';
import { CheckoutPage } from './CheckoutPage';
import { PackageDetailPage } from './PackageDetailPage';

type PackageCategory = 'data' | 'voice' | 'sms' | 'entertainment';

const packages = {
  data: [
    {
      name: 'Unlimited Data',
      validity: '30 days',
      amount: '50 GB',
      price: 29.99,
      recommended: true,
    },
    {
      name: 'Starter Pack',
      validity: '15 days',
      amount: '10 GB',
      price: 9.99,
      recommended: false,
    },
    {
      name: 'Pro Surfer',
      validity: '30 days',
      amount: '100 GB',
      price: 45.0,
      recommended: false,
    },
    {
      name: 'Weekly Data',
      validity: '7 days',
      amount: '5 GB',
      price: 5.99,
      recommended: false,
    },
    {
      name: 'Social Media Pass',
      validity: '30 days',
      amount: '20 GB',
      price: 15.0,
      recommended: false,
    },
    {
      name: 'Ultimate Unlimited',
      validity: '30 days',
      amount: 'Unlimited',
      price: 99.0,
      recommended: true,
    },
  ],
  voice: [
    {
      name: 'Talk All Day',
      validity: '30 days',
      amount: '1000 Mins',
      price: 19.99,
      recommended: false,
    },
    {
      name: 'Basic Calls',
      validity: '15 days',
      amount: '500 Mins',
      price: 12.99,
      recommended: false,
    },
  ],
  sms: [
    {
      name: 'SMS Bundle',
      validity: '30 days',
      amount: '500 SMS',
      price: 5.99,
      recommended: false,
    },
  ],
  entertainment: [
    {
      name: 'Streaming Plus',
      validity: '30 days',
      amount: 'Unlimited Streaming',
      price: 24.99,
      recommended: false,
    },
  ],
};

interface PackageCardProps {
  pkg: any;
  onBuyClick: () => void;
  onDetailsClick: () => void;
}

function PackageCard({ pkg, onBuyClick, onDetailsClick }: PackageCardProps) {
  return (
    <div
      className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500/50 transition-all relative"
    >
      {pkg.recommended && (
        <Badge className="absolute -top-3 right-6 bg-emerald-400 text-slate-900 px-3 py-1 rounded-full">
          ✓ Recommended
        </Badge>
      )}

      <div className="mb-6">
        <h3 className="text-white mb-2">{pkg.name}</h3>
        <p className="text-slate-400">Valid for {pkg.validity}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-white">{pkg.amount.includes('GB') ? pkg.amount.split(' ')[0] : pkg.amount}</span>
          {pkg.amount.includes('GB') && <span className="text-slate-400 text-2xl"> GB</span>}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-white">${pkg.price.toFixed(2)}</p>
      </div>

      <Button
        className={`w-full rounded-full ${
          pkg.recommended
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-transparent border border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white'
        }`}
        onClick={pkg.recommended ? onBuyClick : onDetailsClick}
      >
        {pkg.recommended ? 'Buy Now' : 'Details'}
      </Button>
    </div>
  );
}

export function PackagesPage() {
  const [category, setCategory] = useState<PackageCategory>('data');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [dataAllowance, setDataAllowance] = useState('10gb-50gb');
  const [showFilters, setShowFilters] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPackageDetail, setShowPackageDetail] = useState(false);

  const filteredPackages = packages[category].filter(
    (pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
  );

  if (showCheckout) {
    return <CheckoutPage onBack={() => setShowCheckout(false)} />;
  }

  if (showPackageDetail) {
    return <PackageDetailPage onBack={() => setShowPackageDetail(false)} onBuyNow={() => setShowCheckout(true)} />;
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-white mb-4 block">Sort by</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-slate-900 border-slate-700 text-white rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="data">Data Allowance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-white mb-4 block">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={100}
          step={5}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-slate-400">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {category === 'data' && (
        <div>
          <Label className="text-white mb-4 block">Data Allowance</Label>
          <RadioGroup value={dataAllowance} onValueChange={setDataAllowance}>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="up-10gb" id="up-10gb" className="border-slate-600 text-blue-600" />
              <Label htmlFor="up-10gb" className="text-slate-300 cursor-pointer">
                Up to 10 GB
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="10gb-50gb" id="10gb-50gb" className="border-slate-600 text-blue-600" />
              <Label htmlFor="10gb-50gb" className="text-slate-300 cursor-pointer">
                10 GB - 50 GB
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="50gb-100gb" id="50gb-100gb" className="border-slate-600 text-blue-600" />
              <Label htmlFor="50gb-100gb" className="text-slate-300 cursor-pointer">
                50 GB - 100 GB
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unlimited" id="unlimited" className="border-slate-600 text-blue-600" />
              <Label htmlFor="unlimited" className="text-slate-300 cursor-pointer">
                Unlimited
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-8 md:mb-12">
        <h1 className="text-white mb-2">Explore Our Packages</h1>
        <p className="text-slate-400">Find the perfect plan for your needs</p>
      </section>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 border-b border-slate-800 min-w-max">
          <button
            onClick={() => setCategory('data')}
            className={`px-6 py-3 transition-colors border-b-2 ${
              category === 'data'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Data Packages
          </button>
          <button
            onClick={() => setCategory('voice')}
            className={`px-6 py-3 transition-colors border-b-2 ${
              category === 'voice'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Voice Packages
          </button>
          <button
            onClick={() => setCategory('sms')}
            className={`px-6 py-3 transition-colors border-b-2 ${
              category === 'sms'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            SMS Packages
          </button>
          <button
            onClick={() => setCategory('entertainment')}
            className={`px-6 py-3 transition-colors border-b-2 ${
              category === 'entertainment'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Entertainment
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="size-5 text-blue-500" />
              <h3 className="text-white">Filter & Sort</h3>
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-slate-900 border-slate-800 text-white hover:bg-slate-800 rounded-xl"
              >
                <Filter className="size-4 mr-2" />
                Filter & Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-950 border-slate-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-white flex items-center gap-2">
                  <SlidersHorizontal className="size-5 text-blue-500" />
                  Filter & Sort
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Packages Grid */}
        <div className="flex-1">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredPackages.map((pkg, index) => (
              <PackageCard
                key={index}
                pkg={pkg}
                onBuyClick={() => setShowCheckout(true)}
                onDetailsClick={() => setShowPackageDetail(true)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
