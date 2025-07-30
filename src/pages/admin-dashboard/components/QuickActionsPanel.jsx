import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 'user-search',
      title: 'User Lookup',
      description: 'Find user by email or ID',
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => console.log('User lookup')
    },
    {
      id: 'manual-booking',
      title: 'Manual Booking',
      description: 'Create booking for user',
      icon: 'UserPlus',
      color: 'text-success',
      bgColor: 'bg-success/10',
      action: () => console.log('Manual booking')
    },
    {
      id: 'schedule-exam',
      title: 'Schedule Exam',
      description: 'Add new exam session',
      icon: 'CalendarPlus',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => console.log('Schedule exam')
    },
    {
      id: 'send-notification',
      title: 'Send Notification',
      description: 'Broadcast to users',
      icon: 'Bell',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      action: () => console.log('Send notification')
    }
  ];

  const systemStats = [
    {
      label: 'System Status',
      value: 'Online',
      status: 'success',
      icon: 'CheckCircle'
    },
    {
      label: 'Active Sessions',
      value: '1,247',
      status: 'info',
      icon: 'Users'
    },
    {
      label: 'Server Load',
      value: '67%',
      status: 'warning',
      icon: 'Activity'
    },
    {
      label: 'Last Backup',
      value: '2 hrs ago',
      status: 'success',
      icon: 'Database'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'info':
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        </div>

        <div className="space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth text-left group"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                <Icon name={action.icon} size={18} className={action.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary">
                  {action.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {action.description}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-text-primary transition-smooth" />
            </button>
          ))}
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Monitor" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">System Overview</h3>
        </div>

        <div className="space-y-4">
          {systemStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={stat.icon} size={16} className={getStatusColor(stat.status)} />
                <span className="text-sm text-text-secondary">{stat.label}</span>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(stat.status)}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Settings" size={14} className="mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Activity" size={20} className="text-secondary" />
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-text-primary">New booking created</p>
              <p className="text-xs text-text-secondary">Sarah Johnson - 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-text-primary">Payment pending</p>
              <p className="text-xs text-text-secondary">Michael Chen - 5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-text-primary">Exam scheduled</p>
              <p className="text-xs text-text-secondary">Admin User - 12 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth>
            <Icon name="Clock" size={14} className="mr-2" />
            View All Activity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;