import { Users, TrendingUp, TrendingDown, DollarSign, ArrowUp, ArrowDown, Target, UserCheck, FileText, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const statsCards = [
  {
    title: 'Total Customers',
    value: '124,563',
    change: '+12.5% vs last month',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Active Users',
    value: '98,234',
    change: '+6.2% vs last month',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Churn Rate',
    value: '3.2%',
    change: '-0.8% vs last month',
    trend: 'down',
    icon: TrendingDown,
  },
  {
    title: 'Revenue This Month',
    value: '$2.4M',
    change: '+15.3% vs last month',
    trend: 'up',
    icon: DollarSign,
  },
];

const behaviorData = [
  { month: 'Jan', phone: 4200, sms: 2800, data: 3200, vod: 1500 },
  { month: 'Feb', phone: 4400, sms: 2600, data: 3400, vod: 1600 },
  { month: 'Mar', phone: 4100, sms: 2700, data: 3600, vod: 1800 },
  { month: 'Apr', phone: 4300, sms: 2500, data: 3800, vod: 2000 },
  { month: 'May', phone: 4600, sms: 2900, data: 4000, vod: 2200 },
  { month: 'Jun', phone: 5000, sms: 2800, data: 4200, vod: 2400 },
];

const segmentData = [
  { name: 'Premium', value: 32, color: '#1a1a1a' },
  { name: 'Regular', value: 48, color: '#4a4a4a' },
  { name: 'Low Usage', value: 15, color: '#9a9a9a' },
  { name: 'At Risk', value: 5, color: '#d0d0d0' },
];

const recentActivities = [
  { id: 1, name: 'Sarah Johnson', action: 'Upgraded to Premium Plan', time: '5 minutes ago', type: 'positive' },
  { id: 2, name: 'Mike Chen', action: 'Submitted support ticket', time: '15 minutes ago', type: 'neutral' },
  { id: 3, name: 'Emma Davis', action: 'High churn risk detected', time: '1 hour ago', type: 'negative' },
  { id: 4, name: 'Alex Kumar', action: 'Renewed annual subscription', time: '2 hours ago', type: 'positive' },
  { id: 5, name: 'Lisa Anderson', action: 'Added VOD package', time: '3 hours ago', type: 'positive' },
];

const topProducts = [
  { rank: 1, name: 'Unlimited Data Plan', subscribers: '45,234', revenue: '$542K' },
  { rank: 2, name: 'Family Bundle', subscribers: '32,145', revenue: '$385K' },
  { rank: 3, name: 'Premium Voice', subscribers: '28,567', revenue: '$314K' },
  { rank: 4, name: 'Video Streaming Add-on', subscribers: '19,876', revenue: '$198K' },
];

// Data untuk target offers
const targetOfferSummary = [
  { offer: 'Premium Upgrade', count: 3247 },
  { offer: 'Data Add-on', count: 5832 },
  { offer: 'Family Plan', count: 2145 },
  { offer: 'Student Special', count: 1876 },
];

export function DashboardHome() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="mb-2">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, John Doe • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            View Trends
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-all hover:border-gray-400">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-gray-500">{stat.title}</div>
                  <div className="p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
                <div className="mb-2">{stat.value}</div>
                <div className={`flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-gray-600">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Behavior Overview */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Customer Behavior Overview</CardTitle>
              <Badge variant="outline">Last 6 Months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={behaviorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="phone" stroke="#1a1a1a" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sms" stroke="#4a4a4a" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="data" stroke="#7a7a7a" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="vod" stroke="#aaaaaa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Customer Segments</CardTitle>
              <Badge variant="outline">Distribution</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {segmentData.map((segment) => (
                <div key={segment.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                    <span className="text-gray-700">{segment.name}</span>
                  </div>
                  <span>{segment.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activities</CardTitle>
              <Badge variant="outline">Real-time</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'positive' ? 'bg-green-500' :
                    activity.type === 'negative' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900">{activity.name}</p>
                    <p className="text-gray-500">{activity.action}</p>
                  </div>
                  <span className="text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Badge variant="outline">Best Sellers</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.rank} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    {product.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900">{product.name}</div>
                    <div className="text-gray-500">{product.subscribers} subscribers</div>
                  </div>
                  <div className="text-right">
                    <div>{product.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Offers Overview */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <CardTitle>Target Offers Distribution</CardTitle>
            </div>
            <Badge variant="outline">Overview</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={targetOfferSummary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="offer" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#1a1a1a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>System Alerts</CardTitle>
              <Badge variant="destructive">3 New</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'warning', message: 'High churn risk detected in Premium segment', time: '5 min ago', priority: 'high' },
                { type: 'info', message: 'Monthly report generation completed', time: '1 hour ago', priority: 'low' },
                { type: 'warning', message: '23 customers require immediate attention', time: '2 hours ago', priority: 'high' },
                { type: 'success', message: 'System backup completed successfully', time: '3 hours ago', priority: 'low' },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-500' : 
                    alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 mb-1">{alert.message}</div>
                    <div className="text-gray-500">{alert.time}</div>
                  </div>
                  {alert.priority === 'high' && (
                    <Badge variant="outline" className="flex-shrink-0">Action Required</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Quick Actions</CardTitle>
              <Badge variant="outline">Shortcuts</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-50 hover:border-black transition-all">
                <Users className="w-6 h-6 text-gray-700" />
                <span>View Customers</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-50 hover:border-black transition-all">
                <FileText className="w-6 h-6 text-gray-700" />
                <span>Generate Report</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-50 hover:border-black transition-all">
                <TrendingDown className="w-6 h-6 text-gray-700" />
                <span>Churn Analysis</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-50 hover:border-black transition-all">
                <BarChart2 className="w-6 h-6 text-gray-700" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
