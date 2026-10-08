import { Link, useLocation, useRoute } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, Mail, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import autoGammaLogo from "@assets/image_1765169951823.png";
import facebookIcon from "@assets/facebook_1766217005798.png";
import instagramIcon from "@assets/—Pngtree—instagram_icon_instagram_logo_vector_3584852_1766216113430.png";
import youtubeIcon from "@assets/youtube_1766216255122.png";
import whatsappIcon from "@assets/apple_1791496591574.png";
import { socialLinks } from "@/lib/social-links";

function TireSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="#333" strokeWidth="4" fill="#1a1a1a" />
      <circle cx="50" cy="50" r="42" stroke="#444" strokeWidth="2" fill="#222" />
      <circle cx="50" cy="50" r="20" fill="#2a2a2a" stroke="#555" strokeWidth="2" />
      <circle cx="50" cy="50" r="8" fill="#666" />
      <circle cx="50" cy="50" r="4" fill="#888" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <rect x="48" y="22" width="4" height="16" fill="#444" rx="1" />
          <polygon points="50,6 46,18 54,18" fill="#333" />
        </g>
      ))}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => (
        <line 
          key={`spoke-${i}`} 
          x1="50" y1="50" 
          x2={50 + 16 * Math.cos((angle * Math.PI) / 180)} 
          y2={50 + 16 * Math.sin((angle * Math.PI) / 180)} 
          stroke="#555" 
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let wasScrolled = window.scrollY > 50;
    if (wasScrolled) setIsScrolled(true);

    const handleScroll = () => {
      const isNowScrolled = window.scrollY > 50;
      if (isNowScrolled === wasScrolled) return;

      wasScrolled = isNowScrolled;
      setIsScrolled(isNowScrolled);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);
  

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about", disabled: true },
    { 
      name: "SERVICES", 
      href: "/services",
      submenu: [
        { name: "WASHING & QUICK CARE", href: "/services#washing-quick-care" },
        { name: "DETAILING", href: "/services#detailing" },
        { name: "COATINGS & PROTECTION", href: "/services#coatings-protection" },
        { name: "PPF & COLOR WRAPS", href: "/services#ppf-color-wraps" },
        { name: "REPAIR & RESTORATION", href: "/services#repair-restoration" },
      ]
    },
  ];

  const headerSectionLinks = [
    { name: "ESTIMATE CALCULATOR", sectionId: "service-price-calculator" },
    { name: "CONTACT US", sectionId: "contact" },
  ];

  const handleSectionNavigation = (sectionId: string) => {
    setIsMobileMenuOpen(false);

    const scrollToTarget = (attempt = 0) => {
      const target = document.getElementById(sectionId);
      if (!target) {
        if (attempt < 20) window.setTimeout(() => scrollToTarget(attempt + 1), 50);
        return;
      }

      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 12;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    if (location !== "/") {
      setLocation("/");
      window.setTimeout(() => scrollToTarget(), 50);
    } else {
      scrollToTarget();
    }
  };

  const handleBookNow = () => {
    handleSectionNavigation("contact");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">


      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar - Contact & Social */}
        <div className="bg-black">
          <div className="max-w-[1400px] mx-auto px-6 py-1 flex justify-between items-center">
            {/* Contact Info */}
            <div className="hidden md:flex items-center gap-4 text-white text-xs font-medium">
              <a href="mailto:info@autogamma.in" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail size={14} className="text-white" />
                <span>info@autogamma.in</span>
              </a>
              <span className="text-white">|</span>
              <a href="tel:+919226882024" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Phone size={14} className="text-white" />
                <span>+91 92268 82024</span>
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div className="hidden md:flex items-center gap-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className="w-full h-full object-contain" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" className="w-full h-full object-contain" />
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="YouTube">
                <img src={youtubeIcon} alt="YouTube" className="w-full h-full object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="bg-black border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 py-1 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="cursor-pointer shrink-0">
              <img 
                src={autoGammaLogo} 
                alt="Auto Gamma" 
                className="h-8 md:h-9 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.disabled ? (
                    <span
                      aria-disabled="true"
                      className="flex cursor-default select-none items-center gap-1 py-2 text-sm font-medium tracking-wide text-white font-sora"
                    >
                      {link.name}
                    </span>
                  ) : (
                    <Link 
                      href={link.href}
                      className="relative group cursor-pointer py-2 flex items-center gap-1"
                    >
                      <span className="text-sm font-medium tracking-wide transition-colors text-white font-sora">
                        {link.name}
                      </span>
                      {link.submenu && <ChevronDown size={14} className="text-white" />}
                    </Link>
                  )}
                  {!link.disabled && (
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                      location === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  )}
                  
                  {/* Services Dropdown */}
                  {link.submenu && (
                    <div className="absolute left-0 mt-0 w-56 bg-black border border-white/20 rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 group-hover:mt-2 z-50">
                      {link.submenu.map((item) => (
                        <Link 
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-3 text-sm font-medium text-white hover:bg-primary/20 hover:text-primary border-b border-white/10 last:border-b-0 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {headerSectionLinks.map((link) => (
                <button
                  key={link.sectionId}
                  type="button"
                  onClick={() => handleSectionNavigation(link.sectionId)}
                  className="relative group cursor-pointer py-2 flex items-center gap-1 border-0 bg-transparent"
                >
                  <span className="text-sm font-medium tracking-wide transition-colors text-white font-sora">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Service Enquiry Button */}
            <div className="hidden lg:block">
              <Button 
                onClick={handleBookNow} 
                className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2 uppercase tracking-wider text-xs font-poppins -skew-x-12"
              >
                SERVICE ENQUIRY
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-primary lg:hidden"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-[2px] lg:hidden"
          >
            <motion.aside
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              onClick={(event) => event.stopPropagation()}
              className="absolute inset-y-0 right-0 flex h-[100dvh] w-[88vw] max-w-[380px] flex-col overflow-y-auto border-l border-primary/30 bg-neutral-950 px-6 pb-8 pt-24 shadow-2xl shadow-black/70"
            >
              <div className="mb-5 border-b border-white/10 pb-4">
                <p className="font-sora text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Auto Gamma
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <h2 className="font-poppins text-base font-bold uppercase tracking-[0.14em] text-white">
                    Navigation
                  </h2>
                  <span className="h-px w-12 bg-primary/70" />
                </div>
              </div>

              <nav aria-label="Mobile navigation links" className="flex flex-col">
                {navLinks.map((link) => (
                  link.disabled ? (
                    <span
                      key={link.name}
                      aria-disabled="true"
                      className="flex items-center justify-between border-b border-white/10 py-4 font-poppins text-sm font-semibold tracking-[0.12em] text-white/75"
                    >
                      {link.name}
                    </span>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-white/10 py-4 font-poppins text-sm font-semibold tracking-[0.12em] text-white transition-colors hover:text-primary"
                    >
                      {link.name}
                      <ChevronRight size={16} className="text-primary transition-transform group-hover:translate-x-1" />
                    </Link>
                  )
                ))}

                {headerSectionLinks.map((link) => (
                  <button
                    key={link.sectionId}
                    type="button"
                    onClick={() => handleSectionNavigation(link.sectionId)}
                    className="group flex w-full items-center justify-between border-b border-white/10 bg-transparent py-4 text-left font-poppins text-sm font-semibold tracking-[0.12em] text-white transition-colors hover:text-primary"
                  >
                    {link.name}
                    <ChevronRight size={16} className="text-primary transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </nav>

              <Button
                className="mt-6 h-11 w-full rounded-none border border-primary bg-primary font-poppins text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-primary/90"
                onClick={handleBookNow}
              >
                SERVICE ENQUIRY
              </Button>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="mb-3 font-sora text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                  Contact
                </p>
                <div className="space-y-3">
                  <a href="mailto:info@autogamma.in" className="group flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/40 bg-black text-primary transition-colors group-hover:border-primary">
                      <Mail size={15} />
                    </span>
                    <span className="font-poppins text-sm text-white/85 transition-colors group-hover:text-white">
                      info@autogamma.in
                    </span>
                  </a>
                  <a href="tel:+919226882024" className="group flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/40 bg-black text-primary transition-colors group-hover:border-primary">
                      <Phone size={15} />
                    </span>
                    <span className="font-poppins text-sm text-white/85 transition-colors group-hover:text-white">
                      +91 92268 82024
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 font-sora text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/60 p-2 transition-colors hover:border-primary/50 hover:bg-white/5">
                    <img src={facebookIcon} alt="" className="h-full w-full object-contain" />
                  </a>
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/60 p-2 transition-colors hover:border-primary/50 hover:bg-white/5">
                    <img src={instagramIcon} alt="" className="h-full w-full object-contain" />
                  </a>
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/60 p-2 transition-colors hover:border-primary/50 hover:bg-white/5">
                    <img src={youtubeIcon} alt="" className="h-full w-full object-contain" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-16 pb-8 font-poppins text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-4">
          <div className="mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1.2fr_1.3fr]">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <img 
                src={autoGammaLogo} 
                alt="Auto Gamma" 
                loading="lazy"
                decoding="async"
                className="h-8 w-auto object-contain"
              />
              <p className="text-base italic leading-relaxed text-white">
                "THE REALM OF AUTOMOTIVE LUXURY AND THE TRANSFORMATIVE POWER OF PRECISION DETAILING, WHERE EVERY DETAIL MATTERS."
              </p>
              <div className="flex gap-4">
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src={facebookIcon} alt="Facebook" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src={instagramIcon} alt="Instagram" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src={youtubeIcon} alt="YouTube" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-poppins font-bold text-white uppercase">QUICK LINKS</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.disabled ? (
                      <span aria-disabled="true" className="flex items-center gap-2 font-poppins text-base uppercase text-white">
                        <ChevronRight size={14} className="text-primary" />
                        {link.name}
                      </span>
                    ) : (
                      <Link href={link.href} className="group flex cursor-pointer items-center gap-2 font-poppins text-base uppercase text-white transition-colors hover:text-primary">
                        <ChevronRight size={14} className="text-primary transition-transform group-hover:translate-x-1" />
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
                {headerSectionLinks.map((link) => (
                  <li key={link.sectionId}>
                    <button
                      type="button"
                      onClick={() => handleSectionNavigation(link.sectionId)}
                      className="group flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-poppins text-base uppercase text-white transition-colors hover:text-primary"
                    >
                      <ChevronRight size={14} className="text-primary transition-transform group-hover:translate-x-1" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-poppins font-bold text-white uppercase">SERVICES</h4>
              <ul className="space-y-3">
                {navLinks.find(link => link.name === "SERVICES")?.submenu?.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href} className="group flex cursor-pointer items-center gap-2 font-poppins text-base uppercase text-white transition-colors hover:text-primary">
                      <ChevronRight size={14} className="text-primary transition-transform group-hover:translate-x-1" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-1">
              <h4 className="text-lg font-poppins font-bold text-white uppercase">CONTACT US</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base leading-relaxed text-white">
                  <MapPin className="text-primary shrink-0 mt-1" size={18} />
                  <span>Shop no. 16 & 17, Shreeji Parasio, Beside Tulsi Aangan Soc., Prasad Hotel Road, Badlapur, Maharashtra - 421503</span>
                </li>
                <li className="flex items-center gap-3 text-base text-white">
                  <Phone className="text-primary shrink-0" size={18} />
                  <a href="tel:+919226882024" className="font-poppins text-base text-white hover:text-primary">+91 92268 82024</a>
                </li>
                <li className="flex items-center gap-3 text-base text-white">
                  <Mail className="text-primary shrink-0" size={18} />
                  <a href="mailto:info@autogamma.in" className="font-poppins text-base text-white hover:text-primary">info@autogamma.in</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-4 border-t border-white/10 pt-6 text-sm text-white md:grid-cols-[1.15fr_1.15fr_1fr] md:gap-6">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} AUTO GAMMA. ALL RIGHTS RESERVED.
            </p>
            <p className="text-center">
              DEVELOPED BY{" "}
              <a href="https://www.airavatatechnologies.com/" target="_blank" rel="noopener noreferrer" className="font-bold tracking-wider text-white transition-colors hover:text-primary">
                AIRAVATA TECHNOLOGIES
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium uppercase text-white md:justify-end">
              <a href="#" className="hover:text-primary">PRIVACY POLICY</a>
              <a href="#" className="hover:text-primary">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/918080639310?text=Hello%2C%20I%27m%20interested."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp at +91 80806 39310"
        title="Chat on WhatsApp"
        className="fixed bottom-2 right-2 z-[60] h-14 w-14 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:bottom-3 sm:right-3 sm:h-16 sm:w-16"
      >
        <img
          src={whatsappIcon}
          alt=""
          className="h-full w-full object-contain"
          decoding="async"
        />
      </a>
    </div>
  );
}
