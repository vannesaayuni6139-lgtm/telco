import { useState } from 'react';
import { User, Settings, Bell, Smartphone, HelpCircle, LogOut, Camera, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type ProfileSection = 'profile' | 'preferences' | 'notifications' | 'linked';

export function ProfilePage() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'profile' as ProfileSection, icon: User, label: 'Profile' },
    { id: 'preferences' as ProfileSection, icon: Settings, label: 'Preferences' },
    { id: 'notifications' as ProfileSection, icon: Bell, label: 'Notifications' },
    { id: 'linked' as ProfileSection, icon: Smartphone, label: 'Linked Numbers' },
  ];

  const SidebarContent = () => (
    <>
      <div className="mb-8 p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-slate-800 rounded-full p-2">
            <User className="size-5 text-blue-500" />
          </div>
          <div>
            <p className="text-white">Recall</p>
            <p className="text-slate-500 text-sm">Telco Services</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === item.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="size-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <HelpCircle className="size-5" />
          <span>Support</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <LogOut className="size-5" />
          <span>Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-[calc(100vh-73px)]">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-50"
      >
        {sidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-[calc(100vh-73px)] w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="relative h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-4xl">
        {activeSection === 'profile' && (
          <div className="space-y-8">
            <h1 className="text-white">Profile</h1>

            {/* Profile Photo */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative">
                  <Avatar className="size-20 md:size-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-600 text-white text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                    <Camera className="size-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">Update your photo</h3>
                  <p className="text-slate-400 text-sm">This will be displayed on your profile.</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    defaultValue="John Doe"
                    className="bg-slate-800 border-slate-700 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@recall.com"
                    className="bg-slate-800 border-slate-700 text-white rounded-xl"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'preferences' && (
          <div className="space-y-8">
            <h1 className="text-white">Preferences</h1>

            {/* AI Personalization */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white mb-2">AI Personalization</h3>
                  <p className="text-slate-400 text-sm">
                    Enable to receive tailored suggestions and automated call summaries.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
              </div>
            </div>

            {/* Language */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white mb-2">Language</h3>
                  <p className="text-slate-400 text-sm mb-4">Select your preferred language</p>
                </div>
                <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3">
                  <option>English</option>
                  <option>Bahasa Indonesia</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-8">
            <h1 className="text-white">Notifications</h1>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
              {/* New Voicemail */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-800">
                <div className="flex-1">
                  <h3 className="text-white mb-1">New Voicemail</h3>
                  <p className="text-slate-400 text-sm">Get notified when you receive a new voicemail</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
              </div>

              {/* Promotional Offers */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-800">
                <div className="flex-1">
                  <h3 className="text-white mb-1">Promotional Offers</h3>
                  <p className="text-slate-400 text-sm">Receive special deals and offers from Recall.</p>
                </div>
                <Switch className="data-[state=checked]:bg-blue-600" />
              </div>

              {/* Service Alerts */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white mb-1">Service Alerts</h3>
                  <p className="text-slate-400 text-sm">Important updates about your service and account.</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'linked' && (
          <div className="space-y-8">
            <h1 className="text-white">Linked Numbers</h1>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 rounded-full p-2">
                      <Smartphone className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white">+1 (555) 123-4567</p>
                      <p className="text-slate-400 text-sm">Primary Number</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white rounded-full"
                  >
                    Remove
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent border-slate-700 text-blue-500 hover:bg-slate-800 rounded-xl"
                >
                  + Add New Number
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
