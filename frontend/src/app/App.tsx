import { useState, useRef, useEffect } from "react";
import { Instagram, Youtube, Linkedin, ArrowRight, Check } from "lucide-react";
import { getCategories, getProjects, Category, Project } from "../services/api";

/* ─── Contact Page ────────────────────────────────── */
function ContactPage({ onHome }: { onHome: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-black/15 py-3 text-[13px] text-black placeholder-black/30 tracking-wide focus:outline-none focus:border-[#C8A96A] transition-colors duration-300";

  const labelClass =
    "block text-[9px] tracking-[0.45em] text-black/35 uppercase mb-2";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <SiteHeader onWorkClick={onHome} onLogoClick={onHome} onContactClick={() => {}} />

      {/* Divider */}
      <div className="mx-auto mb-12 h-px max-w-5xl" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

      {/* Form area */}
      <section className="px-8 pb-24 md:px-12 lg:px-16" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="mx-auto max-w-lg">
          {!sent ? (
            <>
              {/* Heading */}
              <div className="mb-10">
                <p className="text-[9px] tracking-[0.5em] text-[#C8A96A] uppercase mb-3">
                  Get in Touch
                </p>
                <h2
                  className="text-3xl font-light tracking-[0.12em] text-black uppercase"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Let's Work Together
                </h2>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label htmlFor="cf-name" className={labelClass}>Your Name</label>
                    <input
                      id="cf-name"
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className={labelClass}>Email Address</label>
                    <input
                      id="cf-email"
                      type="email"
                      required
                      placeholder="alex@studio.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-service" className={labelClass}>Type of Project</label>
                  <select
                    id="cf-service"
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={inputClass + " cursor-pointer appearance-none"}
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <option value="" disabled hidden>Select a service</option>
                    <option value="photography">Photography</option>
                    <option value="videography">Videography</option>
                    <option value="commercials">Commercials</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="events">Events Coverage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cf-message" className={labelClass}>Tell Us About Your Vision</label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    required
                    placeholder="Describe your project, timeline, and any details..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass + " resize-none leading-relaxed"}
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-1 flex w-full items-center justify-between border border-black/15 px-6 py-4 text-[10px] tracking-[0.4em] text-black/60 uppercase transition-all duration-300 hover:border-[#C8A96A]/60 hover:text-[#C8A96A] focus:outline-none"
                >
                  Send Message
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="text-center text-[10px] tracking-[0.3em] text-black/35" style={{ fontFamily: "'Inter', sans-serif" }}>
                  +91 8591126687
                </p>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#C8A96A]/40">
                <Check size={20} className="text-[#C8A96A]" strokeWidth={1.5} />
              </div>
              <p
                className="text-2xl font-light tracking-[0.15em] text-black uppercase mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Message Sent
              </p>
              <p className="text-[10px] tracking-[0.35em] text-black/35 uppercase mb-10">
                We'll be in touch shortly
              </p>
              <button
                onClick={onHome}
                className="text-[9px] tracking-[0.4em] text-black/30 uppercase hover:text-[#C8A96A] transition-colors duration-200 focus:outline-none"
              >
                Back to Work
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto pb-10 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="flex items-center justify-center gap-5 mb-4">
          <a href="https://www.instagram.com/vigxiivisuals?igsh=OTY0YWVmNjlrbXFj" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black/40 hover:text-black transition-colors duration-200">
            <Instagram size={18} strokeWidth={1.75} />
          </a>
          <a href="tel:+918591126687" aria-label="Phone" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
          <a href="https://wa.me/918591126687" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
          <a href="mailto:walunjvigxii@gmail.com" aria-label="Email" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
        <p className="text-[8px] tracking-[0.5em] text-black uppercase">
          VIGXII Visuals Co. by Vighnesh Walunj © 2026
        </p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918591126687"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110 z-50"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </div>
  );
}

/* ─── Shared Site Header ──────────────────────────── */
function SiteHeader({
  onWorkClick,
  onLogoClick,
  onContactClick,
}: {
  onWorkClick?: () => void;
  onLogoClick: () => void;
  onContactClick: () => void;
}) {
  return (
    <header className="flex flex-col items-center pt-10 pb-8 px-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Brand name */}
      <button
        onClick={onLogoClick}
        className="focus:outline-none"
        aria-label="Go to homepage"
      >
        <h1
          className="text-xl md:text-2xl font-medium tracking-[0.35em] text-black uppercase mb-4 hover:text-[#C8A96A] transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.3em" }}
        >
          VIGXII Visuals Co.
        </h1>
      </button>

      {/* Tagline */}
      <p className="text-[8px] tracking-[0.3em] text-black/30 uppercase mb-5 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        Visual Storytelling&nbsp;&nbsp;·&nbsp;&nbsp;Cinematic Excellence&nbsp;&nbsp;·&nbsp;&nbsp;Creative Direction
      </p>

      {/* Nav links */}
      <nav className="flex items-center gap-8">
        <button
          onClick={onWorkClick}
          className="text-[10px] tracking-[0.4em] text-black/55 uppercase transition-colors duration-200 hover:text-black focus:outline-none"
        >
          Work
        </button>
        <span className="text-black/15 text-[10px]">|</span>
        <button
          onClick={onContactClick}
          className="text-[10px] tracking-[0.4em] text-black/55 uppercase transition-colors duration-200 hover:text-black focus:outline-none"
        >
          Contact
        </button>
      </nav>
    </header>
  );
}

/* ─── Portfolio Card ──────────────────────────────── */
function PortfolioCard({
  category,
  onClick,
}: {
  category: Category;
  onClick: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group block w-full text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A]"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2", backgroundColor: "#f0f0f0" }}>
        {!imageError ? (
          <img
            src={category.coverUrl}
            alt={category.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => {
              console.error(`❌ Image failed to load: ${category.coverUrl}`);
              setImageError(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Image Unavailable</p>
          </div>
        )}
      </div>

      <div className="pt-3 pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p
          className="text-[11px] tracking-[0.35em] text-black/80 uppercase group-hover:text-[#C8A96A] transition-colors duration-300"
        >
          {category.title}
        </p>
        <p className="mt-1 text-[9px] tracking-[0.3em] text-black/25">
          {category.year}
        </p>
      </div>
    </button>
  );
}

/* ─── Home Page ───────────────────────────────────── */
function HomePage({
  categories,
  onCategoryClick,
  onContactClick,
  loading,
}: {
  categories: Category[];
  onCategoryClick: (id: string) => void;
  onContactClick: () => void;
  loading: boolean;
}) {
  const gridRef = useRef<HTMLElement>(null);

  const scrollToWork = () =>
    gridRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <SiteHeader onWorkClick={scrollToWork} onLogoClick={scrollToWork} onContactClick={onContactClick} />

      <div className="mx-auto mb-12 h-px max-w-5xl" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

      <section ref={gridRef} className="px-8 pb-4 md:px-12 lg:px-16">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[10px] tracking-[0.4em] text-black/30 uppercase">Loading...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[10px] tracking-[0.4em] text-black/30 uppercase">No categories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {categories.map((cat) => (
              <PortfolioCard
                key={cat._id}
                category={cat}
                onClick={() => onCategoryClick(cat._id)}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="mt-20 pb-10 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[9px] tracking-[0.45em] text-black/60 uppercase hover:text-[#C8A96A] transition-colors duration-200 focus:outline-none mb-6 block mx-auto"
        >
          Back to Top
        </button>
        <div className="flex items-center justify-center gap-5 mb-4">
          <a href="https://www.instagram.com/vigxiivisuals?igsh=OTY0YWVmNjlrbXFj" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black/40 hover:text-black transition-colors duration-200">
            <Instagram size={18} strokeWidth={1.75} />
          </a>
          <a href="tel:+918591126687" aria-label="Phone" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
          <a href="https://wa.me/918591126687" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
          <a href="mailto:walunjvigxii@gmail.com" aria-label="Email" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
        <p className="text-[8px] tracking-[0.5em] text-black uppercase">
          VIGXII Visuals Co. by Vighnesh Walunj © 2026
        </p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918591126687"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110 z-50"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </div>
  );
}

/* ─── Fullscreen Modal ───────────────────────────────── */
function FullscreenModal({ 
  mediaUrl, 
  isVideo, 
  title, 
  onClose 
}: { 
  mediaUrl: string; 
  isVideo: boolean; 
  title: string; 
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-light w-12 h-12 flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        ×
      </button>
      
      <div className="max-w-7xl max-h-full w-full" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            src={mediaUrl}
            className="w-full h-auto max-h-[90vh] object-contain"
            controls
            autoPlay
            loop
            playsInline
          />
        ) : (
          <img
            src={mediaUrl}
            alt={title}
            className="w-full h-auto max-h-[90vh] object-contain"
          />
        )}
      </div>
    </div>
  );
}

/* ─── Category Page ───────────────────────────────── */
function ProjectCard({ proj }: { proj: Project }) {
  const [mediaError, setMediaError] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const isVideo = proj.videoUrl && proj.videoUrl.trim() !== "";
  const mediaUrl = isVideo ? proj.videoUrl : proj.imageUrl;

  return (
    <>
      <button
        onClick={() => setShowFullscreen(true)}
        className="relative overflow-hidden group block w-full cursor-pointer"
        style={{ aspectRatio: "3/2", backgroundColor: "#f0f0f0" }}
      >
        {!mediaError && mediaUrl ? (
          isVideo ? (
            <video
              src={mediaUrl}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              autoPlay
              loop
              muted
              playsInline
              onError={() => {
                console.error(`❌ Video failed to load: ${mediaUrl}`);
                setMediaError(true);
              }}
            />
          ) : (
            <img
              src={mediaUrl}
              alt={proj.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
              onError={() => {
                console.error(`❌ Image failed to load: ${mediaUrl}`);
                setMediaError(true);
              }}
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Media Unavailable</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-center px-4">
            <p className="text-white text-sm tracking-[0.2em] uppercase mb-2">{proj.title}</p>
            <p className="text-white/70 text-[10px] tracking-wider">{proj.description}</p>
          </div>
        </div>
      </button>

      {showFullscreen && (
        <FullscreenModal
          mediaUrl={mediaUrl!}
          isVideo={isVideo}
          title={proj.title}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </>
  );
}

function CategoryPage({
  category,
  projects,
  onHome,
  onContactClick,
  loading,
}: {
  category: Category;
  projects: Project[];
  onHome: () => void;
  onContactClick: () => void;
  loading: boolean;
}) {
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => {
        const isVideo = p.videoUrl && p.videoUrl.trim() !== "";
        const isPhoto = p.imageUrl && p.imageUrl.trim() !== "";
        if (filter === "video") return isVideo;
        if (filter === "photo") return isPhoto && !isVideo;
        return false;
      });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <SiteHeader onWorkClick={onHome} onLogoClick={onHome} onContactClick={onContactClick} />

      <div className="mx-auto mb-12 h-px max-w-5xl" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

      <section className="px-8 pb-10 text-center md:px-12 lg:px-16">
        <h2
          className="text-2xl font-bold leading-none tracking-[0.12em] text-black md:text-3xl lg:text-4xl uppercase"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {category.title}
        </h2>

        <div className="mt-6 flex items-center justify-center gap-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          {(["photo", "video"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter((prev) => prev === type ? "all" : type)}
              className="px-5 py-2 text-[9px] tracking-[0.4em] uppercase transition-all duration-200 focus:outline-none border"
              style={{
                borderColor: filter === type ? "#C8A96A" : "rgba(0,0,0,0.15)",
                color: filter === type ? "#C8A96A" : "rgba(0,0,0,0.4)",
                backgroundColor: "transparent",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="px-8 pb-4 md:px-12 lg:px-16">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[10px] tracking-[0.4em] text-black/30 uppercase">Loading projects...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[10px] tracking-[0.4em] text-black/30 uppercase">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((proj) => (
              <ProjectCard key={proj._id} proj={proj} />
            ))}
          </div>
        )}
      </section>

      <footer className="mt-20 pb-10 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <button
          onClick={onHome}
          className="text-[9px] tracking-[0.45em] text-black/60 uppercase hover:text-[#C8A96A] transition-colors duration-200 focus:outline-none mb-6 block mx-auto"
        >
          Back to Top
        </button>
        <div className="flex items-center justify-center gap-5 mb-4">
          <a href="https://www.instagram.com/vigxiivisuals?igsh=OTY0YWVmNjlrbXFj" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black/40 hover:text-black transition-colors duration-200">
            <Instagram size={18} strokeWidth={1.75} />
          </a>
          <a href="tel:+918591126687" aria-label="Phone" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
          <a href="https://wa.me/918591126687" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
          <a href="mailto:walunjvigxii@gmail.com" aria-label="Email" className="text-black/40 hover:text-black transition-colors duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
        <p className="text-[8px] tracking-[0.5em] text-black uppercase">
          VIGXII Visuals Co. by Vighnesh Walunj © 2026
        </p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918591126687"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110 z-50"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </div>
  );
}

/* ─── Root ────────────────────────────────────────── */
type View = { type: "home" } | { type: "category"; id: string } | { type: "contact" };

export default function App() {
  const [view, setView] = useState<View>({ type: "home" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log("🔄 Loading data from API...");
    try {
      setLoading(true);
      setError(null);
      
      const [cats, projs] = await Promise.all([getCategories(), getProjects()]);
      
      console.log(`✅ Data loaded successfully: ${cats.length} categories, ${projs.length} projects`);
      console.log("Categories:", cats);
      console.log("Projects:", projs);
      
      setCategories(cats.sort((a, b) => a.order - b.order));
      setProjects(projs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load data";
      console.error("❌ Failed to load data:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => { setView({ type: "home" }); window.scrollTo({ top: 0 }); };
  const goContact = () => { setView({ type: "contact" }); window.scrollTo({ top: 0 }); };

  // Show error state
  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-6 py-2 bg-[#C8A96A] text-white text-xs tracking-wider uppercase rounded hover:bg-[#b39858] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (view.type === "contact") {
    return <ContactPage onHome={goHome} />;
  }

  if (view.type === "category") {
    const cat = categories.find((c) => c._id === view.id);
    const catProjects = projects.filter((p) => p.categoryId === view.id);
    
    console.log(`🎯 Viewing category: ${cat?.title}`);
    console.log(`Found ${catProjects.length} projects for category ${view.id}`);
    
    if (cat) {
      return (
        <CategoryPage
          category={cat}
          projects={catProjects}
          onHome={goHome}
          onContactClick={goContact}
          loading={false}
        />
      );
    } else {
      console.warn(`⚠️ Category not found: ${view.id}`);
      goHome();
      return null;
    }
  }

  return (
    <HomePage
      categories={categories}
      onCategoryClick={(id) => { 
        console.log(`👆 Category clicked: ${id}`);
        setView({ type: "category", id }); 
        window.scrollTo({ top: 0 }); 
      }}
      onContactClick={goContact}
      loading={loading}
    />
  );
}
