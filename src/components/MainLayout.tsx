import { useState } from 'react';
import { BarChart3, Search, Menu, X, Home, Package, User, History, TrendingUp, MessageSquare } from 'lucide-react';
import { PackagesPage } from './PackagesPage';
import { DashboardPage } from './DashboardPage';
import { ProfilePage } from './ProfilePage';
import { PurchaseHistoryPage } from './PurchaseHistoryPage';
import { UsageAnalyticsPage } from './UsageAnalyticsPage';
import { AIAssistantPage } from './AIAssistantPage';
import { PackageDetailPage } from './PackageDetailPage';
import { RecommendedPackagesPage } from './RecommendedPackagesPage';
import { Input } from './ui/input';
import { Button } from './ui/button';

type Page = 'home' | 'packages' | 'usage' | 'history' | 'account' | 'assistant' | 'package-detail' | 'recommended';

export function MainLayout() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <DashboardPage />;
      case 'packages':
        return <PackagesPage />;
      case 'usage':
        return <UsageAnalyticsPage />;
      case 'history':
        return <PurchaseHistoryPage />;
      case 'account':
        return <ProfilePage />;
      case 'assistant':
        return <AIAssistantPage />;
      case 'package-detail':
        return <PackageDetailPage onBack={() => setCurrentPage('packages')} onBuyNow={() => setCurrentPage('packages')} />;
      case 'recommended':
        return <RecommendedPackagesPage onBuyNow={() => setCurrentPage('packages')} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <BarChart3 className="size-6 text-blue-500" />
              <span className="text-xl">Recall</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`transition-colors ${
                  currentPage === 'home' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('packages')}
                className={`transition-colors ${
                  currentPage === 'packages' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Packages
              </button>
              <button
                onClick={() => setCurrentPage('usage')}
                className={`transition-colors ${
                  currentPage === 'usage' ? 'text-blue-500' : 'text-slate-400 hover:text-white'
                }`}
              >
                Usage
              </button>
              <button
                onClick={() => setCurrentPage('history')}
                className={`transition-colors ${
                  currentPage === 'history' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Purchase History
              </button>
              <button
                onClick={() => setCurrentPage('account')}
                className={`transition-colors ${
                  currentPage === 'account' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                My Account
              </button>
            </nav>

            {/* Search & Profile */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 w-48 lg:w-64 rounded-full"
                />
              </div>
              <button
                onClick={() => setCurrentPage('account')}
                className="size-10 rounded-full bg-amber-200 flex items-center justify-center hover:bg-amber-300 transition-colors"
              >
                <span className="text-slate-900">👤</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-slate-400"
              >
                {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-3 border-t border-slate-800 mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 w-full rounded-full"
                />
              </div>
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('packages');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'packages' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Packages
              </button>
              <button
                onClick={() => {
                  setCurrentPage('usage');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'usage' ? 'bg-slate-800 text-blue-500' : 'text-slate-400 hover:text-white'
                }`}
              >
                Usage Analytics
              </button>
              <button
                onClick={() => {
                  setCurrentPage('history');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'history' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Purchase History
              </button>
              <button
                onClick={() => {
                  setCurrentPage('account');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'account' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                My Account
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      {renderPage()}

      {/* Floating AI Assistant Button (except on assistant page) */}
      {currentPage !== 'assistant' && (
        <Button
          onClick={() => setCurrentPage('assistant')}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl shadow-blue-500/30 transition-all hover:scale-110 z-50"
        >
          <MessageSquare className="size-6" />
        </Button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2024 Recall. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Support
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
