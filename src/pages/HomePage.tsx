// HomePage.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Gamepad2,
  Users,
  Camera,
  Globe2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy
} from 'lucide-react';
import { gsap } from 'gsap';

export default function HomePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power4.out',
      });
      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power4.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const Problem = ({ text }: { text: string }) => (
    <div className="flex items-center text-red-500 gap-2">
      <XCircle className="w-5 h-5" />
      <span>{text}</span>
    </div>
  );

  const Solution = ({ text }: { text: string }) => (
    <div className="flex items-center text-[#00FF94] gap-2">
      <CheckCircle2 className="w-5 h-5" />
      <span>{text}</span>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
            poster="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80"
          >
            <source
              src="https://player.vimeo.com/external/434045526.hd.mp4?s=81a2ffa13e297b40a46f580d41c5590843075b25&profile_id=175"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center p-2 bg-white/5 backdrop-blur-lg rounded-full mb-8"
            >
              <Trophy className="w-6 h-6 text-[#00FF94] mr-2" />
              <span className="text-sm font-medium text-gray-200">
                Saudi Pro League • Road to World Cup 2034
              </span>
            </motion.div>

            <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#00FF94] to-[#00B4FF] bg-clip-text text-transparent mb-6">
              Don't just watch —  
              <br />
              Live the Saudi Football Thrill!
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience football like never before with MetaBall.  
              Dive into the action of the Saudi Pro League from anywhere —  
              all leading up to the World Cup 2034 in Saudi Arabia.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/demo"
                className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-[#00FF94] to-[#00B4FF] text-black font-semibold hover:shadow-lg hover:shadow-[#00FF94]/20 transition-all duration-300"
              >
                Try the Live Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center px-8 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '8K', label: 'Ultra HD Quality' },
              { value: '360°', label: 'Full Immersion View' },
              { value: '0.1ms', label: 'Lightning-fast Response' },
              { value: '100M+', label: 'Targeted Fans Worldwide' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#00FF94] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-black" id="solution">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-red-500">Fan Experience Problems</h3>
              <div className="space-y-4">
                <Problem text="Sold-out stadiums and overcrowding" />
                <Problem text="High travel and accommodation costs" />
                <Problem text="Limited camera angles on TV" />
                <Problem text="Lack of immersion and presence" />
                <Problem text="Hard to enjoy matches with distant friends" />
                <Problem text="No real interaction with crowd energy" />
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold mb-8 text-[#00FF94]">How MetaBall Solves It</h3>
              <div className="space-y-4">
                <Solution text="Feel like you're in the stadium – from home" />
                <Solution text="Switch angles freely in real-time" />
                <Solution text="Watch with friends — together virtually" />
                <Solution text="True-to-life visuals in 360° and 8K" />
                <Solution text="Instant response with no delays" />
                <Solution text="Live crowd interaction and atmosphere" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 glass-effect">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Be Part of the Future of Football Entertainment
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join the immersive revolution and get ready for Saudi Arabia's World Cup 2034.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center px-10 py-4 rounded-full bg-gradient-to-r from-[#00FF94] to-[#00B4FF] text-black font-semibold hover:shadow-lg transition-all duration-300"
          >
            Launch the Interactive Experience
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
