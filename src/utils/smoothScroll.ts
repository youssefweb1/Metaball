import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const smoothScrollToTop = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: 0,
    ease: "power2.inOut"
  });
};