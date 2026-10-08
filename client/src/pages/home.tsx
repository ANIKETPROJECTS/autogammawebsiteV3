import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Star, Shield, Zap, Trophy, CheckCircle2, MapPin, Phone, Mail, Loader2, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { socialLinks } from "@/lib/social-links";
import { serviceCategories } from "@/lib/service-catalog-data";

import heroVideo from "@assets/auto-gamma-hero-full-quality.mp4";
import heroImage from "@assets/generated_images/cinematic_luxury_dark_car_hero_background_with_red_accents.png";
import workVideo1 from "@assets/SaveClip.App_AQMd6NABHBJJB4C0siIEzy325gx5Jd-sBiXBdbMmWREu0866B_1791486691994.mp4";
import workVideo2 from "@assets/SaveClip.App_AQNFx3Dph_SB8R8atX1DtpJjRrcBW5EFprMZokhn_bsHw4tb0_1791486691997.mp4";
import workVideo3 from "@assets/SaveClip.App_AQObMcBJiE4eQsQBDIUo5-ZaQgngHhpPvne1PJmfEx9PD5hy2_1791486691997.mp4";
import workVideo4 from "@assets/SaveClip.App_AQPgepV2f1Sw5YIojJLepPaxeYmaPJQAhuDrslzyIXLqh5Joh_1791486691997.mp4";
import workVideo5 from "@assets/SaveClip.App_AQPGlq3p0cduWKte2kUPn1hQaW6Uw5V13N33r-7jF8NEoGNtc_1791486691998.mp4";
import workVideo6 from "@assets/SaveClip.App_AQPi_hEtHigDjfu5KiDB0d2jFnvA70NJlen1e3c0qZX_1NurP_1791486691998.mp4";
import workVideo7 from "@assets/SaveClip.App_AQPoOh-6brl75mSuE4IRefFE0eKyF1-CVjbxS8V0_VsAROTSp_1791486691998.mp4";
import workVideo8 from "@assets/SaveClip.App_AQPttbfVXQQ01MctDQmRZqEdILAe2r4oXe6Syp0kToYSOUnfv_1791486691999.mp4";
import clientVideo1 from "@assets/SaveClip.App_AQMStN2KrwenyUCIS35TWX8gnXh89d5NiK3K2agkcqDzwlkgO_1791474111888.mp4";
import clientVideo2 from "@assets/SaveClip.App_AQNqjeKMFRvYari-h4SL9gJZiqyVbWT0VDDQLle-8mo7vcSgB_1791474116619.mp4";
import clientVideo3 from "@assets/SaveClip.App_AQNsQkBr0Qcoucd6v4RlMvm-L5X9xTO6RZQl_XCG7hnlx_R3O_1791474258371.mp4";
import clientVideo4 from "@assets/SaveClip.App_AQM2G0UiCGb_fHx035z0aucRbJQYhjMsv8XN5lL3xLqY0M9OP_1791474707507.mp4";
import clientVideoPoster1 from "@assets/featured-client-1-poster.jpg";
import clientVideoPoster2 from "@assets/featured-client-2-poster.jpg";
import clientVideoPoster3 from "@assets/featured-client-3-poster.jpg";
import clientVideoPoster4 from "@assets/featured-client-4-poster.jpg";
import serviceWashingImage from "@assets/service-washing.webp";
import serviceDetailingImage from "@assets/service-detailing.webp";
import serviceCoatingsImage from "@assets/service-coatings.webp";
import servicePpfWrapsImage from "@assets/service-ppf-wraps.webp";
import serviceRepairImage from "@assets/service-repair-restoration.webp";
import facebookIcon from "@assets/facebook_1766217005798.png";
import instagramIcon from "@assets/—Pngtree—instagram_icon_instagram_logo_vector_3584852_1766216113430.png";
import youtubeIcon from "@assets/youtube_1766216255122.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } }
} as const;

const fadeInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } }
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } }
} as const;

const staggerFast = {
  visible: { transition: { staggerChildren: 0.03 } }
} as const;

type LazyLoopVideoProps = {
  src: string;
  poster?: string;
  label: string;
  className: string;
  controls?: boolean;
  eagerPoster?: boolean;
};

function LazyLoopVideo({
  src,
  poster,
  label,
  className,
  controls = false,
  eagerPoster = false,
}: LazyLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isNearViewport = useInView(videoRef, { margin: "120px" });
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  useEffect(() => {
    if (isNearViewport) setHasEnteredViewport(true);
  }, [isNearViewport]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasEnteredViewport) return;

    if (isNearViewport) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [hasEnteredViewport, isNearViewport]);

  return (
    <video
      ref={videoRef}
      src={hasEnteredViewport ? src : undefined}
      poster={hasEnteredViewport || eagerPoster ? poster : undefined}
      autoPlay={isNearViewport}
      loop
      muted
      playsInline
      controls={controls}
      preload="none"
      aria-label={label}
      className={className}
    />
  );
}

