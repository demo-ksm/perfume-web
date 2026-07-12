import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/data/solea';
import { scrollToSection } from '@/hooks/useLenis';
import { SOLEA } from '@/constants/testIds';

// Almost invisible navbar. Becomes a soft frosted linen bar on scroll.
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      data-testid={SOLEA.navbar}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[9000] transition-all duration-700 ${
        scrolled ? 'frost py-4' : 'bg-transparent py-7'
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10">
        <button
          data-testid={SOLEA.navLogo}
          onClick={() => scrollToSection('scene-botanical')}
          className="font-display text-xl font-medium tracking-[0.4em] text-brown transition-opacity hover:opacity-70"
        >
          SOLÉA
        </button>

        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <button
                data-testid={`${SOLEA.navLink}-${l.target}`}
                onClick={() => scrollToSection(l.target)}
                className="nav-link text-[10px] uppercase tracking-[0.28em] text-brown/70 transition-colors hover:text-brown"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <span className="hidden text-[10px] uppercase tracking-[0.28em] text-brown/50 sm:block">
          Maison de Parfum
        </span>
      </nav>
    </motion.header>
  );
};

export default Navbar;
