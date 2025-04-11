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
        This experience is proudly presented by the MetaBall Team with technical implementation by Developer /  <br />
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
    const isHomePage = window.location.pathname === '/';
    const hasSeenLoader = localStorage.getItem('hasSeenLoader');
    
    // Skip loader if not on home page or has seen loader (and not on home page)
    if (!isHomePage || (hasSeenLoader && !isHomePage)) {
      onComplete();
      return;
    }

    // Reset loader state when on home page
    if (isHomePage) {
      localStorage.removeItem('hasSeenLoader');
    }

    // Initial setup - Set initial positions
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(stepRefs.current, { opacity: 0, y: 50 });
    gsap.set(overlayRef.current, { opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem('hasSeenLoader', 'true');
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (overlayRef.current) {
              gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete
              });
            }
          }
        });
      }
    });

    // Animate each step
    steps.forEach((_, index) => {
      const stepEl = stepRefs.current[index];
      if (stepEl) {
        tl.to(stepEl, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }, index === 0 ? ">" : ">-0.5");

        tl.to({}, { duration: 2 }); // Hold for 2 seconds

        if (index < steps.length - 1) {
          tl.to(stepEl, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.in",
          });
        } else {
          tl.to(stepEl, {
            opacity: 0,
            y: -50,
            duration: 1.5,
            ease: "power2.in",
          }, "+=1");
        }
      }
    });

  }, [onComplete]);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-black pointer-events-none"
      />
      <div 
        ref={containerRef}
        className="fixed inset-0 z-[61] flex items-center justify-center bg-black bg-opacity-95"
      >
        {steps.map((step, index) => (
          <div
            key={index}
            ref={el => stepRefs.current[index] = el}
            className="absolute max-w-xl p-4 text-center mx-auto"
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
