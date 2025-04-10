import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Users, Globe2 } from 'lucide-react';

export default function AboutPage() {
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
              About MetaBall
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Revolutionizing the way fans experience football through immersive VR technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <Rocket className="h-8 w-8 text-neon-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                  <p className="text-gray-300">
                    MetaBall aims to transform football viewing into an immersive, social experience. 
                    We're building the future of sports entertainment, where fans can experience matches 
                    as if they're in the stadium, from anywhere in the world.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Code className="h-8 w-8 text-neon-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Technology</h3>
                  <p className="text-gray-300">
                    Our platform combines cutting-edge VR technology with real-time streaming and 
                    social features. We use advanced camera systems and AI to create an unparalleled 
                    viewing experience.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <Users className="h-8 w-8 text-neon-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Team</h3>
                  <p className="text-gray-300">
                    MetaBall is built by a passionate team of sports enthusiasts, VR experts, 
                    and technology innovators. We're united by our mission to make football more 
                    accessible and immersive for fans worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Globe2 className="h-8 w-8 text-neon-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                  <p className="text-gray-300">
                    From local leagues to international tournaments, we're working to bring the 
                    stadium experience to every fan. Our platform breaks down geographical barriers 
                    and creates new ways to enjoy the beautiful game.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}