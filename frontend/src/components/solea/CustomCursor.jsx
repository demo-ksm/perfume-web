import { useEffect, useRef, useState } from 'react';
import { SOLEA } from '@/constants/testIds';

// Warm cursor: a brass dot with a lagging ring that expands on interactives.
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
    const ring = { ...mouse };
    let raf;

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    };
    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.14;
      ring.y += (mouse.y - ring.y) * 0.14;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const grow = () => ringRef.current?.classList.add('cursor-grow');
    const shrink = () => ringRef.current?.classList.remove('cursor-grow');
    const attach = () =>
      document.querySelectorAll('a, button, [data-cursor="hover"], input').forEach((el) => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });

    window.addEventListener('mousemove', move);
    const t = setTimeout(attach, 1200);
    const mo = new MutationObserver(() => attach());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      clearTimeout(t);
      mo.disconnect();
      document.documentElement.classList.remove('cursor-hidden');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div data-testid={SOLEA.cursor} aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-brown"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 rounded-full border border-brown/40 transition-[width,height,opacity,background-color] duration-300"
        style={{ willChange: 'transform' }}
      />
      <style>{`
        .cursor-grow {
          width: 4.5rem !important;
          height: 4.5rem !important;
          margin-left: -2.25rem !important;
          margin-top: -2.25rem !important;
          background: rgba(210,156,83,0.12);
          border-color: rgba(210,156,83,0.8);
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
