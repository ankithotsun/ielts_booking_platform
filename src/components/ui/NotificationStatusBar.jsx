import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationStatusBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);

  // Mock notification system - in real app, this would connect to your notification service
  useEffect(() => {
    const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Booking Confirmed',
      message: 'Your IELTS exam has been successfully booked for March 15, 2025.',
      timestamp: new Date(),
      persistent: false,
      actions: [
      { label: 'View Details', action: () => console.log('View booking details') }]

    },
    {
      id: 2,
      type: 'warning',
      title: 'Payment Pending',
      message: 'Complete your payment within 24 hours to secure your exam slot.',
      timestamp: new Date(),
      persistent: true,
      actions: [
      { label: 'Pay Now', action: () => console.log('Navigate to payment') },
      { label: 'Dismiss', action: () => dismissNotification(2) }]

    },
    {
      id: 3,
      type: 'info',
      title: 'Document Upload Required',
      message: 'Please upload your identification documents to complete registration.',
      timestamp: new Date(),
      persistent: true,
      actions: [
      { label: 'Upload', action: () => console.log('Navigate to upload') }]

    }];


    // Simulate receiving notifications
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setCurrentNotification(mockNotifications[0]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const dismissNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    if (currentNotification?.id === notificationId) {
      const remaining = notifications.filter((n) => n.id !== notificationId);
      setCurrentNotification(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const showNextNotification = () => {
    const currentIndex = notifications.findIndex((n) => n.id === currentNotification?.id);
    const nextIndex = (currentIndex + 1) % notifications.length;
    setCurrentNotification(notifications[nextIndex]);
  };

  const showPreviousNotification = () => {
    const currentIndex = notifications.findIndex((n) => n.id === currentNotification?.id);
    const prevIndex = currentIndex === 0 ? notifications.length - 1 : currentIndex - 1;
    setCurrentNotification(notifications[prevIndex]);
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          icon: 'CheckCircle',
          iconColor: 'text-success',
          titleColor: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          icon: 'AlertTriangle',
          iconColor: 'text-warning',
          titleColor: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          border: 'border-error/20',
          icon: 'AlertCircle',
          iconColor: 'text-error',
          titleColor: 'text-error'
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          icon: 'Info',
          iconColor: 'text-primary',
          titleColor: 'text-primary'
        };
    }
  };

  if (!currentNotification || notifications.length === 0) {
    return null;
  }

  const styles = getNotificationStyles(currentNotification.type);
  const hasMultiple = notifications.length > 1;

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 ${styles.bg} ${styles.border} border-b`}>
      <div className="max-w-7xl mx-auto px-6 py-3 hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Icon name={styles.icon} size={20} className={styles.iconColor} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className={`text-sm font-semibold ${styles.titleColor}`}>
                  {currentNotification.title}
                </h4>
                {hasMultiple &&
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {notifications.findIndex((n) => n.id === currentNotification.id) + 1} of {notifications.length}
                  </span>
                }
              </div>
              <p className="text-sm text-text-secondary mt-0.5 truncate">
                {currentNotification.message}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {/* Navigation for multiple notifications */}
            {hasMultiple &&
            <div className="hidden sm:flex items-center space-x-1">
                <Button
                variant="ghost"
                size="sm"
                onClick={showPreviousNotification}
                className="h-8 w-8 p-0">

                  <Icon name="ChevronLeft" size={14} />
                </Button>
                <Button
                variant="ghost"
                size="sm"
                onClick={showNextNotification}
                className="h-8 w-8 p-0">

                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            }

            {/* Action buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {currentNotification.actions?.map((action, index) =>
              <Button
                key={index}
                variant={index === 0 ? "default" : "ghost"}
                size="sm"
                onClick={action.action}
                className="text-xs">

                  {action.label}
                </Button>
              )}
            </div>

            {/* Dismiss button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissNotification(currentNotification.id)}
              className="h-8 w-8 p-0">

              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>

        {/* Mobile action buttons */}
        {currentNotification.actions &&
        <div className="md:hidden flex items-center space-x-2 mt-2 pt-2 border-t border-border/50">
            {currentNotification.actions.map((action, index) =>
          <Button
            key={index}
            variant={index === 0 ? "default" : "ghost"}
            size="sm"
            onClick={action.action}
            className="text-xs">

                {action.label}
              </Button>
          )}
          </div>
        }
      </div>
    </div>);

};

export default NotificationStatusBar;