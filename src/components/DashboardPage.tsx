import { TrendingUp, PieChart, Package, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useState } from 'react';
import { CheckoutPage } from './CheckoutPage';

export function DashboardPage() {
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return <CheckoutPage onBack={() => setShowCheckout(false)} />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Greeting */}
      <section className="mb-8 md:mb-12">
        <h1 className="text-white mb-2">Hi, Olivia!</h1>
        <p className="text-slate-400">Here's your personalized insight.</p>
      </section>

      {/* Alert Card */}
      <section className="mb-8 md:mb-12">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="bg-blue-600 rounded-2xl p-6 md:p-8 flex-shrink-0">
            <TrendingUp className="size-12 md:size-16 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-2">Your data usage increased 27% this month.</h3>
            <p className="text-slate-400">
              You've used more data this month compared to your average. Consider upgrading your plan for more value.
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 flex-shrink-0 w-full md:w-auto">
            View Details
          </Button>
        </div>
      </section>

      {/* Usage Summary */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-white mb-6">Usage Summary</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Data Usage */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <div className="mb-4">
              <p className="text-slate-400 mb-2">Data</p>
              <p className="text-white">25.5 GB / 50 GB</p>
            </div>
            <Progress value={51} className="h-2" />
          </div>

          {/* Voice Usage */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <div className="mb-4">
              <p className="text-slate-400 mb-2">Voice</p>
              <p className="text-white">800 / 1000 Mins</p>
            </div>
            <Progress value={80} className="h-2" />
          </div>

          {/* SMS Usage */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <div className="mb-4">
              <p className="text-slate-400 mb-2">SMS</p>
              <p className="text-white">450 / 500 SMS</p>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </div>
      </section>

      {/* Top Picks for You */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-white mb-6">Top Picks for You</h2>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {/* 10GB Data Booster */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-white mb-2">10GB Data Booster</h3>
            <p className="text-slate-400 mb-6">Perfect for a weekend of streaming.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-white">$5</span>
              <span className="text-slate-400">/one-time</span>
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white rounded-full"
              onClick={() => setShowCheckout(true)}
            >
              Learn More
            </Button>
          </div>

          {/* Unlimited Social Pass */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-white mb-2">Unlimited Social Pass</h3>
            <p className="text-slate-400 mb-6">Never miss a moment on your favorite apps.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-white">$10</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white rounded-full"
              onClick={() => setShowCheckout(true)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-white mb-6">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="bg-slate-900 hover:bg-slate-800 border-slate-800 text-white h-auto py-6 rounded-2xl flex items-center justify-start gap-4"
          >
            <div className="bg-slate-800 rounded-full p-3">
              <PieChart className="size-5" />
            </div>
            <span>Check Usage</span>
          </Button>

          <Button
            variant="outline"
            className="bg-slate-900 hover:bg-slate-800 border-slate-800 text-white h-auto py-6 rounded-2xl flex items-center justify-start gap-4"
          >
            <div className="bg-slate-800 rounded-full p-3">
              <Package className="size-5" />
            </div>
            <span>See All Packages</span>
          </Button>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-6 rounded-2xl flex items-center justify-start gap-4 sm:col-span-2 lg:col-span-1">
            <div className="bg-blue-700 rounded-full p-3">
              <MessageSquare className="size-5" />
            </div>
            <span>Talk to AI Assistant</span>
          </Button>
        </div>
      </section>

      {/* Floating AI Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl shadow-blue-500/30 transition-all hover:scale-110">
        <MessageSquare className="size-6" />
      </button>
    </main>
  );
}
