import { Instagram } from 'lucide-react';
import { NAV_LINKS } from '@/data/solea';
import { scrollToSection } from '@/hooks/useLenis';
import { SOLEA } from '@/constants/testIds';

const SOCIALS = [
  { name: 'instagram', label: 'Instagram' },
  { name: 'pinterest', label: 'Pinterest' },
  { name: 'behance', label: 'Behance' },
];

export const Footer = () => {
  return (
    <footer
      id="footer"
      data-testid={SOLEA.footer}
      className="relative w-full overflow-hidden bg-brown pt-24 text-cream"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-12">
        <div className="flex flex-col justify-between gap-12 border-b border-cream/15 pb-16 lg:flex-row">
          <div className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.5em] text-cream/70">
              SOLÉA · Maison de Parfum
            </p>
            <p className="mt-6 font-display text-2xl font-light italic leading-snug text-cream/90">
              Where nature becomes memory.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-cream/40">Explore</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => scrollToSection(l.target)}
                      className="nav-link text-sm font-light text-cream/75 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-cream/40">Follow</p>
              <ul className="space-y-3">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href="#"
                      data-testid={`${SOLEA.footerSocial}-${s.name}`}
                      onClick={(e) => e.preventDefault()}
                      className="nav-link inline-flex items-center gap-2 text-sm font-light text-cream/75 transition-colors hover:text-gold"
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

        <div className="relative select-none py-6 text-center">
          <h2 className="font-display text-[24vw] font-light leading-none tracking-tight text-cream/[0.08] lg:text-[18vw]">
            SOLÉA
          </h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/15 py-8 text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:flex-row">
          <span>© {new Date().getFullYear()} SOLÉA. All rights reserved.</span>
          <span>Grasse — Paris — Kyoto</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
