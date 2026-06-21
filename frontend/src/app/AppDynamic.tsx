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

      <div className="mx-auto mb-12 h-px max-w-5xl" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

      <section className="px-8 pb-24 md:px-12 lg:px-16" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="mx-auto max-w-lg">
          {!sent ? (
            <>
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

      <footer className="mt-auto pb-10 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-[8px] tracking-[0.5em] text-black/15 uppercase">
          VIGXII Visuals Co. by Vighnesh Walunj © 2024
        </p>
      </footer>
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

      <p className="text-[8px] tracking-[0.3em] text-black/30 uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
        Visual Storytelling&nbsp;&nbsp;·&nbsp;&nbsp;Cinematic Excellence&nbsp;&nbsp;·&nbsp;&nbsp;Creative Direction
      </p>

      <nav className="flex items-center gap-8 mb-4">
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

      <div className="flex items-center gap-5">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-black/40 hover:text-black transition-colors duration-200"
        >
          <Instagram size={14} strokeWidth={1.75} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="text-black/40 hover:text-black transition-colors duration-200"
        >
          <Youtube size={14} strokeWidth={1.75} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-black/40 hover:text-black transition-colors duration-200"
        >
          <Linkedin size={14} strokeWidth={1.75} />
        </a>
      </div>
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
  return (
    <button
      onClick={onClick}
      className="group block w-full text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A]"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2", backgroundColor: "#f0f0f0" }}>
        <img
          src={category.coverUrl}
          alt={category.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
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
          className="text-[9px] tracking-[0.45em] text-black/30 uppercase hover:text-[#C8A96A] transition-colors duration-200 focus:outline-none mb-6 block mx-auto"
        >
          Back to Top
        </button>
        <p className="text-[8px] tracking-[0.5em] text-black/15 uppercase">
          VIGXII Visuals Co. by Vighnesh Walunj © 2024
        </p>
      </footer>
    </div>
  );
}

/* ─── Category Page ───────────────────────────────── */
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
    : projects.filter((p) => p.type === filter);

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
              <div
                key={proj._id}
                className="relative overflow-hidden group"
                style={{ aspectRatio: "3/2", backgroundColor: "#f0f0f0" }}
              >
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center px-4">
                    <p className="text-white text-sm tracking-[0.2em] uppercase mb-2">{proj.title}</p>
                    <p className="text-white/70 text-[10px] tracking-wider">{proj.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-20 pb-10 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <button
          onClick={onHome}
          className="text-[9px] tracking-[0.45em] text-black/30 uppercase hover:text-[#C8A96A] transition-colors duration-200 focus:outline-none mb-6 block mx-auto"
        >
          Back to Top
        </button>
        <p className="text-[8px] tracking-[0.5em] text-black/15 uppercase">
          VIGXII Visuals Co. by Vighnesh Walunj © 2024
        </p>
      </footer>
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cats, projs] = await Promise.all([getCategories(), getProjects()]);
      setCategories(cats.sort((a, b) => a.order - b.order));
      setProjects(projs);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => { setView({ type: "home" }); window.scrollTo({ top: 0 }); };
  const goContact = () => { setView({ type: "contact" }); window.scrollTo({ top: 0 }); };

  if (view.type === "contact") {
    return <ContactPage onHome={goHome} />;
  }

  if (view.type === "category") {
    const cat = categories.find((c) => c._id === view.id);
    const catProjects = projects.filter((p) => p.categoryId === view.id);
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
    }
  }

  return (
    <HomePage
      categories={categories}
      onCategoryClick={(id) => { setView({ type: "category", id }); window.scrollTo({ top: 0 }); }}
      onContactClick={goContact}
      loading={loading}
    />
  );
}
