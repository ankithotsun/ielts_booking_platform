import React from 'react';
import Icon from '../../../components/AppIcon';

const ExamLevelsGrid = () => {
  const examLevels = [
    {
      id: 'a1',
      level: 'A1',
      title: 'Beginner',
      description: 'Basic understanding of familiar everyday expressions and very basic phrases',
      difficulty: 'Beginner',
      difficultyColor: 'text-success',
      bgColor: 'bg-success/5',
      borderColor: 'border-success/20',
      duration: '2.5 hours',
      skills: ['Basic vocabulary', 'Simple phrases', 'Personal information']
    },
    {
      id: 'a2',
      level: 'A2',
      title: 'Elementary',
      description: 'Understanding of sentences and frequently used expressions in everyday situations',
      difficulty: 'Elementary',
      difficultyColor: 'text-success',
      bgColor: 'bg-success/5',
      borderColor: 'border-success/20',
      duration: '2.5 hours',
      skills: ['Routine tasks', 'Simple exchanges', 'Background information']
    },
    {
      id: 'b1',
      level: 'B1',
      title: 'Intermediate',
      description: 'Understanding of main points on familiar matters regularly encountered',
      difficulty: 'Intermediate',
      difficultyColor: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      duration: '2.5 hours',
      skills: ['Work situations', 'Travel communication', 'Personal interests']
    },
    {
      id: 'b2',
      level: 'B2',
      title: 'Upper Intermediate',
      description: 'Understanding of complex texts on both concrete and abstract topics',
      difficulty: 'Upper Intermediate',
      difficultyColor: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      duration: '2.5 hours',
      skills: ['Technical discussions', 'Fluent interaction', 'Clear explanations']
    },
    {
      id: 'c1',
      level: 'C1',
      title: 'Advanced',
      description: 'Understanding of demanding, longer texts and implicit meaning recognition',
      difficulty: 'Advanced',
      difficultyColor: 'text-warning',
      bgColor: 'bg-warning/5',
      borderColor: 'border-warning/20',
      duration: '3 hours',
      skills: ['Academic language', 'Professional contexts', 'Complex ideas']
    },
    {
      id: 'c2',
      level: 'C2',
      title: 'Proficiency',
      description: 'Understanding of virtually everything heard or read with ease',
      difficulty: 'Proficiency',
      difficultyColor: 'text-error',
      bgColor: 'bg-error/5',
      borderColor: 'border-error/20',
      duration: '3 hours',
      skills: ['Native-like fluency', 'Subtle distinctions', 'Complex reasoning']
    },
    {
      id: 'd1',
      level: 'D1',
      title: 'Expert',
      description: 'Exceptional command with sophisticated language use in all contexts',
      difficulty: 'Expert',
      difficultyColor: 'text-error',
      bgColor: 'bg-error/5',
      borderColor: 'border-error/20',
      duration: '3.5 hours',
      skills: ['Expert communication', 'Cultural nuances', 'Advanced discourse']
    },
    {
      id: 'd2',
      level: 'D2',
      title: 'Mastery',
      description: 'Complete mastery with ability to express any concept with precision',
      difficulty: 'Mastery',
      difficultyColor: 'text-error',
      bgColor: 'bg-error/5',
      borderColor: 'border-error/20',
      duration: '3.5 hours',
      skills: ['Perfect fluency', 'Academic writing', 'Professional expertise']
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Choose Your IELTS Level
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Select the appropriate examination level based on your English proficiency. 
            Each level is designed to accurately assess your language skills.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examLevels.map((exam) => (
            <div
              key={exam.id}
              className={`${exam.bgColor} ${exam.borderColor} border rounded-xl p-6 hover:shadow-moderate transition-smooth cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${exam.bgColor} rounded-lg flex items-center justify-center border ${exam.borderColor}`}>
                  <span className={`text-lg font-bold ${exam.difficultyColor}`}>
                    {exam.level}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">{exam.duration}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {exam.title}
              </h3>
              
              <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                {exam.description}
              </p>
              
              <div className="space-y-2 mb-4">
                {exam.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className={exam.difficultyColor} />
                    <span className="text-xs text-text-secondary">{skill}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${exam.bgColor} ${exam.difficultyColor}`}>
                  {exam.difficulty}
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-text-secondary group-hover:text-primary transition-smooth" 
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-text-secondary mb-4">
            Not sure which level is right for you?
          </p>
          <button className="text-primary hover:text-primary/80 font-medium text-sm transition-smooth">
            Take our free assessment test →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExamLevelsGrid;