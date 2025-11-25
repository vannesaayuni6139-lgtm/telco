import { FileText, Download, Calendar, Plus, MoreVertical, Clock, BarChart3, FileBarChart, FileSpreadsheet, Presentation, Mail, Filter, Share2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const reportTemplates = [
  {
    id: 1,
    name: 'Executive Summary',
    description: 'High-level overview of key metrics and performance',
    icon: BarChart3,
    category: 'Overview',
  },
  {
    id: 2,
    name: 'Customer Behavior Report',
    description: 'Detailed analysis of customer usage patterns',
    icon: FileBarChart,
    category: 'Analytics',
  },
  {
    id: 3,
    name: 'Churn Analysis Report',
    description: 'Comprehensive churn risk assessment and insights',
    icon: FileText,
    category: 'Analytics',
  },
  {
    id: 4,
    name: 'Product Performance',
    description: 'Product adoption and revenue analysis',
    icon: FileBarChart,
    category: 'Products',
  },
  {
    id: 5,
    name: 'Revenue Report',
    description: 'Financial performance and revenue tracking',
    icon: BarChart3,
    category: 'Financial',
  },
  {
    id: 6,
    name: 'Usage Analytics',
    description: 'Network usage and consumption patterns',
    icon: FileBarChart,
    category: 'Analytics',
  },
];

const scheduledReports = [
  {
    id: 1,
    name: 'Weekly Executive Summary',
    frequency: 'Every Monday',
    recipients: 'management@telco.com',
    lastSent: '2 days ago',
    status: 'active',
  },
  {
    id: 2,
    name: 'Monthly Churn Analysis',
    frequency: 'First day of month',
    recipients: 'analytics-team@telco.com',
    lastSent: '18 days ago',
    status: 'active',
  },
  {
    id: 3,
    name: 'Daily Operations Report',
    frequency: 'Every day at 9:00 AM',
    recipients: 'ops@telco.com',
    lastSent: '12 hours ago',
    status: 'active',
  },
  {
    id: 4,
    name: 'Quarterly Financial Report',
    frequency: 'Every quarter',
    recipients: 'finance@telco.com',
    lastSent: '45 days ago',
    status: 'paused',
  },
];

export function Reports() {

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="mb-2">Reports</h1>
          <p className="text-gray-500">Generate and manage your analytics reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="bg-black hover:bg-gray-800 gap-2">
            <Plus className="w-4 h-4" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h3 className="mb-6">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card key={template.id} className="hover:shadow-md transition-all hover:border-gray-400 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                      <IconComponent className="w-8 h-8 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="truncate">{template.name}</h4>
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                      <p className="text-gray-500 mb-4 line-clamp-2">{template.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-black hover:bg-gray-800">
                          Generate
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Custom Report Builder */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Custom Report Builder</CardTitle>
            <Badge variant="outline">Build Your Own</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="mb-2 text-gray-900">Build Your Custom Report</h4>
            <p className="text-gray-500 mb-4">
              Drag and drop components to create a personalized report
            </p>
            <Button className="bg-black hover:bg-gray-800 gap-2">
              <Plus className="w-4 h-4" />
              Start Building
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Scheduled Reports</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-black hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex-shrink-0">
                    <Calendar className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="truncate">{report.name}</h4>
                      <Badge 
                        variant={report.status === 'active' ? 'default' : 'secondary'}
                        className="flex-shrink-0"
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{report.frequency}</span>
                      </div>
                      <div className="truncate">
                        <span className="text-gray-500">Recipients:</span> {report.recipients}
                      </div>
                      <div className="truncate">
                        <span className="text-gray-500">Last:</span> {report.lastSent}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-shrink-0">
                  <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="px-3">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Export Options</CardTitle>
            <Badge variant="outline">Quick Export</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex-col gap-3 hover:bg-gray-50 hover:border-black transition-all">
              <FileText className="w-8 h-8 text-gray-700" />
              <div>
                <div className="text-gray-900">PDF Report</div>
                <div className="text-gray-500">Formatted document</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-3 hover:bg-gray-50 hover:border-black transition-all">
              <FileSpreadsheet className="w-8 h-8 text-gray-700" />
              <div>
                <div className="text-gray-900">Excel Export</div>
                <div className="text-gray-500">Raw data tables</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-3 hover:bg-gray-50 hover:border-black transition-all">
              <Presentation className="w-8 h-8 text-gray-700" />
              <div>
                <div className="text-gray-900">PowerPoint</div>
                <div className="text-gray-500">Presentation slides</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-3 hover:bg-gray-50 hover:border-black transition-all">
              <Mail className="w-8 h-8 text-gray-700" />
              <div>
                <div className="text-gray-900">Email Delivery</div>
                <div className="text-gray-500">Send directly</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Reports</CardTitle>
            <Badge variant="outline">Last 30 Days</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Monthly Revenue Analysis', date: '2 hours ago', size: '2.4 MB', format: 'PDF', status: 'completed' },
              { name: 'Customer Churn Report Q4', date: 'Yesterday', size: '1.8 MB', format: 'Excel', status: 'completed' },
              { name: 'Product Performance Dashboard', date: '3 days ago', size: '3.2 MB', format: 'PDF', status: 'completed' },
              { name: 'Weekly KPI Summary', date: '5 days ago', size: '950 KB', format: 'Excel', status: 'completed' },
            ].map((report, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate mb-1">{report.name}</h4>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs">
                        {report.format}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500">Total Reports Generated</div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="mb-1">247</div>
            <div className="text-gray-600">+18 this month</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500">Scheduled Reports</div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="mb-1">12 Active</div>
            <div className="text-gray-600">Next run in 2 hours</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500">Storage Used</div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="mb-1">42.8 GB</div>
            <div className="text-gray-600">of 100 GB available</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
