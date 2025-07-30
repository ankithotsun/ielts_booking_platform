import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ReminderSettings = ({ examDate, userEmail, userPhone }) => {
  const [reminderPreferences, setReminderPreferences] = useState({
    email: true,
    sms: false,
    push: true
  });

  const [reminderTiming, setReminderTiming] = useState([
    { id: '1week', label: '1 week before', enabled: true },
    { id: '3days', label: '3 days before', enabled: true },
    { id: '1day', label: '1 day before', enabled: true },
    { id: '2hours', label: '2 hours before', enabled: false }
  ]);

  const [customReminder, setCustomReminder] = useState({
    enabled: false,
    value: '2',
    unit: 'days'
  });

  const timeUnitOptions = [
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' }
  ];

  const handlePreferenceChange = (type, checked) => {
    setReminderPreferences(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleTimingChange = (timingId, enabled) => {
    setReminderTiming(prev =>
      prev.map(timing =>
        timing.id === timingId ? { ...timing, enabled } : timing
      )
    );
  };

  const handleCustomReminderChange = (field, value) => {
    setCustomReminder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveReminderSettings = () => {
    const settings = {
      preferences: reminderPreferences,
      timing: reminderTiming.filter(t => t.enabled),
      custom: customReminder.enabled ? customReminder : null
    };
    
    console.log('Saving reminder settings:', settings);
    // In a real app, this would save to backend
  };

  const getEnabledRemindersCount = () => {
    const standardCount = reminderTiming.filter(t => t.enabled).length;
    const customCount = customReminder.enabled ? 1 : 0;
    return standardCount + customCount;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-primary" />
          Reminder Settings
        </h3>

        <p className="text-text-secondary text-sm mb-6">
          Set up automatic reminders to ensure you never miss your exam. 
          We'll notify you through your preferred channels.
        </p>

        {/* Notification Methods */}
        <div className="mb-6">
          <h4 className="font-medium text-text-primary mb-3">Notification Methods</h4>
          <div className="space-y-3">
            <Checkbox
              label="Email Notifications"
              description={`Send reminders to ${userEmail}`}
              checked={reminderPreferences.email}
              onChange={(e) => handlePreferenceChange('email', e.target.checked)}
            />
            
            <Checkbox
              label="SMS Notifications"
              description={userPhone ? `Send text messages to ${userPhone}` : 'Phone number not provided'}
              checked={reminderPreferences.sms}
              onChange={(e) => handlePreferenceChange('sms', e.target.checked)}
              disabled={!userPhone}
            />
            
            <Checkbox
              label="Push Notifications"
              description="Browser notifications when you're online"
              checked={reminderPreferences.push}
              onChange={(e) => handlePreferenceChange('push', e.target.checked)}
            />
          </div>
        </div>

        {/* Reminder Timing */}
        <div className="mb-6">
          <h4 className="font-medium text-text-primary mb-3">Reminder Schedule</h4>
          <div className="space-y-2">
            {reminderTiming.map((timing) => (
              <div key={timing.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center">
                  <Checkbox
                    checked={timing.enabled}
                    onChange={(e) => handleTimingChange(timing.id, e.target.checked)}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {timing.label}
                  </span>
                </div>
                <Icon 
                  name={timing.enabled ? "Check" : "Minus"} 
                  size={16} 
                  className={timing.enabled ? "text-success" : "text-text-secondary"} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Reminder */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-text-primary">Custom Reminder</h4>
            <Checkbox
              checked={customReminder.enabled}
              onChange={(e) => handleCustomReminderChange('enabled', e.target.checked)}
            />
          </div>
          
          {customReminder.enabled && (
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <span className="text-sm text-text-secondary">Remind me</span>
              <input
                type="number"
                min="1"
                max="30"
                value={customReminder.value}
                onChange={(e) => handleCustomReminderChange('value', e.target.value)}
                className="w-16 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Select
                options={timeUnitOptions}
                value={customReminder.unit}
                onChange={(value) => handleCustomReminderChange('unit', value)}
                className="w-24"
              />
              <span className="text-sm text-text-secondary">before exam</span>
            </div>
          )}
        </div>

        {/* Summary and Save */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-text-secondary">
              <Icon name="Info" size={16} className="inline mr-1" />
              {getEnabledRemindersCount()} reminder{getEnabledRemindersCount() !== 1 ? 's' : ''} configured
            </div>
            <Button
              variant="default"
              onClick={saveReminderSettings}
              iconName="Save"
              iconPosition="left"
              size="sm"
            >
              Save Settings
            </Button>
          </div>

          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-start">
              <Icon name="Clock" size={16} className="mr-2 mt-0.5 text-primary" />
              <div className="text-sm">
                <span className="font-medium text-primary">Next Reminder:</span>
                <span className="text-text-secondary ml-2">
                  {reminderTiming.find(t => t.enabled && t.id === '1week') 
                    ? `1 week before exam (${new Date(new Date(examDate).getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()})`
                    : 'No reminders scheduled'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderSettings;