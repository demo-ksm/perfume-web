import '@/App.css';
import { useLenis } from '@/hooks/useLenis';
import { Loader } from '@/components/solea/Loader';
import { CustomCursor } from '@/components/solea/CustomCursor';
import { Navbar } from '@/components/solea/Navbar';
import { Scene1Botanical } from '@/components/solea/Scene1Botanical';
import { Scene2Reveal } from '@/components/solea/Scene2Reveal';
import { Scene3Editorial } from '@/components/solea/Scene3Editorial';
import { Scene4Fragrance } from '@/components/solea/Scene4Fragrance';
import { Scene5Craftsmanship } from '@/components/solea/Scene5Craftsmanship';
import { Scene6Experience360 } from '@/components/solea/Scene6Experience360';
import { Scene7Collection } from '@/components/solea/Scene7Collection';
import { Scene8Journal } from '@/components/solea/Scene8Journal';
import { Scene9Newsletter } from '@/components/solea/Scene9Newsletter';
import { Footer } from '@/components/solea/Footer';

function App() {
  useLenis(true);

  return (
    <div className="relative min-h-screen bg-sand text-brown">
      <div className="grain-overlay" aria-hidden="true" />
      <Loader />
      <CustomCursor />
      <Navbar />

      <main>
        <Scene1Botanical />
        <Scene2Reveal />
        <Scene3Editorial />
        <Scene4Fragrance />
        <Scene5Craftsmanship />
        <Scene6Experience360 />
        <Scene7Collection />
        <Scene8Journal />
        <Scene9Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default App;
