import { useState } from 'react';
import { Search, TrendingUp, Zap, Shield, Wifi, Star, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const recentCustomers = [
  { id: 'C001234', name: 'Sarah Johnson', segment: 'Premium', plan: 'Unlimited Data', avgDataUsage: 45.2, avgSpending: 79.99 },
  { id: 'C001235', name: 'Mike Chen', segment: 'Regular', plan: 'Basic Voice', avgDataUsage: 12.5, avgSpending: 39.99 },
  { id: 'C001236', name: 'Emma Davis', segment: 'At Risk', plan: 'Standard Data', avgDataUsage: 8.3, avgSpending: 29.99 },
];

const recommendations = [
  {
    id: 1,
    name: 'Premium Voice Package',
    icon: Zap,
    price: '$49.99/month',
    matchScore: 95,
    benefits: ['Unlimited calls', 'HD voice quality', '24/7 priority support', 'Free roaming'],
    category: 'Voice',
    subscribers: '28,567'
  },
  {
    id: 2,
    name: 'Unlimited Data Pro',
    icon: Wifi,
    price: '$79.99/month',
    matchScore: 88,
    benefits: ['Unlimited 5G data', 'No throttling', 'Hotspot included', '50GB cloud storage'],
    category: 'Data',
    subscribers: '45,234'
  },
  {
    id: 3,
    name: 'Family Protection Plan',
    icon: Shield,
    price: '$34.99/month',
    matchScore: 82,
    benefits: ['5 lines included', 'Parental controls', 'Device insurance', 'Shared data pool'],
    category: 'Family',
    subscribers: '32,145'
  },
];

const alternativeProducts = [
  { name: 'Basic Data Plan', price: '$29.99', match: 65 },
  { name: 'Voice & SMS Bundle', price: '$39.99', match: 72 },
  { name: 'Business Premium', price: '$99.99', match: 68 },
  { name: 'Student Special', price: '$24.99', match: 58 },
];

export function ProductRecommendations() {
  const [selectedCustomer, setSelectedCustomer] = useState(recentCustomers[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="mb-2">Product Recommendations</h1>
          <p className="text-gray-500">Data-driven product suggestions for optimal customer value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Customer Search */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Recent Customers */}
            <div>
              <h4 className="mb-3 text-gray-500">Recent Customers</h4>
              <div className="space-y-2">
                {recentCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedCustomer.id === customer.id
                        ? 'bg-black text-white border-black'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={selectedCustomer.id === customer.id ? 'text-white' : 'text-gray-900'}>
                      {customer.name}
                    </div>
                    <div className={`flex items-center gap-2 mt-1 ${
                      selectedCustomer.id === customer.id ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      <span className="font-mono">{customer.id}</span>
                      <span>•</span>
                      <span>{customer.segment}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Segment */}
            <div>
              <h4 className="mb-3 text-gray-500">Filter by Segment</h4>
              <div className="space-y-2">
                {['All Customers', 'Premium', 'Regular', 'At Risk'].map((segment) => (
                  <button
                    key={segment}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    {segment}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-600 text-white rounded-full flex items-center justify-center text-xl">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3>{selectedCustomer.name}</h3>
                  <p className="text-gray-500 font-mono">{selectedCustomer.id}</p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <div className="text-gray-500">Current Plan</div>
                      <div>{selectedCustomer.plan}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Usage Summary</div>
                      <div>2,847 mins / month</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Churn Risk</div>
                      <Badge variant={selectedCustomer.segment === 'At Risk' ? 'destructive' : 'default'}>
                        {selectedCustomer.segment === 'At Risk' ? 'High' : 'Low'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2>Recommended Products</h2>
              <Badge variant="outline">Personalized</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {recommendations.map((product) => {
                const Icon = product.icon;
                return (
                  <Card key={product.id} className="hover:shadow-md transition-all hover:border-gray-400">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-black to-gray-600 text-white rounded-xl">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3>{product.name}</h3>
                                <Badge variant="secondary">{product.category}</Badge>
                              </div>
                              <div className="text-gray-900">{product.price}</div>
                              <div className="text-gray-500 mt-1">{product.subscribers} active subscribers</div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-500">Compatibility</div>
                              <div className="flex items-center gap-1 text-green-600">
                                <Star className="w-4 h-4 fill-current" />
                                {product.matchScore}%
                              </div>
                            </div>
                          </div>
                          <Progress value={product.matchScore} className="h-2 mb-4" />
                          <div className="mb-4">
                            <h4 className="text-gray-500 mb-2">Key Features</h4>
                            <ul className="grid grid-cols-2 gap-2">
                              {product.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-black hover:bg-gray-800">View Details</Button>
                            <Button variant="outline" className="flex-1">Compare Plans</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Alternative Products */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Other Available Plans</CardTitle>
                <Badge variant="outline">Alternatives</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alternativeProducts.map((product, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-black hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div>{product.name}</div>
                      <Badge variant="secondary">{product.match}% match</Badge>
                    </div>
                    <div className="text-gray-900 mb-3">{product.price}</div>
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Insights */}
          <Card className="bg-gradient-to-br from-gray-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2">Analysis Summary</h4>
                <p className="text-gray-600">
                  Based on {selectedCustomer.name}'s usage patterns (Avg data: {selectedCustomer.avgDataUsage}GB, 
                  Monthly spending: ${selectedCustomer.avgSpending}), these products offer the best value and features 
                  aligned with their current consumption behavior.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-gray-500 mb-1">Satisfaction Rate</div>
                  <div className="text-green-600">94%</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-gray-500 mb-1">Avg. Revenue</div>
                  <div className="text-green-600">+$30/mo</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-gray-500 mb-1">Retention</div>
                  <div className="text-green-600">+15%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
