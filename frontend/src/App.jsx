
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react';
import { Home, BarChart3, FileText, Settings, Menu, X } from 'lucide-react';

function App() {
   const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: FileText, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const stats = [
    { label: 'Total Users', value: '12,543', icon: '👥', color: 'bg-blue-500' },
    { label: 'Revenue', value: '$45,231', icon: '💰', color: 'bg-green-500' },
    { label: 'Orders', value: '8,234', icon: '📦', color: 'bg-purple-500' },
    { label: 'Growth', value: '+24%', icon: '📈', color: 'bg-orange-500' },
  ];

  const chartData = [60, 75, 85, 70, 90, 80];
  const trafficData = [
    { label: 'Direct', percentage: 45, color: 'bg-blue-500' },
    { label: 'Organic', percentage: 35, color: 'bg-green-500' },
    { label: 'Referral', percentage: 20, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">Dashboard</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                item.active ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="px-8 py-6">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Here's what's happening with your data today.</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="text-4xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1 - Monthly Sales */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Sales</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {chartData.map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-600">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>

            {/* Chart 2 - Traffic by Source */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic by Source</h3>
              <div className="space-y-6">
                {trafficData.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { user: 'John Doe', action: 'Completed purchase', time: '2 mins ago', status: 'Success' },
                    { user: 'Jane Smith', action: 'Updated profile', time: '5 mins ago', status: 'Pending' },
                    { user: 'Bob Johnson', action: 'Logged in', time: '10 mins ago', status: 'Success' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{row.user}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.action}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.time}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Success' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App
