import { useMemo } from 'react';
import { AreaChart, BarChart, LineChart } from '../../ui/chart';
import { Card } from '../../ui/card';

const sampleDailyUsage = Array.from({ length: 14 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  used: Math.round(2 + Math.random() * 5),
}));

const sampleAppUsage = [
  { name: 'YouTube', percent: 32 },
  { name: 'Instagram', percent: 18 },
  { name: 'Web Browsing', percent: 22 },
  { name: 'Spotify', percent: 9 },
  { name: 'Other', percent: 19 },
];

export function UsageAnalyticsPage() {
  const totalUsed = useMemo(() => sampleDailyUsage.reduce((s, p) => s + p.used, 0), []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-white">Usage Analytics</h1>
          <p className="text-slate-400 text-sm">Understand how you use data and which apps consume the most.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 bg-slate-900 border border-slate-800">
          <h3 className="text-white mb-2">Total Data Used (last 14 days)</h3>
          <div className="text-4xl font-bold text-white mb-2">{totalUsed} GB</div>
          <p className="text-slate-400 text-sm">Average {Math.round(totalUsed / sampleDailyUsage.length * 10) / 10} GB/day</p>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 lg:col-span-2">
          <h3 className="text-white mb-4">Daily Data Usage</h3>
          <div className="h-48">
            {/* Placeholder chart using AreaChart from ui/chart - it gracefully degrades if not implemented */}
            <AreaChart data={sampleDailyUsage.map((d) => ({ x: d.day, y: d.used }))} />
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800">
          <h3 className="text-white mb-3">Top App Usage</h3>
          <div className="space-y-3">
            {sampleAppUsage.map((a) => (
              <div key={a.name} className="flex items-center justify-between gap-2">
                <div className="text-slate-300">{a.name}</div>
                <div className="flex items-center gap-3 w-40">
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-indigo-600 to-pink-500`} style={{ width: `${a.percent}%` }} />
                  </div>
                  <div className="text-white text-sm w-10 text-right">{a.percent}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 lg:col-span-3">
          <h3 className="text-white mb-3">Suggestions & Actions</h3>
          <div className="text-slate-300 text-sm">Based on your activity, we recommend enabling background data saver for non-essential apps and try our Data Booster 10GB package when you’re close to hitting your cap.</div>
        </Card>
      </div>
    </main>
  );
}
