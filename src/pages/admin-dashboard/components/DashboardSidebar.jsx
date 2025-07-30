import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardSidebar = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(['overview']);

  const navigationSections = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      items: [
        { label: 'Dashboard', path: '/admin-dashboard', icon: 'Home' },
        { label: 'Analytics', path: '#', icon: 'BarChart3' }
      ]
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: 'Calendar',
      items: [
        { label: 'All Bookings', path: '#', icon: 'List' },
        { label: 'Pending', path: '#', icon: 'Clock' },
        { label: 'Confirmed', path: '#', icon: 'CheckCircle' },
        { label: 'Cancelled', path: '#', icon: 'XCircle' }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      items: [
        { label: 'All Users', path: '#', icon: 'UserCheck' },
        { label: 'Registrations', path: '#', icon: 'UserPlus' },
        { label: 'Verification', path: '#', icon: 'Shield' }
      ]
    },
    {
      id: 'exams',
      label: 'Exam Management',
      icon: 'GraduationCap',
      items: [
        { label: 'Schedule Exams', path: '/exam-scheduling-management', icon: 'CalendarPlus' },
        { label: 'Exam Types', path: '#', icon: 'BookOpen' },
        { label: 'Time Slots', path: '#', icon: 'Clock3' }
      ]
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: 'CreditCard',
      items: [
        { label: 'Transactions', path: '#', icon: 'Receipt' },
        { label: 'Refunds', path: '#', icon: 'RotateCcw' },
        { label: 'Reports', path: '#', icon: 'FileText' }
      ]
    },
    {
      id: 'system',
      label: 'System',
      icon: 'Settings',
      items: [
        { label: 'Configuration', path: '#', icon: 'Cog' },
        { label: 'Audit Logs', path: '#', icon: 'FileSearch' },
        { label: 'Notifications', path: '#', icon: 'Bell' }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-primary" />
              <span className="font-semibold text-text-primary">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-2">
          {navigationSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => !isCollapsed && toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-2 rounded-md text-sm font-medium transition-smooth ${
                  isCollapsed 
                    ? 'justify-center' 
                    : 'hover:bg-muted text-text-secondary'
                }`}
                title={isCollapsed ? section.label : ''}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={section.icon} size={18} />
                  {!isCollapsed && <span>{section.label}</span>}
                </div>
                {!isCollapsed && (
                  <Icon 
                    name="ChevronDown" 
                    size={14} 
                    className={`transition-transform ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Section Items */}
              {(!isCollapsed && expandedSections.includes(section.id)) && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 p-2 rounded-md text-sm transition-smooth ${
                        isActivePath(item.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Collapsed tooltips */}
              {isCollapsed && (
                <div className="ml-2 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={item.label}
                      className={`flex items-center justify-center w-10 h-10 rounded-md transition-smooth ${
                        isActivePath(item.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={item.icon} size={16} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate">
                Admin User
              </div>
              <div className="text-xs text-text-secondary">
                Super Admin
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;