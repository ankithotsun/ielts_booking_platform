import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AuthContextSwitcher = ({ currentUserRole = 'student', onRoleSwitch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userRoles = [
    {
      id: 'student',
      label: 'Student Portal',
      description: 'Book exams and manage bookings',
      icon: 'GraduationCap',
      color: 'text-primary'
    },
    {
      id: 'admin',
      label: 'Admin Portal',
      description: 'Manage exams and users',
      icon: 'Settings',
      color: 'text-accent'
    }
  ];

  const currentRole = userRoles.find(role => role.id === currentUserRole);
  const otherRoles = userRoles.filter(role => role.id !== currentUserRole);

  const handleRoleSwitch = (roleId) => {
    setIsDropdownOpen(false);
    if (onRoleSwitch) {
      onRoleSwitch(roleId);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 ${isDropdownOpen ? 'bg-muted' : ''}`}
      >
        <div className={`flex items-center justify-center w-6 h-6 rounded ${currentRole?.color === 'text-primary' ? 'bg-primary/10' : 'bg-accent/10'}`}>
          <Icon name={currentRole?.icon} size={14} className={currentRole?.color} />
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs font-medium text-text-primary">{currentRole?.label}</span>
          <span className="text-xs text-text-secondary -mt-0.5">{currentRole?.description}</span>
        </div>
        <Icon name="ChevronDown" size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-popover border border-border rounded-md shadow-moderate z-20">
          <div className="py-2">
            <div className="px-3 py-2 border-b border-border">
              <div className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Switch Context
              </div>
            </div>
            
            {otherRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSwitch(role.id)}
                className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-muted transition-smooth"
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded ${role.color === 'text-primary' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                  <Icon name={role.icon} size={16} className={role.color} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">
                    {role.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {role.description}
                  </div>
                </div>
                <Icon name="ArrowRight" size={14} className="text-text-secondary" />
              </button>
            ))}
            
            <div className="border-t border-border mt-2 pt-2">
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted transition-smooth"
              >
                <Icon name="LogOut" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthContextSwitcher;