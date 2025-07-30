import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SchedulingToolsSidebar = ({ onCreateSlot, onFilterChange, filters }) => {
  const [quickSlotForm, setQuickSlotForm] = useState({
    examType: '',
    examLevel: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: 20,
    location: ''
  });

  const [showBulkScheduling, setShowBulkScheduling] = useState(false);
  const [bulkForm, setBulkForm] = useState({
    pattern: 'weekly',
    startDate: '',
    endDate: '',
    daysOfWeek: [],
    timeSlots: []
  });

  const examTypes = [
    { value: 'oral', label: 'Oral Only' },
    { value: 'written', label: 'Written Only' },
    { value: 'both', label: 'Both (Oral + Written)' }
  ];

  const examLevels = [
    { value: 'A1', label: 'A1 - Beginner' },
    { value: 'A2', label: 'A2 - Elementary' },
    { value: 'B1', label: 'B1 - Intermediate' },
    { value: 'B2', label: 'B2 - Upper Intermediate' },
    { value: 'C1', label: 'C1 - Advanced' },
    { value: 'C2', label: 'C2 - Proficiency' },
    { value: 'D1', label: 'D1 - Expert' },
    { value: 'D2', label: 'D2 - Master' }
  ];

  const locations = [
    { value: 'room-a', label: 'Room A - Main Hall' },
    { value: 'room-b', label: 'Room B - Conference' },
    { value: 'room-c', label: 'Room C - Testing Lab' },
    { value: 'room-d', label: 'Room D - Audio Suite' }
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const handleQuickSlotSubmit = (e) => {
    e.preventDefault();
    if (quickSlotForm.examType && quickSlotForm.examLevel && quickSlotForm.date && quickSlotForm.startTime) {
      onCreateSlot({
        ...quickSlotForm,
        id: Date.now(),
        currentBookings: 0,
        status: 'available'
      });
      setQuickSlotForm({
        examType: '',
        examLevel: '',
        date: '',
        startTime: '',
        endTime: '',
        capacity: 20,
        location: ''
      });
    }
  };

  const handleBulkScheduling = () => {
    console.log('Bulk scheduling:', bulkForm);
    setShowBulkScheduling(false);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full h-full bg-card border-r border-border overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Scheduling Tools</h2>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Slot Creation */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Plus" size={16} />
            <span>Quick Slot Creation</span>
          </h3>
          
          <form onSubmit={handleQuickSlotSubmit} className="space-y-3">
            <Select
              label="Exam Type"
              options={examTypes}
              value={quickSlotForm.examType}
              onChange={(value) => setQuickSlotForm(prev => ({ ...prev, examType: value }))}
              required
            />

            <Select
              label="Exam Level"
              options={examLevels}
              value={quickSlotForm.examLevel}
              onChange={(value) => setQuickSlotForm(prev => ({ ...prev, examLevel: value }))}
              required
            />

            <Input
              label="Date"
              type="date"
              value={quickSlotForm.date}
              onChange={(e) => setQuickSlotForm(prev => ({ ...prev, date: e.target.value }))}
              required
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Start Time"
                type="time"
                value={quickSlotForm.startTime}
                onChange={(e) => setQuickSlotForm(prev => ({ ...prev, startTime: e.target.value }))}
                required
              />
              <Input
                label="End Time"
                type="time"
                value={quickSlotForm.endTime}
                onChange={(e) => setQuickSlotForm(prev => ({ ...prev, endTime: e.target.value }))}
                required
              />
            </div>

            <Input
              label="Capacity"
              type="number"
              min="1"
              max="50"
              value={quickSlotForm.capacity}
              onChange={(e) => setQuickSlotForm(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
              required
            />

            <Select
              label="Location"
              options={locations}
              value={quickSlotForm.location}
              onChange={(value) => setQuickSlotForm(prev => ({ ...prev, location: value }))}
              required
            />

            <Button type="submit" variant="default" className="w-full">
              Create Slot
            </Button>
          </form>
        </div>

        {/* Bulk Scheduling */}
        <div className="space-y-4 border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={() => setShowBulkScheduling(!showBulkScheduling)}
            className="w-full"
            iconName="Repeat"
            iconPosition="left"
          >
            Bulk Scheduling
          </Button>

          {showBulkScheduling && (
            <div className="space-y-3 bg-muted p-3 rounded-md">
              <Select
                label="Pattern"
                options={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' }
                ]}
                value={bulkForm.pattern}
                onChange={(value) => setBulkForm(prev => ({ ...prev, pattern: value }))}
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Start Date"
                  type="date"
                  value={bulkForm.startDate}
                  onChange={(e) => setBulkForm(prev => ({ ...prev, startDate: e.target.value }))}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={bulkForm.endDate}
                  onChange={(e) => setBulkForm(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>

              <Button variant="default" onClick={handleBulkScheduling} className="w-full">
                Generate Slots
              </Button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="space-y-4 border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
          </h3>

          <Select
            label="Filter by Type"
            options={[
              { value: '', label: 'All Types' },
              ...examTypes
            ]}
            value={filters.examType || ''}
            onChange={(value) => handleFilterChange('examType', value)}
          />

          <Select
            label="Filter by Level"
            options={[
              { value: '', label: 'All Levels' },
              ...examLevels
            ]}
            value={filters.examLevel || ''}
            onChange={(value) => handleFilterChange('examLevel', value)}
          />

          <Select
            label="Availability Status"
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'available', label: 'Available' },
              { value: 'full', label: 'Full' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
            value={filters.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <div className="space-y-2">
            <Checkbox
              label="Show only high capacity slots"
              checked={filters.highCapacity || false}
              onChange={(e) => handleFilterChange('highCapacity', e.target.checked)}
            />
            <Checkbox
              label="Show weekend slots"
              checked={filters.weekends || false}
              onChange={(e) => handleFilterChange('weekends', e.target.checked)}
            />
          </div>
        </div>

        {/* Capacity Management */}
        <div className="space-y-4 border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span>Capacity Overview</span>
          </h3>

          <div className="space-y-3">
            <div className="bg-success/10 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-success font-medium">Available Slots</span>
                <span className="text-lg font-bold text-success">24</span>
              </div>
            </div>

            <div className="bg-warning/10 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-warning font-medium">Nearly Full</span>
                <span className="text-lg font-bold text-warning">8</span>
              </div>
            </div>

            <div className="bg-error/10 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-error font-medium">Full Slots</span>
                <span className="text-lg font-bold text-error">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingToolsSidebar;