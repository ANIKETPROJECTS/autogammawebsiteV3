import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  getStartingPrice,
  serviceCategories,
  servicesData,
} from "@/lib/service-catalog-data";

const serviceBySlug = new Map(servicesData.map((service) => [service.slug, service]));

export default function Services() {
  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-28 text-white md:pt-32">
      <section className="mx-auto mb-10 max-w-5xl text-center md:mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-poppins text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl"
        >
          Our <span className="text-primary">Services</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mx-auto max-w-3xl font-poppins text-sm leading-relaxed text-white/75 sm:text-base"
        >
          Explore our vehicle care services and transparent, vehicle-specific pricing.
        </motion.p>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {serviceCategories.map((category, categoryIndex) => (
          <motion.article
            id={category.id}
            key={category.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: categoryIndex * 0.04 }}
            className="scroll-mt-28 border border-primary/30 bg-white/[0.035] p-5 sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/15 pb-4">
              <h2 className="font-poppins text-lg font-semibold leading-snug text-white sm:text-xl">
                {category.title}
              </h2>
              <BadgeCheck className="mt-0.5 shrink-0 text-primary" size={20} aria-hidden="true" />
            </div>

            <ul className="divide-y divide-white/10">
              {category.items.map((item) => {
                const service = item.slug ? serviceBySlug.get(item.slug) : undefined;
                const href = item.href ?? (item.slug ? `/service/${item.slug}` : "/services");

                return (
                  <li key={item.title}>
                    <Link
                      href={href}
                      className="group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-primary"
                    >
                      <span className="font-poppins text-sm font-medium text-white group-hover:text-primary sm:text-base">
                        {item.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-right">
                        {service ? (
                          <span className="font-poppins text-xs text-white/65 sm:text-sm">
                            From <span className="font-semibold text-primary">{formatPrice(getStartingPrice(service))}</span>
                          </span>
                        ) : (
                          <span className="font-poppins text-xs text-primary sm:text-sm">
                            View film options
                          </span>
                        )}
                        <ArrowRight
                          size={15}
                          className="text-primary transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.article>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-4xl text-center">
        <h2 className="font-poppins text-2xl font-semibold text-white sm:text-3xl">
          Ready to book a service?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-poppins text-sm leading-relaxed text-white/70 sm:text-base">
          Choose a service above to view its vehicle-specific prices and booking options.
        </p>
        <Link href="/#contact">
          <Button className="mt-6 bg-primary px-8 font-poppins font-semibold text-white hover:bg-primary/90">
            Contact Auto Gamma
          </Button>
        </Link>
      </section>
    </div>
  );
}
