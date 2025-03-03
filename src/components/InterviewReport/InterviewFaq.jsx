import { Faq3 } from '@/components/blocks/faq3';

const faqData = {
  heading: 'Frequently Asked Questions',
  description:
    "Everything you need to know about our AI Interview platform and reports. Can't find the answer you're looking for? Feel free to contact our support team.",
  items: [
    {
      id: 'faq-1',
      question: 'What is the AI Interview platform?',
      answer:
        'Our AI Interview platform simulates real interview experiences, providing instant feedback on your answers, communication skills, and technical knowledge.'
    },
    {
      id: 'faq-2',
      question: 'How does the AI evaluate my performance?',
      answer:
        'The AI analyzes your responses based on clarity, confidence, technical correctness, and overall delivery. It then generates a detailed report with improvement suggestions.'
    },
    {
      id: 'faq-3',
      question: 'What is included in the free report?',
      answer:
        'The free report provides a basic performance overview, including key strengths and weaknesses, as well as general feedback on your responses.'
    },
    {
      id: 'faq-4',
      question: 'What additional insights do I get with the premium report?',
      answer:
        'The premium report includes detailed analytics, AI-driven suggestions for improvement, answer-by-answer breakdowns, and personalized feedback tailored to enhance your interview skills.'
    },
    {
      id: 'faq-5',
      question: 'Can I retake the AI Interview?',
      answer:
        'Yes, you can retake the interview as many times as you like. Repeating the process allows you to track progress and refine your answers over time.'
    },
    {
      id: 'faq-6',
      question: 'Is the AI Interview suitable for all job roles?',
      answer:
        'Yes, our platform supports interviews across multiple domains, including software engineering, data science, product management, and more.'
    },
    {
      id: 'faq-7',
      question: 'How do I access my interview reports?',
      answer:
        'Your reports are available in your dashboard after completing an interview. You can view, download, or share them for future reference.'
    },
    {
      id: 'faq-8',
      question: 'Do recruiters have access to my reports?',
      answer:
        'No, your reports are private unless you choose to share them. However, you can use them to improve your performance before actual interviews.'
    },
    {
      id: 'faq-9',
      question: 'How accurate is the AI feedback?',
      answer:
        'Our AI model is trained on industry-standard interview evaluation metrics, ensuring highly accurate and constructive feedback.'
    },
    {
      id: 'faq-10',
      question: 'What if I need human feedback instead of AI analysis?',
      answer:
        'We also offer human-led mock interviews for an additional fee, where industry professionals provide personalized feedback on your performance.'
    }
  ],
  supportHeading: 'Still have questions?',
  supportDescription:
    "Can't find the answer you're looking for? Our support team is here to help with any technical questions or concerns.",
  supportButtonText: 'Contact Support',
  supportButtonUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=contact@prepsom.com&su=Support Request'
};

function FaqComponent() {
  return <Faq3 {...faqData} />;
}

export { FaqComponent };
