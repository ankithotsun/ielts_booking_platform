import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SlotDetailsPanel = ({ selectedSlot, onSlotUpdate, onSlotDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  if (!selectedSlot) {
    return (
      <div className="w-full h-full bg-card border-l border-border flex items-center justify-center">
        <div className="text-center space-y-3">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-medium text-text-primary">No Slot Selected</h3>
            <p className="text-sm text-text-secondary">Click on a calendar slot to view details</p>
          </div>
        </div>
      </div>
    );
  }

  const startEditing = () => {
    setEditForm({ ...selectedSlot });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditForm({});
    setIsEditing(false);
  };

  const saveChanges = () => {
    onSlotUpdate(editForm);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    const percentage = (selectedSlot.currentBookings / selectedSlot.capacity) * 100;
    if (percentage >= 100) return 'text-error';
    if (percentage >= 80) return 'text-warning';
    return 'text-success';
  };

  const getStatusText = () => {
    const percentage = (selectedSlot.currentBookings / selectedSlot.capacity) * 100;
    if (percentage >= 100) return 'Full';
    if (percentage >= 80) return 'Nearly Full';
    return 'Available';
  };

  const mockBookings = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      email: "sarah.j@email.com",
      bookingTime: "2025-01-20T10:30:00Z",
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      email: "m.chen@email.com",
      bookingTime: "2025-01-20T11:00:00Z",
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      id: 3,
      studentName: "Emma Wilson",
      email: "emma.w@email.com",
      bookingTime: "2025-01-20T11:30:00Z",
      status: "pending",
      paymentStatus: "pending"
    }
  ];

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

  return (
    <div className="w-full h-full bg-card border-l border-border overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Slot Details</h2>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={startEditing} iconName="Edit">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onSlotDelete(selectedSlot.id)} iconName="Trash2">
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={cancelEditing}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={saveChanges}>
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">Basic Information</h3>
          
          {isEditing ? (
            <div className="space-y-3">
              <Select
                label="Exam Type"
                options={examTypes}
                value={editForm.examType}
                onChange={(value) => setEditForm(prev => ({ ...prev, examType: value }))}
              />
              
              <Select
                label="Exam Level"
                options={examLevels}
                value={editForm.examLevel}
                onChange={(value) => setEditForm(prev => ({ ...prev, examLevel: value }))}
              />
              
              <Input
                label="Date"
                type="date"
                value={editForm.date}
                onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Start Time"
                  type="time"
                  value={editForm.startTime}
                  onChange={(e) => setEditForm(prev => ({ ...prev, startTime: e.target.value }))}
                />
                <Input
                  label="End Time"
                  type="time"
                  value={editForm.endTime}
                  onChange={(e) => setEditForm(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
              
              <Input
                label="Capacity"
                type="number"
                min="1"
                max="50"
                value={editForm.capacity}
                onChange={(e) => setEditForm(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Exam Type:</span>
                <span className="text-sm font-medium text-text-primary capitalize">{selectedSlot.examType}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Level:</span>
                <span className="text-sm font-medium text-text-primary">{selectedSlot.examLevel}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Date:</span>
                <span className="text-sm font-medium text-text-primary">
                  {new Date(selectedSlot.start).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Time:</span>
                <span className="text-sm font-medium text-text-primary">
                  {new Date(selectedSlot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                  {new Date(selectedSlot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Location:</span>
                <span className="text-sm font-medium text-text-primary">{selectedSlot.location || 'Room A'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Capacity & Status */}
        <div className="space-y-4 border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-text-primary">Capacity & Status</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Status:</span>
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Bookings:</span>
              <span className="text-sm font-medium text-text-primary">
                {selectedSlot.currentBookings} / {selectedSlot.capacity}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  (selectedSlot.currentBookings / selectedSlot.capacity) >= 1 ? 'bg-error' :
                  (selectedSlot.currentBookings / selectedSlot.capacity) >= 0.8 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${Math.min((selectedSlot.currentBookings / selectedSlot.capacity) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current Bookings */}
        <div className="space-y-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Current Bookings</h3>
            <Button variant="outline" size="sm" iconName="Plus">
              Add Booking
            </Button>
          </div>
          
          <div className="space-y-2">
            {mockBookings.slice(0, selectedSlot.currentBookings).map((booking) => (
              <div key={booking.id} className="p-3 bg-muted rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{booking.studentName}</div>
                    <div className="text-xs text-text-secondary">{booking.email}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium ${
                      booking.status === 'confirmed' ? 'text-success' : 'text-warning'
                    }`}>
                      {booking.status}
                    </div>
                    <div className={`text-xs ${
                      booking.paymentStatus === 'paid' ? 'text-success' : 'text-warning'
                    }`}>
                      {booking.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {selectedSlot.currentBookings === 0 && (
              <div className="text-center py-8">
                <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No bookings yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-text-primary">Quick Actions</h3>
          
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" iconName="Mail" className="justify-start">
              Send Reminder Emails
            </Button>
            <Button variant="outline" size="sm" iconName="Copy" className="justify-start">
              Duplicate Slot
            </Button>
            <Button variant="outline" size="sm" iconName="Calendar" className="justify-start">
              Reschedule All Bookings
            </Button>
            <Button variant="outline" size="sm" iconName="Ban" className="justify-start">
              Cancel Slot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotDetailsPanel;