import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import ppfAppImage from "@assets/image_1766730418736.png";
import shieldIcon from "@assets/image_1766729201482.png";
import rupeeIcon from "@assets/image_1766729223515.png";
import toolsIcon from "@assets/image_1766729246340.png";
import starIcon from "@assets/image_1766729264056.png";
import { formatPrice } from "@/lib/service-catalog-data";
import { ppfProducts, ppfVehicleTypes } from "@/lib/ppf-pricing-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
} as const;

export default function PPF() {
  const [vehicleFilter, setVehicleFilter] = useState("All vehicle types");
  const visibleProducts = useMemo(
    () =>
      ppfProducts
        .map((product) => ({
          ...product,
          rows:
            vehicleFilter === "All vehicle types"
              ? product.rows
              : product.rows.filter((row) => row.vehicle === vehicleFilter),
        }))
        .filter((product) => product.rows.length > 0),
    [vehicleFilter],
  );

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      {/* Top Section / Hero */}
      <section className="container px-4 mx-auto mb-12 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-white text-lg font-medium mb-2 font-sora"
          >
            Protect Your Car, Preserve Its Shine!
          </motion.p>
          <motion.h1 
            variants={fadeInUp}
            className="text-xl md:text-3xl font-sora font-semibold text-white leading-tight mb-1 uppercase px-4 md:px-0"
          >
            Guard Your Car's Paint with Our Advanced
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-3xl font-sora font-semibold text-primary leading-tight uppercase px-4 md:px-0"
          >
            PPF Technology for a Perfect, Glossy Finish
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8 max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInLeft} className="relative group">
            <img 
              src={ppfAppImage} 
              alt="PPF Application" 
              className="relative w-full rounded-2xl shadow-xl max-h-[350px] object-cover"
            />
          </motion.div>
          
          <motion.div variants={fadeInRight} className="space-y-6 pt-2">
            <div className="space-y-4">
              <p className="text-white text-sm md:text-base leading-relaxed font-sora font-normal">
                Paint Protection Film (PPF) is a transparent, urethane film applied 
                to a vehicle's painted surface to protect it from scratches, chips, 
                and other forms of damage. This durable film acts as a sacrificial 
                layer, absorbing the impact of road debris, rocks, and other 
                environmental factors. PPF not only preserves your vehicle's 
                original paint but also enhances its appearance by adding a 
                glossy, protective layer.
              </p>
              <p className="text-white text-sm md:text-base leading-relaxed font-sora font-normal">
                PPF creates a protective barrier between your vehicle's paint and 
                the outside world. When a rock chip or other debris strikes the 
                film, it absorbs the impact, preventing damage to the underlying 
                paint.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="container px-4 mx-auto mb-32 pt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-white text-sm tracking-[0.2em] mb-2 font-sora"
          >
            Benefits of Paint Protection Film
          </motion.p>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-sora font-semibold text-white"
          >
            Ultimate Protection <span className="text-primary">for Your Vehicle</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { 
              title: "Ultimate Protection", 
              desc: "Shield your vehicle's paint from scratches, chips, and other forms of damage caused by road debris, rocks, and harsh weather conditions.",
              icon: shieldIcon
            },
            { 
              title: "Preserving Resale Value", 
              desc: "Maintain your car's pristine appearance and increase its resale value by protecting its original paint finish.",
              icon: rupeeIcon
            },
            { 
              title: "Easy Maintenance", 
              desc: "Repel dirt, grime, and water, making cleaning and maintenance a breeze.",
              icon: toolsIcon
            },
            { 
              title: "Enhanced Aesthetics", 
              desc: "Enhance your vehicle's shine and gloss, giving it a showroom-quality finish that lasts.",
              icon: starIcon
            },
          ].map((benefit, i) => (
            <motion.div 
              key={i} 
              variants={scaleIn}
              className="bg-[#2a2a2a] border border-white/5 p-10 rounded-[2rem] flex flex-col items-center text-center group transition-all duration-300 hover:bg-[#333333]"
            >
              <div className="mb-8 p-6 bg-[#1a1a1a] rounded-2xl">
                <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-sora uppercase tracking-wider leading-tight">{benefit.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Catalogue */}
      <section id="ppf-pricing" className="container mx-auto px-4 pb-20">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-sora text-xs uppercase tracking-[0.22em] text-primary">
              Updated PPF pricing
            </p>
            <h2 className="font-poppins text-3xl font-semibold text-white sm:text-4xl">
              PPF &amp; Color Wraps
            </h2>
            <p className="mt-2 max-w-2xl font-poppins text-sm leading-relaxed text-white/65">
              Compare the film options, vehicle fit, warranty, and prices from our latest price list.
            </p>
          </div>
          <label className="flex flex-col gap-2 font-poppins text-xs font-medium text-white/70 sm:min-w-64">
            Filter by vehicle
            <select
              value={vehicleFilter}
              onChange={(event) => setVehicleFilter(event.target.value)}
              className="h-11 border border-white/20 bg-[#111] px-3 text-sm text-white outline-none focus:border-primary"
            >
              <option>All vehicle types</option>
              {ppfVehicleTypes.map((vehicle) => (
                <option key={vehicle}>{vehicle}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: (index % 6) * 0.035 }}
              className="border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-primary/40"
            >
              <h3 className="mb-3 min-h-12 border-b border-white/10 pb-3 font-poppins text-base font-semibold leading-snug text-white">
                {product.name}
              </h3>
              <div className="space-y-1">
                {product.rows.map((row) => (
                  <div
                    key={`${row.vehicle}-${row.warranty}`}
                    className="flex items-start justify-between gap-3 border-b border-white/[0.07] py-2 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium leading-snug text-white/90">
                        {row.vehicle}
                      </p>
                      <p className="mt-1 font-poppins text-[10px] text-white/50">{row.warranty}</p>
                    </div>
                    <p className="shrink-0 font-poppins text-sm font-semibold text-primary">
                      {formatPrice(row.price)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-5 font-poppins text-xs leading-relaxed text-white/50">
          Prices and warranty labels follow the supplied workbook. Entries without a saved price are not shown.
        </p>
      </section>
    </div>
  );
}
