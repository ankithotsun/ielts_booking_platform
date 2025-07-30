import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingOptionsSection = () => {
  const bookingOptions = [
    {
      id: 'oral-only',
      title: 'Oral Examination Only',
      description: 'Speaking assessment with certified examiner via one-on-one interview session',
      duration: '11-14 minutes',
      price: '$85',
      features: [
        'Face-to-face speaking test',
        'Real-time assessment',
        'Immediate feedback',
        'Flexible scheduling'
      ],
      icon: 'Mic',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      iconColor: 'text-primary',
      popular: false
    },
    {
      id: 'written-only',
      title: 'Written Examination Only',
      description: 'Comprehensive written assessment covering listening, reading, and writing skills',
      duration: '2 hours 45 minutes',
      price: '$165',
      features: [
        'Listening comprehension',
        'Reading passages',
        'Writing tasks',
        'Computer-based testing'
      ],
      icon: 'PenTool',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      iconColor: 'text-accent',
      popular: false
    },
    {
      id: 'both-exams',
      title: 'Complete IELTS Package',
      description: 'Full IELTS assessment including both oral and written examinations',
      duration: '3 hours total',
      price: '$220',
      originalPrice: '$250',
      features: [
        'Complete skill assessment',
        'Official IELTS certificate',
        'Detailed score report',
        'Priority scheduling'
      ],
      icon: 'Award',
      bgColor: 'bg-success/5',
      borderColor: 'border-success/20',
      iconColor: 'text-success',
      popular: true
    }
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Flexible Booking Options
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Choose the examination format that best suits your needs. All options include 
            secure online booking and instant confirmation.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {bookingOptions.map((option) => (
            <div
              key={option.id}
              className={`relative ${option.bgColor} ${option.borderColor} border-2 rounded-2xl p-8 hover:shadow-moderate transition-smooth ${
                option.popular ? 'ring-2 ring-success/20' : ''
              }`}
            >
              {option.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-success text-success-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${option.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${option.borderColor}`}>
                  <Icon name={option.icon} size={24} className={option.iconColor} />
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {option.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-4">
                  {option.description}
                </p>
                
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-text-primary">
                    {option.price}
                  </span>
                  {option.originalPrice && (
                    <span className="text-lg text-text-secondary line-through">
                      {option.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-text-secondary">
                  <Icon name="Clock" size={14} />
                  <span className="text-sm">{option.duration}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                {option.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className={option.iconColor} />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/exam-booking" className="block">
                <Button
                  variant={option.popular ? "default" : "outline"}
                  size="lg"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Book Now
                </Button>
              </Link>
              
              <div className="text-center mt-4">
                <p className="text-xs text-text-secondary">
                  Free cancellation up to 48 hours before exam
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-muted rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Icon name="Info" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Prerequisites for Partial Bookings</h3>
            </div>
            <p className="text-text-secondary text-sm">
              If booking oral or written examination only, you must upload proof of completion 
              for the other component. This ensures your IELTS certification requirements are met.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingOptionsSection;