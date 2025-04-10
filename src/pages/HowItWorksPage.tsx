import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Users, Gamepad2 } from 'lucide-react';

export default function HowItWorksPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              How MetaBall Works
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience football like never before with our cutting-edge VR technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-black" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            <Step
              icon={<Gamepad2 className="h-12 w-12 text-neon-green" />}
              title="1. Choose Your Match"
              description="Select from live matches or upcoming fixtures in the World Cup schedule"
              delay={0}
            />
            <Step
              icon={<Camera className="h-12 w-12 text-neon-green" />}
              title="2. Select Your View"
              description="Pick your preferred viewing angle from multiple 360° cameras around the stadium"
              delay={0.2}
            />
            <Step
              icon={<Users className="h-12 w-12 text-neon-green" />}
              title="3. Join Your Friends"
              description="Connect with friends in virtual spaces and enjoy the match together"
              delay={0.4}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Step({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col md:flex-row items-center gap-8"
    >
      <div className="flex-shrink-0 p-6 rounded-full glass-effect">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2 gradient-text">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}