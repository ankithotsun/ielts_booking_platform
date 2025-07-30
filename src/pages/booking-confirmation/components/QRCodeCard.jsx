import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeCard = ({ bookingReference, bookingDetails }) => {
  const [qrGenerated, setQrGenerated] = useState(false);

  const generateQRCode = () => {
    setQrGenerated(true);
    console.log('QR Code generated for booking:', bookingReference);
  };

  const shareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'IELTS Exam Booking Confirmation',
        text: `My IELTS exam is confirmed! Booking reference: ${bookingReference}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`IELTS Exam Booking Confirmed - Reference: ${bookingReference} - ${window.location.href}`);
      console.log('Booking details copied to clipboard');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="QrCode" size={20} className="mr-2 text-primary" />
          Quick Access
        </h3>

        <div className="text-center">
          {!qrGenerated ? (
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-text-secondary" />
              </div>
              <p className="text-text-secondary text-sm">
                Generate QR code for easy mobile access to your booking details
              </p>
              <Button
                variant="outline"
                onClick={generateQRCode}
                iconName="QrCode"
                iconPosition="left"
              >
                Generate QR Code
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto bg-surface border border-border rounded-lg flex items-center justify-center">
                {/* Mock QR Code Pattern */}
                <div className="w-24 h-24 bg-text-primary" style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px),
                    repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)
                  `
                }}>
                </div>
              </div>
              <p className="text-text-secondary text-sm">
                Scan to access your booking details on mobile
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shareBooking}
                  iconName="Share"
                  iconPosition="left"
                >
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.print()}
                  iconName="Printer"
                  iconPosition="left"
                >
                  Print
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeCard;