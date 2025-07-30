import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import NotificationStatusBar from '../../components/ui/NotificationStatusBar';
import AdminQuickActionsPanel from '../../components/ui/AdminQuickActionsPanel';
import AuthContextSwitcher from '../../components/ui/AuthContextSwitcher';
import DashboardSidebar from './components/DashboardSidebar';
import KPICards from './components/KPICards';
import BookingStatusChart from './components/BookingStatusChart';
import RecentBookingsTable from './components/RecentBookingsTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('admin');

  const handleRoleSwitch = (roleId) => {
    setCurrentUserRole(roleId);
    console.log('Switching to role:', roleId);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - IELTS Booking Platform</title>
        <meta name="description" content="Comprehensive admin dashboard for managing IELTS exam bookings, users, and system operations" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <BookingProgressIndicator />
        <NotificationStatusBar />
        
        <div className="flex pt-16">
          {/* Sidebar */}
          <DashboardSidebar 
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <div className="p-6">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
                  <p className="text-text-secondary mt-1">
                    Welcome back! Here's what's happening with your IELTS booking platform.
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <AuthContextSwitcher 
                    currentUserRole={currentUserRole}
                    onRoleSwitch={handleRoleSwitch}
                  />
                  <Button variant="default">
                    <Icon name="Download" size={16} className="mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Left Column - Main Content (3 cols) */}
                <div className="xl:col-span-3 space-y-6">
                  {/* KPI Cards */}
                  <KPICards />

                  {/* Charts Section */}
                  <BookingStatusChart />

                  {/* Recent Bookings Table */}
                  <RecentBookingsTable />
                </div>

                {/* Right Column - Quick Actions Panel (1 col) */}
                <div className="xl:col-span-1">
                  <QuickActionsPanel />
                </div>
              </div>

              {/* Additional Insights Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <Icon name="TrendingUp" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Growth Metrics</h3>
                      <p className="text-sm text-text-secondary">Monthly performance</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">New Registrations</span>
                      <span className="text-sm font-medium text-success">+23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Booking Conversion</span>
                      <span className="text-sm font-medium text-success">+15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Revenue Growth</span>
                      <span className="text-sm font-medium text-success">+18%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                      <Icon name="AlertTriangle" size={20} className="text-warning" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Alerts & Issues</h3>
                      <p className="text-sm text-text-secondary">Requires attention</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} className="text-warning" />
                      <span className="text-sm text-text-primary">12 pending payments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="FileX" size={14} className="text-error" />
                      <span className="text-sm text-text-primary">3 document verifications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} className="text-primary" />
                      <span className="text-sm text-text-primary">5 schedule conflicts</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                      <Icon name="Target" size={20} className="text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Monthly Goals</h3>
                      <p className="text-sm text-text-secondary">Progress tracking</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-text-secondary">Bookings Target</span>
                        <span className="text-sm font-medium text-text-primary">847/1000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '84.7%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-text-secondary">Revenue Target</span>
                        <span className="text-sm font-medium text-text-primary">$24.5K/$30K</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '81.7%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminQuickActionsPanel />
      </div>
    </>
  );
};

export default AdminDashboard;