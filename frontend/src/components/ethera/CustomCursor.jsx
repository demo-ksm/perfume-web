import { useEffect, useRef, useState } from 'react';
import { ETHERA } from '@/constants/testIds';

// Custom cursor: a small gold dot with a lagging outer ring that grows on
// interactive elements. Disabled on touch / coarse pointers.
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-hidden');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let raf;

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const grow = () => ringRef.current?.classList.add('cursor-grow');
    const shrink = () => ringRef.current?.classList.remove('cursor-grow');

    const attach = () => {
      document
        .querySelectorAll('a, button, [data-cursor="hover"], input')
        .forEach((el) => {
          el.addEventListener('mouseenter', grow);
          el.addEventListener('mouseleave', shrink);
        });
    };
    window.addEventListener('mousemove', move);
    const attachTimer = setTimeout(attach, 1200);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      clearTimeout(attachTimer);
      document.documentElement.classList.remove('cursor-hidden');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div data-testid={ETHERA.cursor} aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 rounded-full border border-gold/50 transition-[width,height,opacity,background-color] duration-300"
        style={{ willChange: 'transform' }}
      />
      <style>{`
        .cursor-grow {
          width: 4rem !important;
          height: 4rem !important;
          margin-left: -2rem !important;
          margin-top: -2rem !important;
          background: rgba(200,164,107,0.08);
          border-color: rgba(200,164,107,0.8);
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
