import { useState, useRef } from 'react';
import { User, Bell, Database, Shield, CreditCard, Globe, Upload, Camera, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';

export function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [savedState, setSavedState] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = (section: string) => {
    setSavedState(section);
    setTimeout(() => setSavedState(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="data" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black">
            <Database className="w-4 h-4 mr-2" />
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar */}
              <div>
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="relative group">
                    <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        'JD'
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        Upload New
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleRemoveImage}
                        disabled={!profileImage}
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-gray-500 mt-2">
                      JPG, PNG or GIF. Max size 5MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@telco.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="id">Indonesian</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="wib">Western Indonesia Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="bg-black hover:bg-gray-800 gap-2" 
                  onClick={() => handleSave('profile')}
                >
                  {savedState === 'profile' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">Email Notifications</div>
                  <div className="text-gray-500">Receive notifications via email</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">Push Notifications</div>
                  <div className="text-gray-500">Receive push notifications in browser</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">Churn Alerts</div>
                  <div className="text-gray-500">Get notified about high-risk customers</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">Weekly Reports</div>
                  <div className="text-gray-500">Receive weekly summary reports</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">System Updates</div>
                  <div className="text-gray-500">Get notified about system maintenance</div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">Marketing Communications</div>
                  <div className="text-gray-500">Receive product updates and tips</div>
                </div>
                <Switch />
              </div>

              <div className="pt-4">
                <Button 
                  className="bg-black hover:bg-gray-800 gap-2" 
                  onClick={() => handleSave('notifications')}
                >
                  {savedState === 'notifications' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Sources */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Connected Data Sources</CardTitle>
                <Button variant="outline" size="sm">Add Source</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Customer Database', status: 'Connected', lastSync: '2 minutes ago' },
                { name: 'Billing System', status: 'Connected', lastSync: '1 hour ago' },
                { name: 'Network Analytics', status: 'Connected', lastSync: '5 minutes ago' },
                { name: 'CRM Platform', status: 'Error', lastSync: '2 days ago' },
              ].map((source, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-gray-900">{source.name}</div>
                    <div className="text-gray-500">Last sync: {source.lastSync}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full ${
                      source.status === 'Connected' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {source.status}
                    </span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button 
                className="bg-black hover:bg-gray-800 gap-2" 
                onClick={() => handleSave('password')}
              >
                {savedState === 'password' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Updated
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">Enable 2FA</div>
                  <div className="text-gray-500">Add an extra layer of security to your account</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { device: 'Chrome on MacBook Pro', location: 'New York, US', time: 'Active now' },
                { device: 'Safari on iPhone', location: 'New York, US', time: '2 hours ago' },
              ].map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-gray-900">{session.device}</div>
                    <div className="text-gray-500">{session.location} • {session.time}</div>
                  </div>
                  <Button variant="outline" size="sm">Revoke</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
