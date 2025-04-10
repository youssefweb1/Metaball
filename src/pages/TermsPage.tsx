import React from 'react';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Please read these terms carefully before using MetaBall
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto prose prose-invert">
            <div className="space-y-8">
              <Section
                title="1. Acceptance of Terms"
                content="By accessing and using MetaBall, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform."
              />

              <Section
                title="2. User Accounts"
                content="You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
              />

              <Section
                title="3. Subscription Services"
                content="MetaBall offers various subscription tiers. By subscribing to our services, you agree to pay the applicable fees. Subscriptions automatically renew unless cancelled before the renewal date."
              />

              <Section
                title="4. Content Usage"
                content="All content provided through MetaBall is protected by copyright and other intellectual property rights. You may not reproduce, distribute, or create derivative works without our express permission."
              />

              <Section
                title="5. User Conduct"
                content="Users agree not to use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the service."
              />

              <Section
                title="6. Technical Requirements"
                content="Users are responsible for ensuring they have compatible hardware and internet connectivity to use MetaBall. We do not guarantee the service will work with all VR devices or configurations."
              />

              <Section
                title="7. Privacy"
                content="Your use of MetaBall is also governed by our Privacy Policy. By using the service, you consent to our collection and use of data as outlined in the Privacy Policy."
              />

              <Section
                title="8. Modifications"
                content="We reserve the right to modify these terms at any time. We will notify users of any material changes to these terms."
              />

              <Section
                title="9. Termination"
                content="We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason."
              />

              <Section
                title="10. Limitation of Liability"
                content="MetaBall shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-lg glass-effect p-6"
    >
      <h2 className="text-xl font-bold mb-4 gradient-text">{title}</h2>
      <p className="text-gray-300">{content}</p>
    </motion.div>
  );
}