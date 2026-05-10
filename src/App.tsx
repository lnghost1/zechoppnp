import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Beer, 
  Instagram, 
  MapPin, 
  Clock, 
  ChevronRight,
  Search,
  X,
  Flame,
  Music,
  Users,
  UtensilsCrossed,
  Phone
} from 'lucide-react';
import { MENU_DATA } from './constants';
import { MenuItem } from './types';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>(MENU_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const scrollPosition = window.scrollY + 150;
      for (const category of MENU_DATA) {
        const element = categoryRefs.current[category.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    const element = categoryRefs.current[id];
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveCategory(id);
    }
  };

  const filteredMenu = MENU_DATA.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-matte-black text-ice-white font-sans overflow-x-hidden">
      {/* Texture & Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-beer-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-40 left-[-10%] w-[400px] h-[400px] bg-ember-red/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-matte-black/95 backdrop-blur-xl py-3 border-b border-beer-gold/20 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-beer-gold blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-matte-black border-2 border-beer-gold p-2 rounded-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                <Beer className="text-beer-gold size-6" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-display tracking-wider text-beer-gold leading-none">ZÉ CHOPP</h1>
              <p className="text-[9px] uppercase tracking-[.3em] text-gray-500 font-bold">Steakhouse & Pub</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="O que vamos pedir?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-none border-b-beer-gold/50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-b-beer-gold w-64 transition-all"
              />
            </div>
            <a href="https://www.instagram.com/zechoppnovoprogresso/" className="p-2 border border-white/10 rounded-md hover:bg-beer-gold hover:text-black transition-all">
              <Instagram className="size-5" />
            </a>
          </div>
        </div>

        {/* Categories Bar */}
        <div className={`transition-all duration-500 flex justify-center mt-4 px-6 overflow-x-auto no-scrollbar pb-2 ${scrolled ? 'opacity-100' : 'opacity-100 md:opacity-0'}`}>
          <div className="flex gap-4 min-w-max">
            {MENU_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`
                  px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2
                  ${activeCategory === cat.id ? 'text-beer-gold border-beer-gold' : 'text-gray-500 border-transparent hover:text-white'}
                `}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1600" 
              alt="Bar Atmosphere" 
              className="w-full h-full object-cover opacity-40 scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matte-black/50 to-matte-black" />
          </div>

          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 bg-ember-red/20 border border-ember-red/40 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[.3em] text-white animate-pulse">
                <Flame className="size-3 text-beer-gold" /> BRASA ACESA & CHOPP NO GRAU
              </div>
              <h2 className="text-6xl md:text-8xl font-display leading-[0.9] text-white">
                SINTA O SABOR<br />
                <span className="text-transparent border-text text-neon-amber" style={{ WebkitTextStroke: '1px #ffbf00' }}>DA RESENHA</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-400 font-accent font-medium text-sm md:text-base leading-relaxed">
                O point mais premium de Novo Progresso. Caneca congelada, carnes nobres e a melhor atmosfera de pub regional.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-xl">
                  <Music className="size-5 text-beer-gold" />
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Música</p>
                    <p className="text-xs font-bold uppercase">Ao Vivo</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-xl">
                  <Users className="size-5 text-beer-gold" />
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Ambiente</p>
                    <p className="text-xs font-bold uppercase">Premium</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-1 h-12 bg-gradient-to-b from-beer-gold to-transparent rounded-full" />
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className={`relative z-10 max-w-5xl mx-auto px-6 ${searchQuery ? 'pt-40' : 'pt-20'} pb-24`}>
        {/* Mobile Search */}
        <div className="md:hidden mb-12">
           <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="O que vamos pedir?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-5 pl-12 pr-4 text-base focus:outline-none focus:border-beer-gold transition-all"
            />
          </div>
        </div>

        {/* Menu Listings */}
        <div className="space-y-32">
          {filteredMenu.map((category) => (
            <section 
              key={category.id} 
              id={category.id}
              ref={(el) => (categoryRefs.current[category.id] = el)}
              className="scroll-mt-40"
            >
              <div className="mb-12 flex items-end gap-6">
                <div className="relative">
                  <h3 className="text-5xl md:text-7xl font-display tracking-tight leading-none text-white uppercase italic">
                    {category.title}
                  </h3>
                  <div className="absolute -bottom-2 left-0 w-24 h-1.5 bg-beer-gold" />
                </div>
                <p className="text-[9px] font-black tracking-[0.4em] text-gray-600 uppercase mb-1">SECTION_{category.id.toUpperCase()}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {category.items.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer flex flex-col gap-4"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/5 bg-white/5">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent opacity-60" />
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                          <span className="text-xl font-display text-ember-red border-4 border-ember-red px-6 py-2 rotate-[-5deg]">ESGOTADO</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-beer-gold text-black px-4 py-2 font-display text-2xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center group-hover:text-beer-gold transition-colors">
                        <h4 className="text-2xl font-display tracking-wide uppercase">{item.name}</h4>
                        <ChevronRight className="size-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Live Music Banner */}
      <section className="bg-ember-red py-8 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-5">
              <span className="text-4xl font-display text-white uppercase italic tracking-widest">MÚSICA AO VIVO TODA SEMANA</span>
              <Music className="size-8 text-beer-gold" />
              <span className="text-4xl font-display text-black uppercase italic tracking-widest">RESENHA PREMIUM</span>
              <Flame className="size-8 text-black" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20 text-center md:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <Beer className="text-beer-gold size-10" />
                <h2 className="text-4xl font-display text-white tracking-widest">ZÉ CHOPP</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                O churrasco perfeito, o chopp tirado na hora e a atmosfera que você merece. Sua noite em Novo Progresso começa aqui.
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="text-beer-gold font-display text-2xl uppercase tracking-widest">Horário de Brasa</h5>
              <div className="space-y-2 text-sm font-bold uppercase tracking-tight text-gray-400">
                <p>Terça a Quinta - 18h às 01h</p>
                <p>Sexta e Sábado - 18h às 03h</p>
                <p>Domingo - 17h às 00h</p>
              </div>
            </div>

            <div className="space-y-6">
               <h5 className="text-beer-gold font-display text-2xl uppercase tracking-widest">Resenha Digital</h5>
               <div className="flex justify-center md:justify-start gap-4">
                  <a href="https://www.instagram.com/zechoppnovoprogresso/" className="bg-white/5 p-4 rounded-full hover:bg-beer-gold hover:text-black transition-all">
                    <Instagram className="size-6" />
                  </a>
                  <a href="#" className="bg-white/5 p-4 rounded-full hover:bg-beer-gold hover:text-black transition-all">
                    <Phone className="size-6" />
                  </a>
                  <a href="#" className="bg-white/5 p-4 rounded-full hover:bg-beer-gold hover:text-black transition-all">
                    <MapPin className="size-6" />
                  </a>
               </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-700 font-black uppercase tracking-[0.6em]">
              PEÇA AO GARÇOM &bull; BEBA COM MODERAÇÃO &bull; ZÉ CHOPP STEAKHOUSE
            </div>
          </div>
        </div>
      </footer>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 100 }}
              className="bg-matte-black w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-beer-gold/30 relative"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-20 text-white hover:text-beer-gold transition-colors">
                <X className="size-10" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 min-h-[400px]">
                  <img 
                    src={selectedItem.imageUrl} 
                    alt={selectedItem.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                  <div className="space-y-8">
                     <span className="text-[10px] font-black tracking-[0.5em] text-beer-gold uppercase block bg-beer-gold/10 w-fit px-3 py-1">PREMIUM_ITEM</span>
                     <h3 className="text-5xl font-display text-white italic uppercase tracking-tighter leading-none">{selectedItem.name}</h3>
                     <p className="text-gray-400 text-lg leading-relaxed font-light italic">
                        "{selectedItem.description || 'A perfeição em forma de sabor. O acompanhamento ideal para sua caneca gelada.'}"
                     </p>

                     <div className="flex items-baseline gap-4 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Valor do Investimento</span>
                        <div className="text-6xl font-display text-beer-gold">{formatCurrency(selectedItem.price)}</div>
                     </div>

                     <div className="bg-beer-gold text-black py-5 font-display text-2xl text-center uppercase tracking-widest cursor-default">
                        Peça com o Garçom agora
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .border-text { -webkit-text-stroke: 1px #ffbf00; }
      `}} />
    </div>
  );
}
