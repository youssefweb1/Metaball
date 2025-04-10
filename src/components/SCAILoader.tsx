import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderStep {
  title: string;
  content: string;
}

const steps: LoaderStep[] = [
  {
    title: "Welcome",
    content: "Welcome and special thanks to SCAI — the official sponsor and innovation partner."
  },
  {
    title: "About SCAI",
    content: "National AI Champion – In 2021, the Saudi Company for Artificial Intelligence (SCAI) emerged as a national AI champion driving innovation that positions the Kingdom as a global hub for AI excellence."
  },
  {
    title: "Growth and Impact",
    content: "Aligned with PIF's vision, SCAI builds local capabilities, forges strategic partnerships, and leads in tech advancements."
  },
  {
    title: "Transformation",
    content: "Focused on creating sustainable value both in Saudi Arabia and globally, SCAI's story is one of transformation, innovation, and commitment to the AI ecosystem."
  },
  {
    title: "Strategic Objectives",
    content: "Customer Centricity, Value, Sustainability, Collaboration."
  },
  {
    title: "Contact & Opportunities",
    content: "Want to speak with an AI expert? Explore partnerships? Discover career or media opportunities?"
  },
  {
    title: "Credits",
    content: "This experience is proudly presented by the MetaBall Team. Technical implementation by developer Youssef El-Sobahy."
  }
];

export default function SCAILoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hasSeenLoader = localStorage.getItem('hasSeenLoader');
    if (hasSeenLoader) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem('hasSeenLoader', 'true');
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          onComplete
        });
      }
    });

    // Initial fade in
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 1
    });

    // Animate each step
    stepRefs.current.forEach((step, index) => {
      tl.from(step, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, index * 2.5); // Delay between steps

      // Hide previous step (except for the last one)
      if (index < steps.length - 1) {
        tl.to(step, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          delay: 1.5
        });
      }
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {steps.map((step, index) => (
        <div
          key={index}
          ref={el => stepRefs.current[index] = el}
          className="absolute max-w-2xl mx-auto p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00FF94] to-[#00B4FF] bg-clip-text text-transparent">
            {step.title}
          </h2>
          <p className="text-xl text-gray-300">
            {step.content}
          </p>
        </div>
      ))}
    </div>
  );
}