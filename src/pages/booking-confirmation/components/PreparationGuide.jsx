import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PreparationGuide = ({ examType }) => {
  const [expandedSection, setExpandedSection] = useState('documents');

  const preparationSections = [
    {
      id: 'documents',
      title: 'Required Documents',
      icon: 'FileText',
      content: [
        'Valid passport or national ID (same as used during registration)',
        'Printed booking confirmation (this page)',
        'Additional photo ID if passport is not available',
        'Any medical documentation if special accommodations were requested'
      ]
    },
    {
      id: 'arrival',
      title: 'Arrival Instructions',
      icon: 'Clock',
      content: [
        'Arrive 30 minutes before your scheduled exam time',
        'Late arrivals (more than 15 minutes) will not be permitted to take the exam',
        'Bring only essential items - storage will be provided for personal belongings',
        'Mobile phones and electronic devices must be switched off and stored'
      ]
    },
    {
      id: 'procedures',
      title: 'Exam Day Procedures',
      icon: 'CheckSquare',
      content: [
        'Check-in at the reception desk with your documents',
        'Photo and fingerprint verification will be conducted',
        'You will be escorted to the examination room',
        'Follow all instructions from the examination staff',
        'Results will be available online within 13 days'
      ]
    },
    {
      id: 'tips',
      title: 'Preparation Tips',
      icon: 'Lightbulb',
      content: [
        'Review sample questions and practice tests online',
        'Ensure you are familiar with the exam format',
        'Get adequate rest the night before your exam',
        'Eat a good breakfast and stay hydrated',
        'Practice time management for each section'
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-primary" />
          Exam Preparation Guide
        </h3>

        <div className="space-y-3">
          {preparationSections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-smooth"
              >
                <div className="flex items-center">
                  <Icon name={section.icon} size={18} className="mr-3 text-primary" />
                  <span className="font-medium text-text-primary">{section.title}</span>
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSection === section.id && (
                <div className="px-4 pb-4">
                  <ul className="space-y-2">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Icon name="Check" size={16} className="mr-2 mt-0.5 text-success flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start">
            <Icon name="Info" size={18} className="mr-3 mt-0.5 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-medium text-primary mb-1">Important Reminder</h4>
              <p className="text-sm text-text-secondary">
                Please read all instructions carefully and arrive well-prepared. 
                Contact our support team if you have any questions about the exam process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationGuide;