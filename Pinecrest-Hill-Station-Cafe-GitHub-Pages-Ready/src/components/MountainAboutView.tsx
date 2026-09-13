import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Coffee, 
  CupSoda, 
  Croissant, 
  Navigation,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const MountainAboutView: React.FC = () => {
  const { settings, setActivePage } = useApp();

  return (
    <div className="min-h-screen bg-[#0D0805] text-[#FAF5EF] py-6 sm:py-10 px-3 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner Image with Clean Title */}
      <section 
        aria-labelledby="about-heading"
        className="max-w-5xl mx-auto"
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2E1A11] shadow-2xl h-64 sm:h-96">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=85"
            alt="Warm inviting interior of Pinecrest Cafe & Juicery with mountain forest backdrop"
            className="w-full h-full object-cover object-center filter brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0805] via-[#0D0805]/40 to-black/30" />

          <div className="absolute bottom-6 left-5 sm:left-8 right-5 sm:right-8 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-[#E6B87D] border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>About Pinecrest Cafe & Juicery</span>
            </div>
            <h1 id="about-heading" className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Crafted With Mountain Passion
            </h1>
            <p className="text-xs sm:text-sm text-[#D6C7B8] leading-relaxed max-w-xl">
              Fresh 100% cold-pressed orchard juices, single-origin mountain roasts, and oven-warm bakery crafted daily in a serene hill station haven.
            </p>
          </div>
        </div>
      </section>

      {/* Clean 3-Pillar Philosophy (Minimalist & Crisp) */}
      <section 
        aria-label="Cafe Values and Craft"
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="p-5 sm:p-6 rounded-2xl bg-[#140D09] border border-[#2E1A11] space-y-2.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-[#1C120B] border border-[#381F14] flex items-center justify-center text-amber-300">
            <CupSoda className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#FAF5EF]">100% Cold-Pressed</h3>
          <p className="text-xs text-[#A8988C] leading-relaxed">
            Pure apples, Valencia oranges, and crisp greens pressed cold with zero added sugar or artificial preservatives.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#140D09] border border-[#2E1A11] space-y-2.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-[#1C120B] border border-[#381F14] flex items-center justify-center text-amber-300">
            <Coffee className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#FAF5EF]">Artisanal Mountain Roasts</h3>
          <p className="text-xs text-[#A8988C] leading-relaxed">
            Direct-trade single-origin Arabica beans roasted in small batches for an extraordinarily smooth and fragrant cup.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#140D09] border border-[#2E1A11] space-y-2.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-[#1C120B] border border-[#381F14] flex items-center justify-center text-amber-300">
            <Croissant className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#FAF5EF]">Hearth Wood-Fired Bakes</h3>
          <p className="text-xs text-[#A8988C] leading-relaxed">
            Flaky golden French croissants, cinnamon rolls, and artisan rustic sourdough baked fresh every single morning.
          </p>
        </div>
      </section>

      {/* Direct Location & Visiting Details Card (Requested by User) */}
      <section 
        aria-labelledby="location-heading"
        className="max-w-5xl mx-auto"
      >
        <div className="bg-[#140D09] rounded-2xl sm:rounded-3xl border border-[#2E1A11] p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26150C] pb-6">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E6B87D] mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Visit Us</span>
              </div>
              <h2 id="location-heading" className="text-xl sm:text-3xl font-extrabold text-[#FAF5EF]">
                Cafe Location & Operating Hours
              </h2>
              <p className="text-xs sm:text-sm text-[#A8988C] mt-1">
                Drop by for a relaxed morning brew or scenic evening dining. Walk-ins always welcome!
              </p>
            </div>

            <button
              onClick={() => {
                setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all self-start sm:self-auto cursor-pointer"
            >
              <span>Order From Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Practical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs">
            
            {/* Address */}
            <div className="p-4 rounded-xl bg-[#1C120B] border border-[#2E1A11] space-y-2">
              <div className="flex items-center gap-2 text-[#E6B87D] font-bold">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Our Address</span>
              </div>
              <p className="text-[#FAF5EF] font-medium leading-relaxed">
                {settings.address || 'Ridge Road, Pinecrest Viewpoint, Mountain Pass'}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address || 'Pinecrest Cafe')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E6B87D] hover:underline mt-1"
                aria-label="Open location in Google Maps"
              >
                <Navigation className="w-3 h-3" />
                <span>Get Google Maps Directions</span>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-[#1C120B] border border-[#2E1A11] space-y-2">
              <div className="flex items-center gap-2 text-[#E6B87D] font-bold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Opening Hours</span>
              </div>
              <p className="text-[#FAF5EF] font-medium leading-relaxed">
                {settings.openingHours || 'Monday - Sunday: 7:00 AM – 10:00 PM'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                Open Daily for Dine-In & Takeaway
              </span>
            </div>

            {/* Contact & Line */}
            <div className="p-4 rounded-xl bg-[#1C120B] border border-[#2E1A11] space-y-2 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-[#E6B87D] font-bold">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Direct Contact</span>
              </div>
              <p className="text-[#FAF5EF] font-medium">
                Phone: <span className="text-[#E6B87D]">{settings.phone || '+1 (555) 349-2810'}</span>
              </p>
              <p className="text-[#A8988C]">
                Email: {settings.email || 'hello@pinecrestcafe.com'}
              </p>
            </div>

          </div>

          {/* Interactive Google Map Visual Card */}
          <div className="rounded-2xl overflow-hidden border border-[#2E1A11] relative h-64 sm:h-72 bg-[#100A06]">
            {/* Visual Styled Map Mockup / Live Directions */}
            <iframe
              title="Pinecrest Cafe Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%)' }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=32.2396,77.1887&hl=en&z=14&output=embed"
            />
            
            {/* Overlay Chip */}
            <div className="absolute top-3 left-3 bg-[#120B07]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs flex items-center gap-2 shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white">Pinecrest Cafe & Juicery</span>
            </div>

            <div className="absolute bottom-3 right-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address || 'Pinecrest Cafe')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#8B1E1E] text-white text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-[#A32323] transition-colors"
                aria-label="Open directions in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
