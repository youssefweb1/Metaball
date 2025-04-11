import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

export default function PricingPage() {
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const plans = {
    basic: {
      title: "Basic",
      price: "Free",
      features: [
        "Single camera angle",
        "Standard quality stream",
        "Match highlights",
        "Basic stats"
      ]
    },
    premium: {
      title: "Premium",
      price: "199 SAR",
      features: [
        "Multiple camera angles",
        "HD quality stream",
        "Live stats and replays",
        "Virtual stadium tour",
        "Friend connections"
      ]
    },
    ultimate: {
      title: "Ultimate",
      price: "399 SAR",
      features: [
        "All camera angles",
        "4K quality stream",
        "Advanced stats and analysis",
        "Private virtual boxes",
        "Priority support",
        "Exclusive content"
      ]
    }
  };

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
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Select the perfect package for your virtual Saudi Pro League experience
            </p>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-6 py-3 rounded-full border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-dark transition-all duration-300"
            >
              Compare Plans
            </button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard {...plans.basic} />
            <PricingCard {...plans.premium} highlighted={true} />
            <PricingCard {...plans.ultimate} />
          </div>
        </div>
      </section>

      {/* Compare Plans Modal */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold gradient-text">Plan Comparison</h2>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="text-left">
                  <h3 className="text-lg font-bold mb-4 text-gray-300">Features</h3>
                  <div className="space-y-4">
                    <p>Camera Angles</p>
                    <p>Stream Quality</p>
                    <p>Match Highlights</p>
                    <p>Statistics</p>
                    <p>Virtual Stadium Tour</p>
                    <p>Friend Connections</p>
                    <p>Private Virtual Box</p>
                    <p>Support Level</p>
                    <p>Exclusive Content</p>
                  </div>
                </div>

                {Object.values(plans).map((plan) => (
                  <div key={plan.title} className="text-center">
                    <h3 className="text-lg font-bold mb-4 gradient-text">{plan.title}</h3>
                    <div className="space-y-4">
                      <CompareFeature available={plan.title !== "Basic"} text={plan.title === "Ultimate" ? "All angles" : plan.title === "Premium" ? "Multiple angles" : "Single angle"} />
                      <CompareFeature available={true} text={plan.title === "Ultimate" ? "4K" : plan.title === "Premium" ? "HD" : "Standard"} />
                      <CompareFeature available={true} text={plan.title === "Ultimate" ? "Full access" : plan.title === "Premium" ? "Extended" : "Basic"} />
                      <CompareFeature available={true} text={plan.title === "Ultimate" ? "Advanced" : plan.title === "Premium" ? "Enhanced" : "Basic"} />
                      <CompareFeature available={plan.title !== "Basic"} />
                      <CompareFeature available={plan.title !== "Basic"} />
                      <CompareFeature available={plan.title === "Ultimate"} />
                      <CompareFeature available={true} text={plan.title === "Ultimate" ? "Priority" : plan.title === "Premium" ? "Standard" : "Basic"} />
                      <CompareFeature available={plan.title === "Ultimate"} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`p-8 rounded-xl ${
        highlighted
          ? 'glass-effect neon-border'
          : 'bg-black bg-opacity-50'
      } hover:scale-105 transition-transform`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold gradient-text">{price}</span>
        {price !== "Free" && <span className="text-gray-400">/month</span>}
      </div>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-neon-green flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full mt-8 py-3 px-6 rounded-full bg-neon-green text-dark font-bold hover:scale-105 transition-transform">
        Get Started
      </button>
    </motion.div>
  );
}

function CompareFeature({ available, text }: { available: boolean; text?: string }) {
  return (
    <div className="flex justify-center items-center h-6">
      {text ? (
        <span className={available ? "text-gray-300" : "text-gray-600"}>{text}</span>
      ) : (
        <CheckCircle2 className={`h-5 w-5 ${available ? "text-neon-green" : "text-gray-600"}`} />
      )}
    </div>
  );
}