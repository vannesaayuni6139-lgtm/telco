import { useState } from 'react';
import { TrendingUp, Hourglass, Sparkles, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const dataUsageByDay = [
  { day: '1-5', usage: 2.5 },
  { day: '6-10', usage: 3.8 },
  { day: '11-15', usage: 5.2 },
  { day: '16-20', usage: 7.1 },
  { day: '21-25', usage: 3.6 },
  { day: '26-30', usage: 0.5 },
];

export function UsageAnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState<'7days' | 'month' | '30days'>('month');

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-white">Usage Analytics</h1>

        {/* Time Period Selector */}
        <div className="flex gap-2">
          <Button
            onClick={() => setTimePeriod('7days')}
            variant={timePeriod === '7days' ? 'default' : 'outline'}
            className={`rounded-full text-sm ${
              timePeriod === '7days'
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-transparent border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Last 7 Days
          </Button>
          <Button
            onClick={() => setTimePeriod('month')}
            variant={timePeriod === 'month' ? 'default' : 'outline'}
            className={`rounded-full text-sm ${
              timePeriod === 'month'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-transparent border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            This Month
          </Button>
          <Button
            onClick={() => setTimePeriod('30days')}
            variant={timePeriod === '30days' ? 'default' : 'outline'}
            className={`rounded-full text-sm ${
              timePeriod === '30days'
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-transparent border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Last 30 Days
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Data Usage Chart */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
            <div className="mb-8">
              <p className="text-slate-400 mb-2">Data Usage (This Billing Cycle)</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-white">15.2 GB</h2>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-emerald-400 text-sm">vs. last month +5.2%</span>
                <TrendingUp className="size-4 text-emerald-400" />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataUsageByDay}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Bar 
                    dataKey="usage" 
                    fill="#60a5fa" 
                    radius={[8, 8, 0, 0]}
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Voice and SMS */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <p className="text-slate-400 mb-4">Voice</p>
              <p className="text-white mb-2">250 / 500 Mins</p>
              <Progress value={50} className="h-2 mb-2" />
              <p className="text-slate-500 text-sm">250 mins remaining</p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <p className="text-slate-400 mb-4">SMS</p>
              <p className="text-white mb-2">800 / 1000 Messages</p>
              <Progress value={80} className="h-2 mb-2" />
              <p className="text-slate-500 text-sm">200 messages remaining</p>
            </div>
          </div>
        </div>

        {/* Right Column - Alerts & Suggestions */}
        <div className="space-y-6">
          {/* Usage Forecast Alert */}
          <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 rounded-2xl border border-amber-700/50 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-amber-500/20 rounded-full p-2">
                <Hourglass className="size-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-amber-300 mb-1">Usage Forecast</h3>
              </div>
            </div>
            <p className="text-white mb-2">
              Your data will run out in <span className="text-amber-400">5 days</span>.
            </p>
            <p className="text-amber-200/80 text-sm">
              Based on your current consumption rate, you may need to top-up soon to stay connected.
            </p>
          </div>

          {/* Smart Suggestion */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-blue-600/20 rounded-full p-2">
                <Sparkles className="size-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white mb-1">Smart Suggestion</h3>
              </div>
            </div>
            <p className="text-white mb-2">Switch to the 25GB plan for better value.</p>
            <p className="text-slate-400 text-sm mb-6">
              Upgrade your plan to get more data and avoid extra charges. It's a simple switch.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              Explore Plans
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-400">Billing cycle ends in</p>
                <p className="text-white">12 days</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-slate-400">Current plan</p>
                <p className="text-blue-400">Unlimited Plus</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-slate-400">Average daily usage</p>
                <p className="text-white">1.2 GB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
