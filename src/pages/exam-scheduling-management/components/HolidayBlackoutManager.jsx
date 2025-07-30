import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HolidayBlackoutManager = ({ isOpen, onClose, onAddBlackout }) => {
  const [blackoutForm, setBlackoutForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    type: 'holiday',
    description: '',
    recurring: false,
    recurrencePattern: 'yearly'
  });

  const [existingBlackouts] = useState([
    {
      id: 1,
      title: "New Year's Day",
      startDate: "2025-01-01",
      endDate: "2025-01-01",
      type: "holiday",
      description: "Public holiday - No exams scheduled",
      recurring: true,
      recurrencePattern: "yearly"
    },
    {
      id: 2,
      title: "System Maintenance",
      startDate: "2025-02-15",
      endDate: "2025-02-16",
      type: "maintenance",
      description: "Scheduled system maintenance and updates",
      recurring: false
    },
    {
      id: 3,
      title: "Staff Training",
      startDate: "2025-03-10",
      endDate: "2025-03-12",
      type: "training",
      description: "Annual staff training program",
      recurring: true,
      recurrencePattern: "yearly"
    },
    {
      id: 4,
      title: "Independence Day",
      startDate: "2025-07-04",
      endDate: "2025-07-04",
      type: "holiday",
      description: "National holiday - Center closed",
      recurring: true,
      recurrencePattern: "yearly"
    }
  ]);

  const blackoutTypes = [
    { value: 'holiday', label: 'Public Holiday' },
    { value: 'maintenance', label: 'System Maintenance' },
    { value: 'training', label: 'Staff Training' },
    { value: 'emergency', label: 'Emergency Closure' },
    { value: 'other', label: 'Other' }
  ];

  const recurrencePatterns = [
    { value: 'yearly', label: 'Yearly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blackoutForm.title && blackoutForm.startDate && blackoutForm.endDate) {
      const newBlackout = {
        ...blackoutForm,
        id: Date.now()
      };
      onAddBlackout(newBlackout);
      setBlackoutForm({
        title: '',
        startDate: '',
        endDate: '',
        type: 'holiday',
        description: '',
        recurring: false,
        recurrencePattern: 'yearly'
      });
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'holiday': return 'Calendar';
      case 'maintenance': return 'Settings';
      case 'training': return 'GraduationCap';
      case 'emergency': return 'AlertTriangle';
      default: return 'Clock';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'holiday': return 'text-success';
      case 'maintenance': return 'text-warning';
      case 'training': return 'text-primary';
      case 'emergency': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-moderate w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Ban" size={24} className="text-error" />
            <h2 className="text-xl font-semibold text-text-primary">Holiday & Blackout Management</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Add New Blackout */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Add New Blackout Period</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                type="text"
                placeholder="e.g., Christmas Day"
                value={blackoutForm.title}
                onChange={(e) => setBlackoutForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />

              <Select
                label="Type"
                options={blackoutTypes}
                value={blackoutForm.type}
                onChange={(value) => setBlackoutForm(prev => ({ ...prev, type: value }))}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start Date"
                  type="date"
                  value={blackoutForm.startDate}
                  onChange={(e) => setBlackoutForm(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
                <Input
                  label="End Date"
                  type="date"
                  value={blackoutForm.endDate}
                  onChange={(e) => setBlackoutForm(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </div>

              <Input
                label="Description"
                type="text"
                placeholder="Additional notes about this blackout period"
                value={blackoutForm.description}
                onChange={(e) => setBlackoutForm(prev => ({ ...prev, description: e.target.value }))}
              />

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={blackoutForm.recurring}
                  onChange={(e) => setBlackoutForm(prev => ({ ...prev, recurring: e.target.checked }))}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-text-primary">
                  Recurring blackout period
                </label>
              </div>

              {blackoutForm.recurring && (
                <Select
                  label="Recurrence Pattern"
                  options={recurrencePatterns}
                  value={blackoutForm.recurrencePattern}
                  onChange={(value) => setBlackoutForm(prev => ({ ...prev, recurrencePattern: value }))}
                />
              )}

              <Button type="submit" variant="default" className="w-full">
                Add Blackout Period
              </Button>
            </form>
          </div>

          {/* Existing Blackouts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Existing Blackout Periods</h3>
              <span className="text-sm text-text-secondary">{existingBlackouts.length} periods</span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {existingBlackouts.map((blackout) => (
                <div key={blackout.id} className="p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon 
                        name={getTypeIcon(blackout.type)} 
                        size={20} 
                        className={getTypeColor(blackout.type)} 
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-text-primary">{blackout.title}</h4>
                        <p className="text-xs text-text-secondary mt-1">{blackout.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-text-secondary">
                            {new Date(blackout.startDate).toLocaleDateString()} - {new Date(blackout.endDate).toLocaleDateString()}
                          </span>
                          {blackout.recurring && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {blackout.recurrencePattern}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" iconName="Edit" />
                      <Button variant="ghost" size="sm" iconName="Trash2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Common Holidays */}
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold text-text-primary mb-3">Quick Add Common Holidays</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Christmas Day
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Thanksgiving
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Easter Sunday
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Labor Day
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/50">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default">
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HolidayBlackoutManager;