import { useState } from 'react';
import { Filter, Download, Calendar, ChevronDown, ArrowUpDown, User, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, ComposedChart } from 'recharts';

const segmentData = [
  { name: 'Premium Users', value: 32, color: '#1a1a1a' },
  { name: 'Regular Users', value: 48, color: '#4a4a4a' },
  { name: 'Low Usage Users', value: 15, color: '#9a9a9a' },
  { name: 'At Risk Users', value: 5, color: '#d4d4d4' },
];

const usageData = [
  { month: 'Jan', phone: 3800, sms: 2400, data: 2900, vod: 1200 },
  { month: 'Feb', phone: 4100, sms: 2200, data: 3100, vod: 1400 },
  { month: 'Mar', phone: 3900, sms: 2500, data: 3300, vod: 1600 },
  { month: 'Apr', phone: 4200, sms: 2300, data: 3500, vod: 1800 },
  { month: 'May', phone: 4500, sms: 2700, data: 3700, vod: 2000 },
  { month: 'Jun', phone: 4800, sms: 2600, data: 3900, vod: 2200 },
];

const geoData = [
  { region: 'Jakarta', users: 45000 },
  { region: 'Surabaya', users: 32000 },
  { region: 'Bandung', users: 28000 },
  { region: 'Medan', users: 21000 },
  { region: 'Semarang', users: 18000 },
];

// Data penggunaan data vs pengeluaran bulanan
const dataVsSpendingData = [
  { month: 'Jan', dataUsage: 15.2, spending: 29.99 },
  { month: 'Feb', dataUsage: 18.5, spending: 34.99 },
  { month: 'Mar', dataUsage: 22.1, spending: 39.99 },
  { month: 'Apr', dataUsage: 28.4, spending: 44.99 },
  { month: 'May', dataUsage: 35.7, spending: 54.99 },
  { month: 'Jun', dataUsage: 42.3, spending: 64.99 },
  { month: 'Jul', dataUsage: 48.9, spending: 69.99 },
  { month: 'Aug', dataUsage: 52.5, spending: 74.99 },
  { month: 'Sep', dataUsage: 58.2, spending: 79.99 },
  { month: 'Oct', dataUsage: 61.8, spending: 84.99 },
  { month: 'Nov', dataUsage: 65.4, spending: 89.99 },
  { month: 'Dec', dataUsage: 68.1, spending: 94.99 },
];

// Pelanggan berdasarkan target offer
const targetOfferData = [
  { offer: 'Premium Upgrade', count: 3247 },
  { offer: 'Data Add-on', count: 5832 },
  { offer: 'Family Plan', count: 2145 },
  { offer: 'Student Special', count: 1876 },
  { offer: 'Business Package', count: 2934 },
  { offer: 'Loyalty Reward', count: 4123 },
];

const customerData = [
  { 
    id: 'C001234', 
    name: 'Sarah Johnson', 
    segment: 'Premium', 
    package: 'Unlimited Data Pro',
    deviceBrand: 'Samsung',
    avgDataUsage: 45.2,
    callDuration: 2847,
    smsFrequency: 156,
    monthlySpending: 79.99,
    complaints: 0,
    travelScore: 8.5,
    lastActive: '2 hours ago', 
    status: 'active' 
  },
  { 
    id: 'C001235', 
    name: 'Mike Chen', 
    segment: 'Regular', 
    package: 'Basic Voice',
    deviceBrand: 'Apple',
    avgDataUsage: 22.8,
    callDuration: 1523,
    smsFrequency: 89,
    monthlySpending: 39.99,
    complaints: 1,
    travelScore: 5.2,
    lastActive: '1 day ago', 
    status: 'active' 
  },
  { 
    id: 'C001236', 
    name: 'Emma Davis', 
    segment: 'At Risk', 
    package: 'Standard Data',
    deviceBrand: 'Xiaomi',
    avgDataUsage: 8.3,
    callDuration: 342,
    smsFrequency: 23,
    monthlySpending: 29.99,
    complaints: 5,
    travelScore: 2.1,
    lastActive: '5 days ago', 
    status: 'at-risk' 
  },
  { 
    id: 'C001237', 
    name: 'Alex Kumar', 
    segment: 'Premium', 
    package: 'Premium Voice',
    deviceBrand: 'Apple',
    avgDataUsage: 52.7,
    callDuration: 3124,
    smsFrequency: 201,
    monthlySpending: 89.99,
    complaints: 0,
    travelScore: 9.2,
    lastActive: '3 hours ago', 
    status: 'active' 
  },
  { 
    id: 'C001238', 
    name: 'Lisa Anderson', 
    segment: 'Regular', 
    package: 'Family Bundle',
    deviceBrand: 'Samsung',
    avgDataUsage: 31.5,
    callDuration: 1876,
    smsFrequency: 124,
    monthlySpending: 54.99,
    complaints: 2,
    travelScore: 6.8,
    lastActive: '12 hours ago', 
    status: 'active' 
  },
  { 
    id: 'C001239', 
    name: 'Tom Wilson', 
    segment: 'Low Usage', 
    package: 'Basic Plan',
    deviceBrand: 'Oppo',
    avgDataUsage: 5.2,
    callDuration: 645,
    smsFrequency: 34,
    monthlySpending: 19.99,
    complaints: 1,
    travelScore: 3.4,
    lastActive: '3 days ago', 
    status: 'inactive' 
  },
  { 
    id: 'C001240', 
    name: 'Nina Patel', 
    segment: 'Premium', 
    package: 'Unlimited Data Pro',
    deviceBrand: 'Apple',
    avgDataUsage: 48.9,
    callDuration: 2956,
    smsFrequency: 178,
    monthlySpending: 79.99,
    complaints: 0,
    travelScore: 8.7,
    lastActive: '1 hour ago', 
    status: 'active' 
  },
  { 
    id: 'C001241', 
    name: 'Chris Lee', 
    segment: 'Regular', 
    package: 'Standard Voice',
    deviceBrand: 'Samsung',
    avgDataUsage: 27.3,
    callDuration: 1634,
    smsFrequency: 95,
    monthlySpending: 44.99,
    complaints: 1,
    travelScore: 5.9,
    lastActive: '8 hours ago', 
    status: 'active' 
  },
];

