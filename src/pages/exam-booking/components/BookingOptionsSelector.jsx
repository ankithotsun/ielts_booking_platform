import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingOptionsSelector = ({ selectedOption, onOptionSelect, selectedLevel }) => {
  const bookingOptions = [
    {
      id: 'oral',
      name: 'Oral Only',
      description: 'Speaking test only - Perfect for completing your certification',
      duration: '15-20 minutes',
      price: 85,
      icon: 'Mic',
      features: ['One-on-one interview', 'Real-time assessment', 'Immediate feedback'],
      color: 'border-blue-200 hover:border-blue-300',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'written',
      name: 'Written Only',
      description: 'Reading, writing and listening tests - Comprehensive written assessment',
      duration: '2 hours 45 minutes',
      price: 165,
      icon: 'PenTool',
      features: ['Reading comprehension', 'Writing tasks', 'Listening exercises'],
      color: 'border-green-200 hover:border-green-300',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'both',
      name: 'Both Examinations',
      description: 'Complete IELTS test including all four skills assessment',
      duration: '3 hours',
      price: 230,
      icon: 'BookOpen',
      features: ['All four skills', 'Complete certification', 'Best value option'],
      color: 'border-purple-200 hover:border-purple-300',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      recommended: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-text-primary mb-2">Choose Your Exam Type</h3>
        <p className="text-text-secondary">
          Select the examination format that best suits your needs for {selectedLevel} level
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bookingOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onOptionSelect(option.id)}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-primary bg-primary/5 shadow-moderate'
                : `${option.color} bg-white hover:shadow-subtle`
            }`}
          >
            {option.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Recommended
                </span>
              </div>
            )}

            {selectedOption === option.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedOption === option.id ? 'bg-primary/10' : option.bgColor
                }`}>
                  <Icon 
                    name={option.icon} 
                    size={24} 
                    className={selectedOption === option.id ? 'text-primary' : option.iconColor} 
                  />
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${
                    selectedOption === option.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {option.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Clock" size={14} />
                    <span>{option.duration}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {option.description}
              </p>

              <div className="space-y-2">
                <h5 className="text-sm font-medium text-text-primary">Includes:</h5>
                <ul className="space-y-1">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Exam Fee</span>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${
                      selectedOption === option.id ? 'text-primary' : 'text-text-primary'
                    }`}>
                      ${option.price}
                    </span>
                    <span className="text-sm text-text-secondary ml-1">USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Important Information:</p>
              {selectedOption === 'oral' && (
                <p>You must have completed the written portion of this level to book oral-only examination. You'll need to upload your written exam certificate during booking.</p>
              )}
              {selectedOption === 'written' && (
                <p>You must have completed the oral portion of this level to book written-only examination. You'll need to upload your oral exam certificate during booking.</p>
              )}
              {selectedOption === 'both' && (
                <p>This is the complete IELTS examination covering all four language skills: Reading, Writing, Listening, and Speaking. No prerequisites required.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingOptionsSelector;