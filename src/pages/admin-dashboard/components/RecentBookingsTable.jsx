import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentBookingsTable = () => {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const recentBookings = [
    {
      id: 'BK001',
      studentName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      examType: 'IELTS Academic',
      level: 'B2',
      date: '2025-01-15',
      time: '09:00 AM',
      status: 'confirmed',
      payment: 'paid',
      amount: '$215'
    },
    {
      id: 'BK002',
      studentName: 'Michael Chen',
      email: 'michael.chen@email.com',
      examType: 'IELTS General',
      level: 'C1',
      date: '2025-01-15',
      time: '02:00 PM',
      status: 'pending',
      payment: 'pending',
      amount: '$215'
    },
    {
      id: 'BK003',
      studentName: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      examType: 'IELTS Academic',
      level: 'A2',
      date: '2025-01-16',
      time: '10:30 AM',
      status: 'confirmed',
      payment: 'paid',
      amount: '$215'
    },
    {
      id: 'BK004',
      studentName: 'David Kim',
      email: 'david.kim@email.com',
      examType: 'IELTS General',
      level: 'B1',
      date: '2025-01-16',
      time: '03:30 PM',
      status: 'cancelled',
      payment: 'refunded',
      amount: '$215'
    },
    {
      id: 'BK005',
      studentName: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      examType: 'IELTS Academic',
      level: 'C2',
      date: '2025-01-17',
      time: '11:00 AM',
      status: 'confirmed',
      payment: 'paid',
      amount: '$215'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      pending: { color: 'bg-warning/10 text-warning', icon: 'Clock' },
      cancelled: { color: 'bg-error/10 text-error', icon: 'XCircle' },
      completed: { color: 'bg-primary/10 text-primary', icon: 'Check' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const getPaymentBadge = (payment) => {
    const paymentConfig = {
      paid: { color: 'bg-success/10 text-success', icon: 'CreditCard' },
      pending: { color: 'bg-warning/10 text-warning', icon: 'Clock' },
      failed: { color: 'bg-error/10 text-error', icon: 'AlertCircle' },
      refunded: { color: 'bg-secondary/10 text-secondary', icon: 'RotateCcw' }
    };

    const config = paymentConfig[payment] || paymentConfig.pending;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{payment}</span>
      </span>
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedBookings(recentBookings.map(booking => booking.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (bookingId, checked) => {
    if (checked) {
      setSelectedBookings(prev => [...prev, bookingId]);
    } else {
      setSelectedBookings(prev => prev.filter(id => id !== bookingId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return 'ArrowUpDown';
    }
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Recent Bookings</h3>
            <p className="text-sm text-text-secondary">Latest exam bookings and their status</p>
          </div>
          <div className="flex items-center space-x-2">
            {selectedBookings.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">
                  {selectedBookings.length} selected
                </span>
                <Button variant="outline" size="sm">
                  <Icon name="Mail" size={14} className="mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={14} className="mr-2" />
                  Export
                </Button>
              </div>
            )}
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={14} className="mr-2" />
              Filter
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Plus" size={14} className="mr-2" />
              New Booking
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedBookings.length === recentBookings.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Booking ID</span>
                  <Icon name={getSortIcon('id')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('studentName')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Student</span>
                  <Icon name={getSortIcon('studentName')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('examType')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Exam Details</span>
                  <Icon name={getSortIcon('examType')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Date & Time</span>
                  <Icon name={getSortIcon('date')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-text-secondary">Status</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-text-secondary">Payment</span>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-text-secondary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.id)}
                    onChange={(e) => handleSelectBooking(booking.id, e.target.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-primary">{booking.id}</span>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{booking.studentName}</div>
                    <div className="text-xs text-text-secondary">{booking.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{booking.examType}</div>
                    <div className="text-xs text-text-secondary">Level: {booking.level}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{booking.date}</div>
                    <div className="text-xs text-text-secondary">{booking.time}</div>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(booking.status)}
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    {getPaymentBadge(booking.payment)}
                    <div className="text-xs font-medium text-text-primary">{booking.amount}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing 5 of 247 bookings
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={14} className="mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <Icon name="ChevronRight" size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBookingsTable;