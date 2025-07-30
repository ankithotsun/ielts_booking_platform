import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQPreviewSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I choose the right IELTS level for my needs?",
      answer: `The IELTS level depends on your current English proficiency and goals. A1-A2 levels are for beginners, B1-B2 for intermediate learners, and C1-D2 for advanced speakers.\n\nWe recommend taking our free online assessment to determine your appropriate level. You can also consult with our advisors who can guide you based on your academic or professional requirements.`
    },
    {
      id: 2,
      question: "What documents do I need to upload for verification?",
      answer: `You need to upload one of the following government-issued photo identification documents:\n\n• Passport (preferred for international recognition)\n• Aadhaar Card (for Indian residents)\n• Driving License (with photo)\n• National ID Card\n\nDocuments must be clear, valid, and match the name on your booking. We accept JPEG, PNG, or PDF formats up to 5MB.`
    },
    {
      id: 3,
      question: "Can I reschedule or cancel my exam booking?",
      answer: `Yes, you can reschedule or cancel your booking:\n\n• Free cancellation: Up to 48 hours before exam date\n• Rescheduling: Available up to 24 hours before exam (subject to availability)\n• Late cancellation: 50% refund if cancelled within 48 hours\n• No-show: No refund available\n\nTo make changes, log into your account or contact our support team.`
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer: `We accept multiple secure payment methods through our Razorpay integration:\n\n• Credit/Debit Cards (Visa, MasterCard, American Express)\n• Net Banking from major banks\n• Digital Wallets (PayPal, Google Pay, Apple Pay)\n• UPI payments (for Indian users)\n• Bank transfers\n\nAll payments are processed securely with 256-bit SSL encryption.`
    },
    {
      id: 5,
      question: "How will I receive my exam results and certificate?",
      answer: `Your IELTS results will be delivered through multiple channels:\n\n• Email notification within 5-7 business days\n• Downloadable PDF certificate from your account\n• Physical certificate mailed to your registered address\n• Digital badge for LinkedIn and social profiles\n\nResults include detailed scores for each skill area and overall band score.`
    },
    {
      id: 6,
      question: "Is technical support available during the exam?",
      answer: `Yes, we provide comprehensive technical support:\n\n• 24/7 helpdesk during exam periods\n• Live chat support on the platform\n• Phone support for urgent issues\n• Technical check before exam starts\n• Backup systems to prevent data loss\n\nOur support team is trained to resolve issues quickly without disrupting your exam experience.`
    }
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary">
            Get answers to common questions about IELTS booking, examination process, and results.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-subtle transition-smooth"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
              >
                <h3 className="font-semibold text-text-primary pr-4">
                  {faq.question}
                </h3>
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`text-text-secondary transition-transform flex-shrink-0 ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-border">
                    <div className="text-text-secondary whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Icon name="MessageCircle" size={20} className="text-primary" />
              <h3 className="font-semibold text-text-primary">Still have questions?</h3>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Our support team is available 24/7 to help you with any queries about IELTS booking or examination process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-smooth">
                <Icon name="MessageCircle" size={16} />
                <span className="text-sm font-medium">Live Chat</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-surface border border-border text-text-primary px-4 py-2 rounded-lg hover:bg-muted transition-smooth">
                <Icon name="Mail" size={16} />
                <span className="text-sm font-medium">Email Support</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-surface border border-border text-text-primary px-4 py-2 rounded-lg hover:bg-muted transition-smooth">
                <Icon name="Phone" size={16} />
                <span className="text-sm font-medium">Call Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPreviewSection;