import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = () => {
  const kpiData = [
    {
      id: 'daily-bookings',
      title: 'Today\'s Bookings',
      value: '47',
      change: '+12%',
      changeType: 'positive',
      icon: 'Calendar',
      description: 'vs yesterday',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'revenue',
      title: 'Revenue (This Month)',
      value: '$24,580',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'vs last month',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'capacity',
      title: 'Capacity Utilization',
      value: '78%',
      change: '-3%',
      changeType: 'negative',
      icon: 'Users',
      description: 'vs last week',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'upcoming',
      title: 'Upcoming Exams',
      value: '156',
      change: '+5%',
      changeType: 'positive',
      icon: 'GraduationCap',
      description: 'next 7 days',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-card border border-border rounded-lg p-6 shadow-subtle hover:shadow-moderate transition-smooth"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${kpi.bgColor}`}>
              <Icon name={kpi.icon} size={24} className={kpi.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(kpi.changeType)}`}>
              <Icon name={getChangeIcon(kpi.changeType)} size={16} />
              <span className="font-medium">{kpi.change}</span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-text-primary">
              {kpi.value}
            </h3>
            <p className="text-sm font-medium text-text-primary">
              {kpi.title}
            </p>
            <p className="text-xs text-text-secondary">
              {kpi.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;