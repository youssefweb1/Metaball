import { useEffect, useRef } from 'react';
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
  const overlayRef = useRef<HTMLDivElement>(null);

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
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete
            });
          }
        });
      }
    });

    // Initial setup
    gsap.set([containerRef.current, ...stepRefs.current], { opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 1 });

    // Fade in container
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Animate each step
    steps.forEach((_, index) => {
      const stepEl = stepRefs.current[index];
      if (stepEl) {
        // Fade in and slide up
        tl.to(stepEl, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        }, `>-0.5`);

        // Hold for a moment
        tl.to({}, { duration: 1.5 });

        // Fade out and slide up (except for last step)
        if (index < steps.length - 1) {
          tl.to(stepEl, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.in",
          });
        } else {
          // Last step stays longer
          tl.to({}, { duration: 1 });
          tl.to(stepEl, {
            opacity: 0,
            y: -50,
            duration: 1.5,
            ease: "power2.in",
          });
        }
      }
    });

  }, [onComplete]);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-black"
      />
      <div 
        ref={containerRef}
        className="fixed inset-0 z-[55] flex items-center justify-center bg-black bg-opacity-95"
      >
        {steps.map((step, index) => (
          <div
            key={index}
            ref={el => stepRefs.current[index] = el}
            className="absolute max-w-xl p-4 text-center mx-auto transform translate-y-[50px]"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00FF94] to-[#00B4FF] bg-clip-text text-transparent">
              {step.title}
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed">
              {step.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
