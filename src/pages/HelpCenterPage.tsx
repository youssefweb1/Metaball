import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  HelpCircle, 
  MessageCircle, 
  Video,
  Settings,
  CreditCard,
  User,
  Shield
} from 'lucide-react';

export default function HelpCenterPage() {
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
              Help Center
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find guides, tutorials, and answers to all your questions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <HelpCard
              icon={<Video />}
              title="Getting Started"
              description="Learn how to set up your VR device and start watching matches"
              links={[
                "Quick Start Guide",
                "Device Setup",
                "First-time Configuration"
              ]}
            />
            
            <HelpCard
              icon={<Settings />}
              title="Troubleshooting"
              description="Solutions for common technical issues and problems"
              links={[
                "Connection Issues",
                "VR Setup Problems",
                "Stream Quality Help"
              ]}
            />
            
            <HelpCard
              icon={<CreditCard />}
              title="Billing & Subscriptions"
              description="Manage your account and subscription settings"
              links={[
                "Payment Methods",
                "Subscription FAQ",
                "Billing History"
              ]}
            />
            
            <HelpCard
              icon={<User />}
              title="Account Management"
              description="Learn how to manage your MetaBall account"
              links={[
                "Profile Settings",
                "Privacy Options",
                "Account Security"
              ]}
            />
            
            <HelpCard
              icon={<Shield />}
              title="Security & Privacy"
              description="Information about data protection and privacy"
              links={[
                "Security Settings",
                "Privacy Policy",
                "Data Protection"
              ]}
            />
            
            <HelpCard
              icon={<MessageCircle />}
              title="Contact Support"
              description="Get in touch with our support team"
              links={[
                "Submit Ticket",
                "Live Chat",
                "Support Hours"
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function HelpCard({ 
  icon, 
  title, 
  description, 
  links 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  links: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-xl glass-effect hover:scale-105 transition-transform"
    >
      <div className="text-neon-green mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-gray-300 hover:text-neon-green transition-colors flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>{link}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}