// Carousel Component
function CarouselContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isNearViewport = useInView(carouselRef, { margin: "120px" });
  const reviewsData = [
    { name: "Rajesh Sharma", vehicle: "BMW 7 Series", location: "Mumbai", rating: 5, text: "Absolutely incredible service! My BMW looks brand new after the ceramic coating. The attention to detail is unmatched." },
    { name: "Priya Patel", vehicle: "Mercedes C-Class", location: "Pune", rating: 5, text: "Auto Gamma transformed my car completely. The PPF installation was flawless and the team was very professional." },
    { name: "Amit Kumar", vehicle: "Audi Q5", location: "Thane", rating: 5, text: "Best detailing service in the region. They treat every car like it's their own. Highly recommended!" },
    { name: "Sneha Deshmukh", vehicle: "Range Rover", location: "Navi Mumbai", rating: 5, text: "The interior deep cleaning service is outstanding. My car smells fresh and looks pristine inside." },
    { name: "Vikram Singh", vehicle: "Porsche 911", location: "Badlapur", rating: 5, text: "Premium service at reasonable prices. The ceramic coating has made my car shine like never before." },
    { name: "Ananya Reddy", vehicle: "Jaguar XF", location: "Kalyan", rating: 5, text: "Exceptional craftsmanship! The team at Auto Gamma really knows their work. Will definitely return." },
    { name: "Rohan Gupta", vehicle: "Audi A6", location: "Delhi", rating: 5, text: "Fantastic experience! The PPF application was perfect and the attention to detail was outstanding." },
    { name: "Kavya Sharma", vehicle: "BMW X5", location: "Bangalore", rating: 5, text: "The ceramic coating makes my car look showroom fresh. Highly professional team and excellent service." },
    { name: "Arjun Singh", vehicle: "Mercedes E-Class", location: "Hyderabad", rating: 5, text: "Best auto detailing service I've ever used. The interior steam cleaning was thorough and professional." },
    { name: "Pooja Nair", vehicle: "Range Rover Evoque", location: "Kochi", rating: 5, text: "Outstanding work! The paint protection film has given me peace of mind. Great team and great results." },
  ];

  useEffect(() => {
    if (!isNearViewport) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isNearViewport, reviewsData.length]);

  const itemsPerView = 8;
  const visibleReviews = Array.from({ length: itemsPerView }, (_, i) => 
    reviewsData[(currentIndex + i) % reviewsData.length]
  );

  return (
    <div ref={carouselRef} className="space-y-5">
      <div className="relative h-[1776px] sm:h-[880px] lg:h-[432px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleReviews.map((review) => (
              <Card key={`${currentIndex}-${review.name}`} className="h-full min-h-0 overflow-hidden rounded-none border-[0.3px] border-primary/50 bg-white/5">
                <CardContent className="flex h-full min-h-0 flex-col p-4">
                  <div className="mb-2">
                    <h4 className="text-sm font-semibold text-white">{review.name}</h4>
                    <p className="text-xs text-white/60">{review.vehicle}</p>
                  </div>
                  <div className="mb-2 flex gap-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mb-2 flex-grow overflow-hidden text-sm leading-relaxed text-white/80 line-clamp-4">"{review.text}"</p>
                  <p className="flex items-center gap-1 text-xs text-white/50">
                    <MapPin size={11} /> {review.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2">
        {reviewsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Show review set starting with ${reviewsData[idx].name}`}
            aria-pressed={idx === currentIndex}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-primary w-6' : 'bg-white/30 w-2'
            }`}
            data-testid={`carousel-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}

function AnimatedMetricValue({ value, suffix = "" }: { value: number; suffix?: string }) {
  const valueRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(valueRef, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-US")
  );

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [count, isInView, value]);

  return (
    <p
      ref={valueRef}
      className="font-poppins text-4xl sm:text-5xl font-semibold leading-none text-white"
    >
      <motion.span aria-hidden="true">{displayValue}</motion.span>
      <span aria-hidden="true">{suffix}</span>
      <span className="sr-only">{`${value.toLocaleString("en-US")}${suffix}`}</span>
    </p>
  );
}

export default function Home() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="hero-bg relative w-full flex flex-col md:h-screen" 
      >
        <div className="relative w-full aspect-video md:absolute md:inset-0 md:h-full md:aspect-auto">
          <LazyLoopVideo
            src={heroVideo}
            poster={heroImage}
            label="Auto Gamma featured vehicle"
            className="h-full w-full object-cover"
            eagerPoster
          />
        </div>
        
        {/* Main Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16 relative z-10 hidden md:flex">
          
        </div>

        {/* Services Card at Bottom of Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20 w-full"
        >
          <div className="bg-black/90 border-t border-b border-white/10 py-4 md:py-5 overflow-hidden">
            <div className="w-full px-0">
              <div className="flex animate-marquee-services whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 md:gap-8 px-4">
                    {[
                      "Washing & Quick Care",
                      "Detailing",
                      "Coatings & Protection",
                      "PPF & Color Wraps",
                      "Repair & Restoration",
                    ].flatMap((category, index) => [
                      <span
                        key={category}
                        className={`${index % 2 === 0 ? "text-primary" : "text-white"} font-semibold uppercase tracking-wide text-xs md:text-sm lg:text-base`}
                      >
                        {category}
                      </span>,
                      <span key={`${category}-divider`} className="font-bold text-white">|</span>,
                    ])}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Client Stories */}
      <section id="featured-clients" className="pt-2 pb-4 md:pt-4 md:pb-5 bg-neutral-950 relative">
        <div className="w-full max-w-[1400px] px-2 sm:px-4 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="text-center mb-4 md:mb-5"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-poppins normal-case tracking-normal leading-tight text-white">
              Celebrity Favorites &amp; Reviews
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3"
          >
            {[
              { video: clientVideo1, poster: clientVideoPoster1 },
              { video: clientVideo2, poster: clientVideoPoster2 },
              { video: clientVideo3, poster: clientVideoPoster3 },
              { video: clientVideo4, poster: clientVideoPoster4 },
            ].map(({ video, poster }, index) => (
              <motion.article key={video} variants={fadeInUp} className="min-w-0">
                <div className="relative aspect-[9/17] overflow-hidden border-[0.3px] border-primary/50 bg-neutral-900 flex flex-col items-center justify-center gap-3">
                  <LazyLoopVideo
                    src={video}
                    poster={poster}
                    label={`Featured client video ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Services Catalogue */}
      <section id="services" className="pt-2 pb-4 md:pt-4 md:pb-5 bg-neutral-950 relative overflow-hidden">
        
        <div className="w-full max-w-[1400px] px-2 sm:px-4 mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-4 md:mb-5 px-4"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-medium font-poppins normal-case tracking-normal leading-tight text-white"
            >
              Our Craft &amp; Expertise
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerFast}
            className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch gap-4 md:gap-6"
          >
            {[
              {
                title: "Washing & Quick Care",
                image: serviceWashingImage,
                alt: "Washing and quick care services: washing, wash and shine, dressing, tar remover, and vacuuming.",
              },
              {
                title: "Detailing",
                image: serviceDetailingImage,
                alt: "Detailing services: interior detailing, exterior detailing, and interior steam.",
              },
              {
                title: "Coatings & Protection",
                image: serviceCoatingsImage,
                alt: "Coatings and protection services: graphene, borophene, windshield glass, and anti-rust coatings.",
              },
              {
                title: "Paint Protection Film (PPF) & Color Wraps",
                image: servicePpfWrapsImage,
                alt: "Paint protection film and color wrap services: Interior PPF, Exterior PPF, and PPF Maintenance.",
              },
              {
                title: "Repair & Restoration",
                image: serviceRepairImage,
                alt: "Repair and restoration services: Denting Painting and Glass Polishing.",
              },
            ].map((category) => (
              <motion.article
                key={category.title}
                variants={fadeInUp}
                className="h-full w-full min-w-0"
              >
                <figure className="overflow-hidden border-[0.3px] border-primary/50 bg-neutral-950">
                  <img
                    src={category.image}
                    alt={category.alt}
                    width={1920}
                    height={1072}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </figure>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Business Impact */}
      <section id="our-impact" className="py-4 md:py-6 bg-neutral-950">
        <div className="w-full max-w-[1400px] px-2 sm:px-4 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerFast}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { value: 5000, suffix: "+", label: "Customers served" },
              { value: 8000, suffix: "+", label: "Vehicles serviced" },
              { value: 5, suffix: "", label: "Years of experience" },
              { value: 25, suffix: "+", label: "Service categories" },
            ].map((metric) => (
              <motion.article
                key={metric.label}
                variants={fadeInUp}
                className="border-[0.3px] border-primary/50 bg-neutral-900/40 px-5 py-6 text-center"
              >
                <AnimatedMetricValue value={metric.value} suffix={metric.suffix} />
                <p className="mt-3 font-poppins text-sm sm:text-base text-white/70">
                  {metric.label}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Work in Action */}
      <section id="work-in-action" className="pt-2 pb-4 md:pt-4 md:pb-5 bg-neutral-950 relative">
        <div className="w-full max-w-[1400px] px-2 sm:px-4 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="text-center mb-4 md:mb-5"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-poppins normal-case tracking-normal leading-tight text-white">
              Our Work in Action
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3"
          >
            {[
              workVideo1,
              workVideo2,
              workVideo3,
              workVideo4,
              workVideo5,
              workVideo6,
              workVideo7,
              workVideo8,
            ].map((video, index) => (
              <motion.article key={video} variants={fadeInUp} className="min-w-0">
                <div className="relative aspect-[9/17] overflow-hidden border-[0.3px] border-primary/50 bg-neutral-900">
                  <LazyLoopVideo
                    src={video}
                    label={`Work in action video ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="customer-reviews" className="pt-2 pb-4 md:pt-4 md:pb-5 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />

        <div className="w-full max-w-[1400px] px-2 sm:px-4 mx-auto relative z-10 font-poppins">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="text-center mb-4 md:mb-5"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-poppins normal-case tracking-normal leading-tight text-white">
              Customer Reviews
            </h2>
          </motion.div>

          <CarouselContent />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-2 pb-4 md:pt-4 md:pb-5 bg-neutral-900 relative">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-4 md:mb-5"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-poppins normal-case tracking-normal leading-tight text-white">
              Contact Us
            </h2>
          </motion.div>

          {/* Content Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start"
          >
            {/* Left: Form */}
            <motion.div variants={fadeInLeft} className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-none backdrop-blur-sm h-full">
              <h3 className="text-2xl font-poppins font-bold text-white mb-3">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg text-white font-poppins mb-2">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" className="bg-black/50 border-white/10 focus:border-primary h-11 text-white text-[17px] leading-5 placeholder:text-white/50 rounded-lg font-poppins" data-testid="input-contact-name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg text-white font-poppins mb-2">Contact Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your mobile number" className="bg-black/50 border-white/10 focus:border-primary h-11 text-white text-[17px] leading-5 placeholder:text-white/50 rounded-lg font-poppins" data-testid="input-contact-phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-white font-poppins mb-2">Service Interested In</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-white/10 text-white h-11 text-[17px] leading-5 rounded-lg font-poppins" data-testid="select-contact-service">
                              <SelectValue placeholder="Select a service..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-900 border-white/10">
                            {serviceCategories.map((category) => (
                              <SelectGroup key={category.id}>
                                <SelectLabel className="text-primary">{category.title}</SelectLabel>
                                {category.items.map((item) => (
                                  <SelectItem key={item.title} value={item.title}>
                                    {item.title}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-white font-poppins mb-2">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your vehicle..." className="bg-black/50 border-white/10 focus:border-primary min-h-[100px] text-white text-[17px] leading-5 placeholder:text-white/50 rounded-lg font-poppins" data-testid="input-contact-message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-poppins font-bold h-11 text-[17px] leading-5 normal-case tracking-normal rounded-none"
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </Button>
                  <p className="text-center text-white italic text-base leading-5 -skew-x-6">
                    "Your car deserves perfection, and we deliver it with precision."
                  </p>
                </form>
              </Form>
            </motion.div>

            {/* Right: Contact Info & Map */}
            <motion.div variants={fadeInRight} className="space-y-4 flex flex-col h-full">
              {/* Map */}
              <motion.div 
                variants={fadeInUp}
                className="rounded-none overflow-hidden border border-white/10 h-56 sm:h-64"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.0961146405354!2d73.30156332346936!3d19.17484898204387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1c1c1c1c1c1%3A0x0!2sShop%20no.%2016%20%26%2017%2C%20Shreeji%20Parasio%2C%20Badlapur!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-testid="map-location"
                />
              </motion.div>

              {/* Contact Info Container */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-5 rounded-none backdrop-blur-sm flex-1"
              >
                {/* Shop Address */}
                <div className="flex items-start gap-4 mb-2 pb-2 border-b border-white">
                  <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-poppins font-bold text-lg mb-1">SHOP ADDRESS</h4>
                    <p className="text-white text-base leading-snug">Shop no. 16 & 17, Shreeji Parasio, Beside Tulsi Aangan Soc., Prasad Hotel Road, Badlapur, Maharashtra - 421503</p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex items-start gap-4 mb-2 pb-2 border-b border-white">
                  <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-poppins font-bold text-lg mb-1">CONTACT NUMBER</h4>
                    <p className="text-white text-base leading-snug">+91 92268 82024</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-2 pb-2 border-b border-white">
                  <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-poppins font-bold text-lg mb-1">Email</h4>
                    <p className="text-white text-base leading-snug">info@autogamma.in</p>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-white font-poppins font-bold text-lg mb-2">Connect With Us</h4>
                  <div className="flex gap-3">
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" data-testid="link-facebook">
                      <img src={facebookIcon} alt="Facebook" loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
                    </a>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" data-testid="link-instagram">
                      <img src={instagramIcon} alt="Instagram" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </a>
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" data-testid="link-youtube">
                      <img src={youtubeIcon} alt="YouTube" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
