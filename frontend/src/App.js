import '@/App.css';
import { useLenis } from '@/hooks/useLenis';
import { Loader } from '@/components/ethera/Loader';
import { CustomCursor } from '@/components/ethera/CustomCursor';
import { Navbar } from '@/components/ethera/Navbar';
import { HeroSection } from '@/components/ethera/HeroSection';
import { ProductExperience3D } from '@/components/ethera/ProductExperience3D';
import { CraftsmanshipTimeline } from '@/components/ethera/CraftsmanshipTimeline';
import { StorySection } from '@/components/ethera/StorySection';
import { NotesCards } from '@/components/ethera/NotesCards';
import { CollectionGrid } from '@/components/ethera/CollectionGrid';
import { IngredientsGrid } from '@/components/ethera/IngredientsGrid';
import { TestimonialsSection } from '@/components/ethera/TestimonialsSection';
import { NewsletterSection } from '@/components/ethera/NewsletterSection';
import { Footer } from '@/components/ethera/Footer';

function App() {
  useLenis(true);

  return (
    <div className="relative min-h-screen bg-ink text-cream">
      <div className="grain-overlay" aria-hidden="true" />
      <Loader />
      <CustomCursor />
      <Navbar />

      <main>
        <HeroSection />
        <ProductExperience3D />
        <CraftsmanshipTimeline />
        <StorySection />
        <NotesCards />
        <CollectionGrid />
        <IngredientsGrid />
        <TestimonialsSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
