import React from 'react';
import Icon from '../../../components/AppIcon';

const ExamLevelSelector = ({ selectedLevel, onLevelSelect }) => {
  const examLevels = [
    {
      id: 'A1',
      name: 'A1 - Beginner',
      description: 'Basic user level with simple phrases and everyday expressions',
      difficulty: 'Beginner',
      duration: '2 hours',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'A2',
      name: 'A2 - Elementary',
      description: 'Elementary level with basic communication in familiar situations',
      difficulty: 'Elementary',
      duration: '2.5 hours',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'B1',
      name: 'B1 - Intermediate',
      description: 'Intermediate level with clear communication on familiar topics',
      difficulty: 'Intermediate',
      duration: '3 hours',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      iconColor: 'text-yellow-600',
      badgeColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'B2',
      name: 'B2 - Upper Intermediate',
      description: 'Upper intermediate with complex text understanding and fluent interaction',
      difficulty: 'Upper Intermediate',
      duration: '3.5 hours',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'C1',
      name: 'C1 - Advanced',
      description: 'Advanced level with effective use in social, academic and professional contexts',
      difficulty: 'Advanced',
      duration: '4 hours',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'C2',
      name: 'C2 - Proficient',
      description: 'Proficient level with easy understanding of virtually everything',
      difficulty: 'Proficient',
      duration: '4.5 hours',
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600',
      badgeColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'D1',
      name: 'D1 - Expert',
      description: 'Expert level with sophisticated language use and cultural understanding',
      difficulty: 'Expert',
      duration: '5 hours',
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      iconColor: 'text-indigo-600',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 'D2',
      name: 'D2 - Mastery',
      description: 'Mastery level with native-like proficiency and academic excellence',
      difficulty: 'Mastery',
      duration: '5.5 hours',
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
      iconColor: 'text-gray-600',
      badgeColor: 'bg-gray-100 text-gray-800'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Select Your Exam Level</h2>
        <p className="text-text-secondary">Choose the IELTS proficiency level that matches your current abilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {examLevels.map((level) => (
          <div
            key={level.id}
            onClick={() => onLevelSelect(level.id)}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedLevel === level.id
                ? 'border-primary bg-primary/5 shadow-moderate'
                : level.color
            }`}
          >
            {selectedLevel === level.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}

            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedLevel === level.id ? 'bg-primary/10' : 'bg-white'
              }`}>
                <Icon 
                  name="GraduationCap" 
                  size={24} 
                  className={selectedLevel === level.id ? 'text-primary' : level.iconColor} 
                />
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-1 ${
                  selectedLevel === level.id ? 'text-primary' : 'text-text-primary'
                }`}>
                  {level.name}
                </h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  selectedLevel === level.id ? 'bg-primary/10 text-primary' : level.badgeColor
                }`}>
                  {level.difficulty}
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {level.description}
              </p>

              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>{level.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamLevelSelector;