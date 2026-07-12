import { Instagram } from 'lucide-react';
import { NAV_LINKS } from '@/data/ethera';
import { scrollToSection } from '@/hooks/useLenis';
import { ETHERA } from '@/constants/testIds';

const SOCIALS = [
  { name: 'instagram', label: 'Instagram' },
  { name: 'pinterest', label: 'Pinterest' },
  { name: 'behance', label: 'Behance' },
];

export const Footer = () => {
  return (
    <footer
      id="footer"
      data-testid={ETHERA.footer}
      className="relative w-full overflow-hidden bg-ink pt-24"
    >
      <div className="mx-auto max-w-[1600px] px-6">
        {/* Top row */}
        <div className="flex flex-col justify-between gap-12 border-b border-cream/10 pb-16 lg:flex-row">
          <div className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold/80">
              ÉTHERA · Maison de Parfum
            </p>
            <p className="mt-6 text-sm font-light leading-relaxed text-cream/55">
              Composed in Grasse, France. Aged in oak, sealed in crystal, and made
              for those who understand that scent is memory.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-cream/40">
                Navigate
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => scrollToSection(l.target)}
                      className="nav-link text-sm font-light text-cream/70 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-cream/40">
                Follow
              </p>
              <ul className="space-y-3">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href="#"
                      data-testid={`${ETHERA.footerSocial}-${s.name}`}
                      onClick={(e) => e.preventDefault()}
                      className="nav-link inline-flex items-center gap-2 text-sm font-light text-cream/70 transition-colors hover:text-gold"
                    >
                      {s.name === 'instagram' && (
                        <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
                      )}
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Giant logo */}
        <div className="relative select-none py-10 text-center">
          <h2 className="font-display text-[22vw] font-light leading-none tracking-tight text-cream/[0.06] lg:text-[16vw]">
            ÉTHERA
          </h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-8 text-[10px] uppercase tracking-[0.25em] text-cream/40 sm:flex-row">
          <span>© {new Date().getFullYear()} ÉTHERA. All rights reserved.</span>
          <span>Crafted with intention · Grasse — Paris — Tokyo</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
