import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQItem[] = [
  {
    category: "Getting Started",
    question: "What do I need to use MetaBall?",
    answer: "To use MetaBall, you'll need a compatible VR headset and a stable internet connection. Our platform works with most popular VR devices including Meta Quest, Valve Index, and HTC Vive."
  },
  {
    category: "Getting Started",
    question: "How do I create an account?",
    answer: "Simply click the 'Sign Up' button, enter your email and create a password. You can start with our free tier and upgrade anytime."
  },
  {
    category: "Technical Requirements",
    question: "What's the minimum internet speed required?",
    answer: "We recommend at least 25 Mbps for the best experience. For 4K streaming, 50 Mbps or higher is recommended."
  },
  {
    category: "Technical Requirements",
    question: "Which VR headsets are supported?",
    answer: "MetaBall supports all major VR headsets including Meta Quest 2/3, Valve Index, HTC Vive, and other OpenVR compatible devices."
  },
  {
    category: "Subscription Plans",
    question: "Can I change my subscription plan?",
    answer: "Yes, you can upgrade or downgrade your subscription at any time. Changes take effect at the start of your next billing cycle."
  },
  {
    category: "Subscription Plans",
    question: "Is there a free trial?",
    answer: "Yes, we offer a free basic plan that lets you experience core features. You can upgrade to premium features anytime."
  },
  {
    category: "Future Features",
    question: "What new features are coming soon?",
    answer: "We're constantly working on new features including multi-view perspectives, instant replays, and enhanced social features for watching with friends."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div className="pt-20">
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Find answers to common questions about MetaBall
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-black bg-opacity-50 border border-gray-700 text-white focus:outline-none focus:border-neon-green"
              />
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {categories.map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 gradient-text">{category}</h2>
                <div className="space-y-4">
                  {filteredFAQs
                    .filter(faq => faq.category === category)
                    .map((faq, index) => {
                      const actualIndex = faqs.indexOf(faq);
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="rounded-lg glass-effect overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedIndex(expandedIndex === actualIndex ? null : actualIndex)}
                            className="w-full px-6 py-4 flex justify-between items-center text-left"
                          >
                            <span className="font-medium">{faq.question}</span>
                            {expandedIndex === actualIndex ? (
                              <ChevronUp className="h-5 w-5 text-neon-green" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-neon-green" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedIndex === actualIndex && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-6 pb-4"
                              >
                                <p className="text-gray-300">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}