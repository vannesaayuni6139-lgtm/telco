import { useState } from 'react';
import { 
  Home, Users, ShoppingBag, TrendingDown, FileText, Settings, 
  Search, Bell, Menu, X, Activity, LogOut, User, HelpCircle, Bot
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { DashboardHome } from './pages/DashboardHome';
import { CustomerAnalytics } from './pages/CustomerAnalytics';
import { ProductRecommendations } from './pages/ProductRecommendations';
import { ChurnAnalysis } from './pages/ChurnAnalysis';
import { Reports } from './pages/Reports';
import { SettingsPage } from './pages/SettingsPage';
import { AIAgent } from './pages/AIAgent';

interface DashboardLayoutProps {
  onLogout: () => void;
}

type Page = 'dashboard' | 'customers' | 'products' | 'churn' | 'reports' | 'ai-agent' | 'settings';

const navigation = [
  { id: 'dashboard' as Page, name: 'Dashboard', icon: Home },
  { id: 'customers' as Page, name: 'Customer Analytics', icon: Users },
  { id: 'products' as Page, name: 'Product Recommendations', icon: ShoppingBag },
  { id: 'churn' as Page, name: 'Churn Analysis', icon: TrendingDown },
  { id: 'reports' as Page, name: 'Reports', icon: FileText },
  { id: 'ai-agent' as Page, name: 'AI Agent', icon: Bot },
  { id: 'settings' as Page, name: 'Settings', icon: Settings },
];

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'customers':
        return <CustomerAnalytics />;
      case 'products':
        return <ProductRecommendations />;
      case 'churn':
        return <ChurnAnalysis />;
      case 'reports':
        return <Reports />;
      case 'ai-agent':
        return <AIAgent />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="size-full flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:block p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-black rounded-lg p-1.5">
              <Activity className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="hidden sm:block">
              <div className="tracking-wider">TELCO</div>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-1 pr-3 hover:bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                  <span>JD</span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-gray-900">John Doe</div>
                  <div className="text-gray-500">Admin</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>John Doe</div>
                <div className="text-gray-500">Admin</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentPage('settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar - Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
            <aside
              className="w-64 h-full bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