export function CustomerAnalytics() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="mb-2">Customer Analytics</h1>
          <p className="text-gray-500">Comprehensive customer behavior and segmentation analysis</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="border-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Filter Options</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700">Time Period</label>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Last 30 days
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-gray-700">Customer Segment</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="low">Low Usage</SelectItem>
                    <SelectItem value="risk">At Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-gray-700">Usage Type</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="vod">VOD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-gray-700">Status</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-6 pt-4 border-t">
              <Button className="flex-1 sm:flex-initial bg-black hover:bg-gray-800 px-8">Apply Filters</Button>
              <Button variant="outline" className="flex-1 sm:flex-initial px-8">Reset All</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Penggunaan Data vs Pengeluaran Bulanan */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Penggunaan Data vs Pengeluaran Bulanan</CardTitle>
              <Badge variant="outline">12 Months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={dataVsSpendingData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="#1a1a1a" 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Data (GB)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#4a4a4a" 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Spending ($)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }}
                  iconType="line"
                />
                <Area 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="dataUsage" 
                  fill="#e5e5e5" 
                  fillOpacity={0.6}
                  stroke="#1a1a1a" 
                  strokeWidth={2.5} 
                  name="Data Usage (GB)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="spending" 
                  stroke="#4a4a4a" 
                  strokeWidth={2.5} 
                  name="Spending ($)" 
                  dot={{ r: 4, fill: '#4a4a4a', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pelanggan Berdasarkan Target Offer */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Pelanggan Berdasarkan Target Offer</CardTitle>
              <Badge variant="outline">By Package</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={targetOfferData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="offer" 
                  stroke="#6b7280" 
                  angle={0} 
                  textAnchor="middle" 
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Customer Segmentation & Geographic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segmentation */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Customer Segmentation</CardTitle>
              <Badge variant="outline">By Segment</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Geographic Distribution</CardTitle>
              <Badge variant="outline">Top Regions</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geoData} layout="horizontal" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="region" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Bar 
                  dataKey="users" 
                  fill="#1a1a1a" 
                  radius={[0, 4, 4, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Usage Patterns Timeline */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Usage Patterns Timeline</CardTitle>
            <Badge variant="outline">6 Months Trend</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="phone" stroke="#1a1a1a" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="sms" stroke="#4a4a4a" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="data" stroke="#7a7a7a" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="vod" stroke="#aaaaaa" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ringkasan Profil Pelanggan */}
      {selectedCustomer && (
        <Card className="border-2 border-black shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-black rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Customer Profile Details</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-600 text-white rounded-full flex items-center justify-center text-xl">
                  {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3>{selectedCustomer.name}</h3>
                  <p className="text-gray-500 font-mono">{selectedCustomer.id}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={selectedCustomer.segment === 'Premium' ? 'default' : 'secondary'}>
                      {selectedCustomer.segment}
                    </Badge>
                    <Badge 
                      variant={
                        selectedCustomer.status === 'active' ? 'default' : 
                        selectedCustomer.status === 'at-risk' ? 'destructive' : 
                        'secondary'
                      }
                    >
                      {selectedCustomer.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Jenis Paket</div>
                <div>{selectedCustomer.package}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Merek Perangkat</div>
                <div>{selectedCustomer.deviceBrand}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Pengeluaran Bulanan</div>
                <div>${selectedCustomer.monthlySpending}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Penggunaan Data</div>
                <div>{selectedCustomer.avgDataUsage} GB/bulan</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Durasi Panggilan</div>
                <div>{selectedCustomer.callDuration} menit/bulan</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Frekuensi SMS</div>
                <div>{selectedCustomer.smsFrequency} SMS/bulan</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Jumlah Keluhan</div>
                <div className={selectedCustomer.complaints > 3 ? 'text-red-600' : 'text-green-600'}>
                  {selectedCustomer.complaints} keluhan
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Travel Score</div>
                <div className="flex items-center gap-2">
                  <span>{selectedCustomer.travelScore}/10</span>
                  <Badge variant={selectedCustomer.travelScore >= 7 ? 'default' : 'secondary'}>
                    {selectedCustomer.travelScore >= 7 ? 'High Mobility' : 'Low Mobility'}
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 mb-1">Last Active</div>
                <div>{selectedCustomer.lastActive}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Data Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Customer Details</CardTitle>
            <Badge variant="outline">{customerData.length} Records</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>
                    <button className="flex items-center gap-1 hover:text-black">
                      Customer ID
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Data (GB)</TableHead>
                  <TableHead>Spending</TableHead>
                  <TableHead>Complaints</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerData.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.package}</TableCell>
                    <TableCell>{customer.deviceBrand}</TableCell>
                    <TableCell>{customer.avgDataUsage}</TableCell>
                    <TableCell>${customer.monthlySpending}</TableCell>
                    <TableCell>
                      <span className={customer.complaints > 3 ? 'text-red-600' : 'text-gray-900'}>
                        {customer.complaints}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          customer.status === 'active' ? 'default' : 
                          customer.status === 'at-risk' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleViewCustomer(customer)}>View Profile</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-gray-500">Showing 1-8 of 124,563 customers</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
