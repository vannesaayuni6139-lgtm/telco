import { AlertTriangle, TrendingDown, TrendingUp, Phone, Mail, Gift, Percent, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const kpiCards = [
  {
    title: 'Overall Churn Rate',
    value: '3.2%',
    change: '-0.8% vs last month',
    trend: 'down',
    icon: TrendingDown,
  },
  {
    title: 'Monthly Churn Trend',
    value: '2.9%',
    change: 'Improving',
    trend: 'down',
    icon: TrendingUp,
  },
  {
    title: 'Predicted Next Month',
    value: '2.7%',
    change: 'Expected decrease',
    trend: 'down',
    icon: AlertTriangle,
  },
  {
    title: 'Prevention Success Rate',
    value: '68%',
    change: '+5% vs last month',
    trend: 'up',
    icon: TrendingUp,
  },
];

const churnFactors = [
  { factor: 'Low usage', contribution: 32 },
  { factor: 'High complaints', contribution: 24 },
  { factor: 'Plan dissatisfaction', contribution: 18 },
  { factor: 'Competition', contribution: 12 },
  { factor: 'Price sensitivity', contribution: 10 },
  { factor: 'Technical issues', contribution: 4 },
];

const atRiskCustomers = [
  {
    id: 'C001236',
    name: 'Emma Davis',
    riskScore: 92,
    factors: ['Low usage', 'High complaints'],
    plan: 'Standard Data',
    lastContact: '5 days ago',
  },
  {
    id: 'C001289',
    name: 'Robert Martinez',
    riskScore: 87,
    factors: ['Plan dissatisfaction', 'Price sensitivity'],
    plan: 'Premium Voice',
    lastContact: '3 days ago',
  },
  {
    id: 'C001312',
    name: 'Jennifer Wong',
    riskScore: 85,
    factors: ['Competition', 'Low usage'],
    plan: 'Basic Data',
    lastContact: '1 week ago',
  },
  {
    id: 'C001423',
    name: 'David Brown',
    riskScore: 78,
    factors: ['Technical issues', 'High complaints'],
    plan: 'Family Bundle',
    lastContact: '2 days ago',
  },
  {
    id: 'C001567',
    name: 'Maria Garcia',
    riskScore: 74,
    factors: ['Price sensitivity', 'Plan dissatisfaction'],
    plan: 'Unlimited Data',
    lastContact: '4 days ago',
  },
];

const riskSegments = [
  { level: 'High Risk', count: 1247, percentage: 5, color: 'bg-red-500' },
  { level: 'Medium Risk', count: 3741, percentage: 15, color: 'bg-yellow-500' },
  { level: 'Low Risk', count: 12456, percentage: 50, color: 'bg-green-500' },
  { level: 'Safe', count: 7485, percentage: 30, color: 'bg-blue-500' },
];

export function ChurnAnalysis() {

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="mb-2">Churn Analysis</h1>
          <p className="text-gray-500">Identify at-risk customers and prevent churn proactively</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <TrendingDown className="w-4 h-4" />
            View Trends
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:shadow-md transition-all hover:border-gray-400">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-gray-500">{kpi.title}</div>
                  <div className={`p-2.5 rounded-lg ${
                    kpi.trend === 'down' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      kpi.trend === 'down' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                </div>
                <div className="mb-2">{kpi.value}</div>
                <div className="text-gray-600">{kpi.change}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Risk Segmentation */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Risk Segmentation</CardTitle>
            <Badge variant="outline">Risk Analysis</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskSegments.map((segment) => (
              <div key={segment.level}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                    <span className="text-gray-900">{segment.level}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">{segment.count.toLocaleString()} customers</span>
                    <span>{segment.percentage}%</span>
                  </div>
                </div>
                <Progress value={segment.percentage} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Churn Factors */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Churn Contributing Factors</CardTitle>
            <Badge variant="outline">Impact Analysis</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={churnFactors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis type="category" dataKey="factor" stroke="#6b7280" width={150} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="contribution" fill="#1a1a1a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* At-Risk Customers */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>At-Risk Customers</CardTitle>
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="w-3 h-3" />
              Requires Attention
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atRiskCustomers.map((customer) => {
              return (
                <div
                  key={customer.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-black hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Customer Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4>{customer.name}</h4>
                          <p className="text-gray-500 font-mono">{customer.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-500">Risk Score</div>
                          <div className={`${
                            customer.riskScore >= 85 ? 'text-red-600' : 
                            customer.riskScore >= 75 ? 'text-yellow-600' : 
                            'text-gray-900'
                          }`}>
                            {customer.riskScore}/100
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={customer.riskScore} 
                        className={`h-2 mb-3 ${
                          customer.riskScore >= 85 ? '[&>div]:bg-red-500' : 
                          customer.riskScore >= 75 ? '[&>div]:bg-yellow-500' : 
                          '[&>div]:bg-gray-500'
                        }`}
                      />
                      
                      {/* Risk Assessment */}
                      {customer.riskScore >= 75 && (
                        <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-red-900">High Risk Alert</span>
                          </div>
                          <div className="text-red-700">
                            Customer shows multiple churn indicators. Immediate retention action recommended.
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-gray-500">Risk Factors:</span>
                        {customer.factors.map((factor, idx) => (
                          <Badge key={idx} variant="secondary">{factor}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-4 text-gray-600">
                        <span>Plan: {customer.plan}</span>
                        <span>•</span>
                        <span>Last contact: {customer.lastContact}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-2">
                      <Button size="sm" className="bg-black hover:bg-gray-800 gap-2 flex-1 md:flex-initial">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2 flex-1 md:flex-initial">
                        <Mail className="w-4 h-4" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Retention Actions Panel */}
      <Card className="bg-gradient-to-br from-gray-50 to-white">
        <CardHeader>
          <CardTitle>Retention Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-100 hover:border-black transition-all">
              <Gift className="w-6 h-6 text-gray-700" />
              <span>Send Special Offer</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-100 hover:border-black transition-all">
              <Phone className="w-6 h-6 text-gray-700" />
              <span>Schedule Call</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-100 hover:border-black transition-all">
              <TrendingUp className="w-6 h-6 text-gray-700" />
              <span>Suggest Upgrade</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-100 hover:border-black transition-all">
              <Percent className="w-6 h-6 text-gray-700" />
              <span>Apply Discount</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Retention Strategies Performance */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Retention Strategies Performance</CardTitle>
            <Badge variant="outline">Last 3 Months</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { strategy: 'Loyalty Discount Program', success: 78, attempts: 245, saved: 191 },
              { strategy: 'Personalized Offers', success: 65, attempts: 182, saved: 118 },
              { strategy: 'Customer Success Calls', success: 82, attempts: 156, saved: 128 },
              { strategy: 'Service Upgrade', success: 55, attempts: 134, saved: 74 },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4>{item.strategy}</h4>
                  <Badge variant="secondary">{item.success}% Success Rate</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div>
                    <div className="text-gray-500">Attempts</div>
                    <div>{item.attempts}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Customers Saved</div>
                    <div className="text-green-600">{item.saved}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Impact</div>
                    <div>${(item.saved * 45).toLocaleString()}</div>
                  </div>
                </div>
                <Progress value={item.success} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Churn Prevention Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Top Churn Indicators</CardTitle>
              <Badge variant="outline">Watch For</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { indicator: 'Decreasing usage trend', severity: 'high', percentage: 85 },
                { indicator: 'Multiple complaints', severity: 'high', percentage: 78 },
                { indicator: 'Price sensitivity', severity: 'medium', percentage: 65 },
                { indicator: 'Low engagement', severity: 'medium', percentage: 58 },
                { indicator: 'Competitor inquiries', severity: 'high', percentage: 92 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-gray-900">{item.indicator}</span>
                  </div>
                  <div className="text-gray-600">{item.percentage}% churn rate</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Recommended Actions</CardTitle>
              <Badge variant="outline">Priorities</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Contact high-risk premium customers', priority: 'urgent', count: 23 },
                { action: 'Review pricing for at-risk segment', priority: 'high', count: 45 },
                { action: 'Launch retention campaign', priority: 'high', count: 89 },
                { action: 'Improve customer support response', priority: 'medium', count: 12 },
                { action: 'Analyze competitor offerings', priority: 'medium', count: 1 },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-gray-900 flex-1">{item.action}</span>
                    <Badge variant={
                      item.priority === 'urgent' ? 'destructive' : 
                      item.priority === 'high' ? 'default' : 'secondary'
                    }>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="text-gray-600">
                    {item.count} {item.count === 1 ? 'item' : 'items'} pending
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
