import { useState } from 'react';
import { Search, Calendar, Filter, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

type PurchaseStatus = 'completed' | 'failed' | 'pending';

interface Purchase {
  id: string;
  packageName: string;
  date: string;
  price: string;
  status: PurchaseStatus;
}

const purchases: Purchase[] = [
  { id: '1', packageName: 'Data Booster 10GB', date: 'October 26, 2023', price: '$15.00', status: 'completed' },
  { id: '2', packageName: 'Unlimited Talk & Text', date: 'September 15, 2023', price: '$25.00', status: 'failed' },
  { id: '3', packageName: 'International Roaming Pass', date: 'August 02, 2023', price: '$30.00', status: 'completed' },
  { id: '4', packageName: 'Data Booster 10GB', date: 'July 28, 2023', price: '$15.00', status: 'completed' },
  { id: '5', packageName: 'Social Media Pass', date: 'July 10, 2023', price: '$10.00', status: 'completed' },
  { id: '6', packageName: 'Weekend Data Pack', date: 'June 22, 2023', price: '$8.00', status: 'completed' },
];

export function PurchaseHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch = purchase.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);

  const getStatusColor = (status: PurchaseStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-white mb-8">Your Purchase History</h1>

      {/* Subscription Alert */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl border border-indigo-700/50 p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 rounded-full p-3 mt-1">
              <RotateCcw className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-white mb-1">You buy the 'Data Booster 10GB' package often.</h3>
              <p className="text-slate-300">Want to subscribe automatically and save 10%?</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 whitespace-nowrap">
            Subscribe Now
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search by package name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-slate-900 border-slate-700 text-white hover:bg-slate-800 rounded-xl gap-2"
          >
            <Calendar className="size-4" />
            <span className="hidden sm:inline">Last 30 days</span>
          </Button>
          <Button
            variant="outline"
            className="bg-slate-900 border-slate-700 text-white hover:bg-slate-800 rounded-xl gap-2"
          >
            <Filter className="size-4" />
            <span className="hidden sm:inline">Status: All</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left p-6 text-slate-400 uppercase tracking-wider text-sm">
                  Package Details
                </th>
                <th className="text-left p-6 text-slate-400 uppercase tracking-wider text-sm">Date</th>
                <th className="text-left p-6 text-slate-400 uppercase tracking-wider text-sm">Price</th>
                <th className="text-left p-6 text-slate-400 uppercase tracking-wider text-sm">Status</th>
                <th className="text-left p-6 text-slate-400 uppercase tracking-wider text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                  <td className="p-6">
                    <p className="text-white">{purchase.packageName}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-slate-300">{purchase.date}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-white">{purchase.price}</p>
                  </td>
                  <td className="p-6">
                    <Badge className={`${getStatusColor(purchase.status)} border capitalize`}>
                      {purchase.status === 'completed' && '● '}
                      {purchase.status === 'failed' && '● '}
                      {purchase.status}
                    </Badge>
                  </td>
                  <td className="p-6">
                    <Button
                      variant="ghost"
                      className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 p-0 h-auto"
                    >
                      <RotateCcw className="size-4 mr-2" />
                      Buy Again
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-800">
          {filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white mb-1">{purchase.packageName}</p>
                  <p className="text-slate-400 text-sm">{purchase.date}</p>
                </div>
                <Badge className={`${getStatusColor(purchase.status)} border capitalize text-xs`}>
                  {purchase.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-white">{purchase.price}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 h-auto p-2"
                >
                  <RotateCcw className="size-4 mr-2" />
                  Buy Again
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <p className="text-slate-400 text-sm">
          Page <span className="text-white">1</span> of <span className="text-white">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-slate-900 border-slate-700 text-white hover:bg-slate-800 disabled:opacity-50 rounded-lg"
          >
            <ChevronLeft className="size-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-slate-900 border-slate-700 text-white hover:bg-slate-800 disabled:opacity-50 rounded-lg"
          >
            Next
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </main>
  );
}
