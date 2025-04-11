import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              How we collect, use, and protect your data
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto prose prose-invert">
            <div className="space-y-8">
              <Section
                title="1. Information We Collect"
                content="We collect information you provide directly to us, including name, email, and payment information. We also automatically collect certain information about your device and how you interact with our platform."
              />

              <Section
                title="2. How We Use Your Information"
                content="We use the information we collect to provide and improve our services, process your transactions, send you updates and marketing communications, and ensure platform security."
              />

              <Section
                title="3. Information Sharing"
                content="We do not sell your personal information. We may share your information with service providers who assist in our operations, and when required by law."
              />

              <Section
                title="4. Data Security"
                content="We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction."
              />

              <Section
                title="5. Your Rights"
                content="You have the right to access, correct, or delete your personal information. You can also object to processing and request data portability."
              />

              <Section
                title="6. Cookies and Tracking"
                content="We use cookies and similar technologies to enhance your experience and collect usage data. You can control cookie settings through your browser."
              />

              <Section
                title="7. Third-Party Services"
                content="Our platform may contain links to third-party services. We are not responsible for the privacy practices of these external sites."
              />

              <Section
                title="8. Children's Privacy"
                content="Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13."
              />

              <Section
                title="9. Changes to Privacy Policy"
                content="We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page."
              />

              <Section
                title="10. Contact Us"
                content="If you have any questions about this Privacy Policy, please contact us through our support channels."
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