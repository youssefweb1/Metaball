
import React from 'react';
import { motion } from 'framer-motion';
import { Camera as Camera360, Users, Tv, Gamepad2, Globe2, Shield } from 'lucide-react';

export default function FeaturesPage() {
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
              MetaBall Features
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover all the innovative features that make MetaBall the future of football viewing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Camera360 className="h-8 w-8" />}
              title="360° Viewing"
              description="Watch from any angle with our multi-camera system"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Social Viewing"
              description="Join friends in virtual spaces while watching"
            />
            <FeatureCard
              icon={<Tv className="h-8 w-8" />}
              title="Multi-Screen"
              description="View multiple angles simultaneously"
            />
            <FeatureCard
              icon={<Gamepad2 className="h-8 w-8" />}
              title="Interactive Stats"
              description="Access real-time statistics and replays"
            />
            <FeatureCard
              icon={<Globe2 className="h-8 w-8" />}
              title="Global Access"
              description="Watch from anywhere in the world"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Premium Quality"
              description="Ultra-HD streaming with low latency"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-xl glass-effect hover:scale-105 transition-transform"
    >
      <div className="mb-4 text-neon-green">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}