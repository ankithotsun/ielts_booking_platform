import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarIntegration = ({ bookingDetails }) => {
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  const calendarOptions = [
    {
      id: 'google',
      name: 'Google Calendar',
      icon: 'Calendar',
      color: 'text-blue-600'
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: 'Calendar',
      color: 'text-blue-500'
    },
    {
      id: 'apple',
      name: 'Apple Calendar',
      icon: 'Calendar',
      color: 'text-gray-600'
    },
    {
      id: 'ics',
      name: 'Download ICS File',
      icon: 'Download',
      color: 'text-primary'
    }
  ];

  const generateCalendarEvent = () => {
    const startDate = new Date(`${bookingDetails.date} ${bookingDetails.time}`);
    const endDate = new Date(startDate.getTime() + (3 * 60 * 60 * 1000)); // 3 hours duration
    
    const eventDetails = {
      title: `IELTS ${bookingDetails.examType} Exam - Level ${bookingDetails.level}`,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      description: `IELTS Exam Booking\nReference: ${bookingDetails.reference}\nLocation: ${bookingDetails.location}\nPlease arrive 30 minutes early.`,
      location: bookingDetails.location
    };

    return eventDetails;
  };

  const addToCalendar = (calendarType) => {
    const event = generateCalendarEvent();
    
    switch (calendarType) {
      case 'google':
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(googleUrl, '_blank');
        break;
        
      case 'outlook':
        const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${event.start}&enddt=${event.end}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(outlookUrl, '_blank');
        break;
        
      case 'apple': // For Apple Calendar, we'll generate an ICS file
        downloadICSFile(event);
        break;
        
      case 'ics':
        downloadICSFile(event);
        break;
        
      default:
        console.log('Calendar type not supported');
    }
    
    setSelectedCalendar(calendarType);
    setTimeout(() => setSelectedCalendar(null), 2000);
  };

  const downloadICSFile = (event) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IELTS Booking Platform//EN
BEGIN:VEVENT
UID:${bookingDetails.reference}@ielts-booking.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ielts-exam-${bookingDetails.reference}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="CalendarPlus" size={20} className="mr-2 text-primary" />
          Add to Calendar
        </h3>

        <p className="text-text-secondary text-sm mb-4">
          Add your exam date to your calendar to receive reminders and never miss your appointment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {calendarOptions.map((calendar) => (
            <Button
              key={calendar.id}
              variant={selectedCalendar === calendar.id ? "default" : "outline"}
              onClick={() => addToCalendar(calendar.id)}
              className="justify-start h-auto p-4"
              disabled={selectedCalendar === calendar.id}
            >
              <div className="flex items-center w-full">
                <Icon 
                  name={selectedCalendar === calendar.id ? "Check" : calendar.icon} 
                  size={18} 
                  className={`mr-3 ${selectedCalendar === calendar.id ? 'text-primary-foreground' : calendar.color}`} 
                />
                <div className="text-left">
                  <div className="font-medium">
                    {selectedCalendar === calendar.id ? 'Added!' : calendar.name}
                  </div>
                  {calendar.id === 'ics' && (
                    <div className="text-xs opacity-75 mt-1">
                      Compatible with most calendar apps
                    </div>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start">
            <Icon name="Clock" size={16} className="mr-2 mt-0.5 text-text-secondary" />
            <div className="text-sm text-text-secondary">
              <strong>Exam Schedule:</strong> {new Date(bookingDetails.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} at {new Date(`2025-01-01 ${bookingDetails.time}`).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarIntegration;