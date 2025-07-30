import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminQuickActionsPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Only show on admin pages
  const isAdminPage = location.pathname.includes('/admin') || location.pathname.includes('/exam-scheduling-management');
  
  if (!isAdminPage) {
    return null;
  }

  const quickActions = [
    {
      id: 'user-lookup',
      label: 'User Lookup',
      description: 'Find user by email or ID',
      icon: 'Search',
      action: () => console.log('User lookup'),
      shortcut: 'Ctrl+F'
    },
    {
      id: 'new-booking',
      label: 'Create Booking',
      description: 'Manual booking creation',
      icon: 'Plus',
      action: () => console.log('New booking'),
      shortcut: 'Ctrl+N'
    },
    {
      id: 'exam-schedule',
      label: 'Schedule Exam',
      description: 'Add new exam session',
      icon: 'Calendar',
      action: () => console.log('Schedule exam'),
      shortcut: 'Ctrl+S'
    },
    {
      id: 'bulk-actions',
      label: 'Bulk Actions',
      description: 'Process multiple items',
      icon: 'List',
      action: () => console.log('Bulk actions'),
      shortcut: 'Ctrl+B'
    },
    {
      id: 'reports',
      label: 'Generate Report',
      description: 'Export data and analytics',
      icon: 'FileText',
      action: () => console.log('Generate report'),
      shortcut: 'Ctrl+R'
    },
    {
      id: 'notifications',
      label: 'Send Notification',
      description: 'Broadcast to users',
      icon: 'Bell',
      action: () => console.log('Send notification'),
      shortcut: 'Ctrl+M'
    }
  ];

  const filteredActions = quickActions.filter(action =>
    action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Desktop Sidebar Panel */}
      <div className="hidden lg:block fixed right-6 top-24 w-72 bg-card border border-border rounded-lg shadow-moderate z-30">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-accent" />
              <h3 className="text-sm font-semibold text-text-primary">Quick Actions</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={togglePanel}>
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} />
            </Button>
          </div>

          {isExpanded && (
            <>
              <div className="relative mb-4">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1 max-h-80 overflow-y-auto">
                {filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 p-3 text-left rounded-md hover:bg-muted transition-smooth group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded group-hover:bg-primary/20 transition-smooth">
                      <Icon name={action.icon} size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary">
                        {action.label}
                      </div>
                      <div className="text-xs text-text-secondary truncate">
                        {action.description}
                      </div>
                    </div>
                    <div className="text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-smooth">
                      {action.shortcut}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <Button
          variant="default"
          size="icon"
          onClick={togglePanel}
          className="w-14 h-14 rounded-full shadow-moderate"
        >
          <Icon name={isExpanded ? "X" : "Zap"} size={20} />
        </Button>

        {isExpanded && (
          <div className="absolute bottom-16 right-0 w-64 bg-card border border-border rounded-lg shadow-moderate">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {quickActions.slice(0, 4).map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.action();
                      setIsExpanded(false);
                    }}
                    className="w-full flex items-center space-x-3 p-2 text-left rounded-md hover:bg-muted transition-smooth"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded">
                      <Icon name={action.icon} size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary">
                        {action.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminQuickActionsPanel;