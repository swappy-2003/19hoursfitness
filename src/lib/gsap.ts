import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Default easing
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
}

export { gsap, ScrollTrigger };
