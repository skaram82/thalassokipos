import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  scale?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 50,
  duration = 0.8,
  scale = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenY = direction === "up" ? distance : direction === "down" ? -distance : 0;
  const hiddenX = direction === "left" ? distance : direction === "right" ? -distance : 0;

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: `translate3d(${isVisible ? 0 : hiddenX}px, ${isVisible ? 0 : hiddenY}px, 0) scale(${isVisible ? 1 : scale ? 0.9 : 1})`,
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    transitionDelay: `${delay}s`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={containerRef} style={style}>
      {children}
    </div>
  );
}
