import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { label: 'Home', path: '/home-page', icon: 'Home' },
    { label: 'Book Exam', path: '/exam-booking', icon: 'Calendar' },
    { label: 'Payment', path: '/payment-processing', icon: 'CreditCard' },
    { label: 'Confirmation', path: '/booking-confirmation', icon: 'CheckCircle' }
  ];

  const secondaryNavItems = [
    { label: 'Admin Dashboard', path: '/admin-dashboard', icon: 'Settings' },
    { label: 'Exam Management', path: '/exam-scheduling-management', icon: 'Users' }
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/home-page" className="flex items-center space-x-3" onClick={closeMobileMenu}>
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-text-primary">IELTS</span>
            <span className="text-xs text-text-secondary -mt-1">Booking Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {primaryNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMoreMenu}
              className={`flex items-center space-x-2 ${isMoreMenuOpen ? 'bg-muted' : ''}`}
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
              <Icon name="ChevronDown" size={14} className={`transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-md shadow-moderate z-10">
                <div className="py-1">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-smooth ${
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
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="border-t border-border my-2"></div>
            
            {secondaryNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;