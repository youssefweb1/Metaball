import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderStep {
  title: string;
  content: string | JSX.Element;
}

const steps: LoaderStep[] = [
  {
    title: "Welcome",
    content: "Welcome and thank you to SCAI for organizing this exciting global competition."
  },
  {
    title: "Credits",
    content: (
      <>
        This experience is proudly presented by the MetaBall Team, with technical implementation by developer <br />
        <span className="text-[#00FF94]">Youssef El-Sabbahy</span>.
      </>
    )
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

    // Animate each step with proper delays
    steps.forEach((step, index) => {
      const stepEl = stepRefs.current[index];

      if (stepEl) {
        tl.from(stepEl, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        }, index * 2); // Increase the delay between steps

        if (index < steps.length - 1) {
          tl.to(stepEl, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            delay: 1 // Add a small delay before hiding each step
          });
        }

        if (index === steps.length - 1) {
          // For the last step (Credits), add a delay before hiding it
          tl.to(stepEl, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            delay: 2 // Wait for 3 seconds before hiding the last step
          });
        }
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
          className="absolute max-w-sm p-6 text-center mx-auto"
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
