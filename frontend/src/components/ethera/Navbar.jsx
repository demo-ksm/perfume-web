import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/data/ethera';
import { scrollToSection } from '@/hooks/useLenis';
import { MagneticButton } from './MagneticButton';
import { ETHERA } from '@/constants/testIds';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      data-testid={ETHERA.navbar}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[9000] transition-all duration-500 ${
        scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10">
        <button
          data-testid={ETHERA.navLogo}
          onClick={() => scrollToSection('hero')}
          className="font-display text-2xl font-medium tracking-[0.35em] text-cream transition-colors hover:text-gold"
        >
          ÉTHERA
        </button>

        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                data-testid={`${ETHERA.navLink}-${link.target}`}
                onClick={() => scrollToSection(link.target)}
                className="nav-link text-[11px] uppercase tracking-[0.25em] text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <MagneticButton
          data-testid={ETHERA.navCta}
          variant="ghost"
          className="hidden px-6 py-3 sm:inline-flex"
          onClick={() => scrollToSection('collection')}
        >
          Discover
        </MagneticButton>
      </nav>
    </motion.header>
  );
};

export default Navbar;
