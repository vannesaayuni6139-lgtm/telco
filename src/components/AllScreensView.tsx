import { SplashScreen } from './SplashScreen';
import { LoginScreen } from './LoginScreen';
import { DashboardHome } from './pages/DashboardHome';
import { CustomerAnalytics } from './pages/CustomerAnalytics';
import { ProductRecommendations } from './pages/ProductRecommendations';
import { ChurnAnalysis } from './pages/ChurnAnalysis';
import { Reports } from './pages/Reports';
import { SettingsPage } from './pages/SettingsPage';

export function AllScreensView() {
  return (
    <div className="w-full">
      {/* Screen 1: Splash Screen */}
      <section id="screen-splash" className="w-full h-screen border-b-4 border-black">
        <div className="absolute top-8 left-8 bg-black text-white px-4 py-2 rounded-lg z-10">
          Screen 1: Splash Screen
        </div>
        <SplashScreen />
      </section>

      {/* Screen 2: Login Screen */}
      <section id="screen-login" className="w-full h-screen border-b-4 border-black">
        <div className="absolute top-8 left-8 bg-black text-white px-4 py-2 rounded-lg z-10">
          Screen 2: Login Screen
        </div>
        <LoginScreen onLogin={() => {}} />
      </section>

      {/* Screen 3: Dashboard Home */}
      <section id="screen-dashboard" className="w-full min-h-screen bg-gray-50 border-b-4 border-black">
        <div className="sticky top-0 w-full bg-black text-white px-8 py-4 z-10">
          <h2 className="text-white">Screen 3: Dashboard / Home</h2>
        </div>
        <DashboardHome />
      </section>

      {/* Screen 4: Customer Analytics */}
      <section id="screen-customer-analytics" className="w-full min-h-screen bg-gray-50 border-b-4 border-black">
        <div className="sticky top-0 w-full bg-black text-white px-8 py-4 z-10">
          <h2 className="text-white">Screen 4: Customer Analytics</h2>
        </div>
        <CustomerAnalytics />
      </section>

      {/* Screen 5: Product Recommendations */}
      <section id="screen-product-recommendations" className="w-full min-h-screen bg-gray-50 border-b-4 border-black">
        <div className="sticky top-0 w-full bg-black text-white px-8 py-4 z-10">
          <h2 className="text-white">Screen 5: Product Recommendations</h2>
        </div>
        <ProductRecommendations />
      </section>

      {/* Screen 6: Churn Analysis */}
      <section id="screen-churn-analysis" className="w-full min-h-screen bg-gray-50 border-b-4 border-black">
        <div className="sticky top-0 w-full bg-black text-white px-8 py-4 z-10">
          <h2 className="text-white">Screen 6: Churn Analysis</h2>
        </div>
        <ChurnAnalysis />
      </section>

      {/* Screen 7: Reports */}
      <section id="screen-reports" className="w-full min-h-screen bg-gray-50 border-b-4 border-black">
        <div className="sticky top-0 w-full bg-black text-white px-8 py-4 z-10">
          <h2 className="text-white">Screen 7: Reports</h2>
        </div>
        <Reports />
      </section>

      {/* Screen 8: Settings */}
      <section id="screen-settings" className="w-full min-h-screen bg-gray-50 border-b-4 border-black">
        <div className="sticky top-0 w-full bg-black text-white px-8 py-4 z-10">
          <h2 className="text-white">Screen 8: Settings</h2>
        </div>
        <SettingsPage />
      </section>
    </div>
  );
}
