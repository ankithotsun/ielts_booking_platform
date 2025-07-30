import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


const BookingStatusChart = () => {
  const weeklyBookingData = [
    { day: 'Mon', confirmed: 45, pending: 12, cancelled: 3 },
    { day: 'Tue', confirmed: 52, pending: 8, cancelled: 5 },
    { day: 'Wed', confirmed: 38, pending: 15, cancelled: 2 },
    { day: 'Thu', confirmed: 61, pending: 9, cancelled: 4 },
    { day: 'Fri', confirmed: 48, pending: 18, cancelled: 6 },
    { day: 'Sat', confirmed: 35, pending: 7, cancelled: 1 },
    { day: 'Sun', confirmed: 29, pending: 5, cancelled: 2 }
  ];

  const statusDistribution = [
    { name: 'Confirmed', value: 308, color: '#059669' },
    { name: 'Pending', value: 74, color: '#D97706' },
    { name: 'Cancelled', value: 23, color: '#DC2626' },
    { name: 'Completed', value: 195, color: '#2563EB' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-moderate">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-secondary capitalize">{entry.dataKey}:</span>
              <span className="font-medium text-text-primary">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-moderate">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.payload.color }}
            ></div>
            <span className="text-sm font-medium text-text-primary">{data.name}</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            {data.value} bookings ({((data.value / 600) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Weekly Bookings Bar Chart */}
      <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Weekly Bookings</h3>
            <p className="text-sm text-text-secondary">Booking status distribution by day</p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-text-secondary">Confirmed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-text-secondary">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-text-secondary">Cancelled</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyBookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="confirmed" fill="#059669" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="#D97706" radius={[2, 2, 0, 0]} />
              <Bar dataKey="cancelled" fill="#DC2626" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Distribution Pie Chart */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Status Distribution</h3>
          <p className="text-sm text-text-secondary">Overall booking status breakdown</p>
        </div>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {statusDistribution.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-text-primary">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">{item.value}</div>
                <div className="text-xs text-text-secondary">
                  {((item.value / 600) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingStatusChart;