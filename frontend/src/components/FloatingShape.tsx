import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingShapeProps {
  x?: string; // Horizontal position
  y?: string; // Vertical position
  duration?: number; // Animation duration in seconds
  xStart?: string; // Starting horizontal position
  yStart?: string; // Starting vertical position
}


const FloatingShape = ({ x = '100vw', y = '0', duration = 5,xStart="0vw",yStart="0vh" }:FloatingShapeProps) => {
  const shapeRef = useRef(null);

  useEffect(() => {
    const floatingAnimation = gsap.fromTo(shapeRef.current,{
        x: xStart,
        y: yStart,
    }, {
      x,
      y,
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      floatingAnimation.kill();
    };
  }, [x, y, duration]);

  return (
    <div
      ref={shapeRef}
      className="absolute w-52 h-52 rounded-full pointer-events-none z-0 bg-primary opacity-40"
      style={{
        boxShadow: '0 0 60px 30px rgba(100, 255, 218, 0.2)', // Glow effect
        filter: 'blur(10px)',
      }}
    ></div>
  );
};

export default FloatingShape;
