import { useMemo, useState } from "react";
import { ArrowRight, Calculator, IndianRupee } from "lucide-react";
import {
  formatPrice,
  serviceCategories,
  servicesData,
  type PricingTier,
  type ServiceCategoryItem,
  type ServiceData,
} from "@/lib/service-catalog-data";
import { ppfProducts, type PpfProduct } from "@/lib/ppf-pricing-data";

const vehicleTypes = [
  "Small Cars",
  "Hatchback / Small Sedan",
  "Mid-size Sedan / Compact SUV / MUV",
  "SUV / MPV",
  "Sports Bike",
  "Scooty",
  "Bike",
];

const selectClass =
  "h-12 w-full border border-white/15 bg-[#111] px-3 font-poppins text-sm text-white outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-45";

function matchesPpfVehicle(rowVehicle: string, selectedVehicle: string) {
  if (rowVehicle === selectedVehicle) return true;
  return (
    selectedVehicle === "Mid-size Sedan / Compact SUV / MUV" &&
    rowVehicle === "Mid-size / Compact SUV / MUV"
  );
}

function getPpfPriceRow(product: PpfProduct, vehicle: string) {
  return product.rows.find((row) => matchesPpfVehicle(row.vehicle, vehicle));
}

function getServiceTier(service: ServiceData | undefined, vehicle: string): PricingTier | undefined {
  return service?.pricing.find((tier) => tier.carType === vehicle);
}

function getItemKey(item: ServiceCategoryItem) {
  return item.slug ?? item.title;
}

function isItemPricedForVehicle(item: ServiceCategoryItem, vehicle: string) {
  if (item.href === "/ppf") {
    return ppfProducts.some((product) => getPpfPriceRow(product, vehicle));
  }
  const service = servicesData.find((entry) => entry.slug === item.slug);
  return Boolean(getServiceTier(service, vehicle));
}

export default function ServicePriceCalculator() {
  const [vehicle, setVehicle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [serviceKey, setServiceKey] = useState("");
  const [ppfProductName, setPpfProductName] = useState("");

  const availableCategories = useMemo(
    () =>
      vehicle
        ? serviceCategories.filter((category) =>
            category.items.some((item) => isItemPricedForVehicle(item, vehicle)),
          )
        : [],
    [vehicle],
  );

  const selectedCategory = availableCategories.find((category) => category.id === categoryId);
  const availableServices =
    selectedCategory?.items.filter((item) => isItemPricedForVehicle(item, vehicle)) ?? [];
  const selectedItem = availableServices.find((item) => getItemKey(item) === serviceKey);
  const isExteriorPpf = selectedItem?.href === "/ppf";

  const availablePpfProducts = useMemo(
    () => ppfProducts.filter((product) => getPpfPriceRow(product, vehicle)),
    [vehicle],
  );
  const selectedPpfProduct = availablePpfProducts.find((product) => product.name === ppfProductName);
  const selectedPpfPrice = selectedPpfProduct ? getPpfPriceRow(selectedPpfProduct, vehicle) : undefined;

  const selectedService = selectedItem?.slug
    ? servicesData.find((service) => service.slug === selectedItem.slug)
    : undefined;
  const selectedTier = getServiceTier(selectedService, vehicle);
  const hasCalculatedPrice = isExteriorPpf ? Boolean(selectedPpfPrice) : Boolean(selectedTier);

  const resetForVehicle = (nextVehicle: string) => {
    setVehicle(nextVehicle);
    setCategoryId("");
    setServiceKey("");
    setPpfProductName("");
  };

  return (
    <section
      id="service-price-calculator"
      className="relative bg-neutral-950 px-4 py-8 md:py-10"
      aria-labelledby="service-price-calculator-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 text-center">
          <p className="mb-2 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Quick price estimate
          </p>
          <h2
            id="service-price-calculator-title"
            className="font-poppins text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Service Price Calculator
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-poppins text-sm text-white/65 sm:text-base">
            Select your vehicle, then choose a service to see its listed price.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-primary/30 bg-white/[0.035] p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 font-poppins text-xs font-medium text-white/75">
                Vehicle type
                <select
                  className={selectClass}
                  value={vehicle}
                  onChange={(event) => resetForVehicle(event.target.value)}
                >
                  <option value="">Choose your vehicle</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 font-poppins text-xs font-medium text-white/75">
                Service category
                <select
                  className={selectClass}
                  value={categoryId}
                  disabled={!vehicle}
                  onChange={(event) => {
                    setCategoryId(event.target.value);
                    setServiceKey("");
                    setPpfProductName("");
                  }}
                >
                  <option value="">Choose a category</option>
                  {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 font-poppins text-xs font-medium text-white/75">
                Service
                <select
                  className={selectClass}
                  value={serviceKey}
                  disabled={!categoryId}
                  onChange={(event) => {
                    setServiceKey(event.target.value);
                    setPpfProductName("");
                  }}
                >
                  <option value="">Choose a service</option>
                  {availableServices.map((item) => (
                    <option key={getItemKey(item)} value={getItemKey(item)}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>

              {isExteriorPpf && (
                <label className="flex flex-col gap-2 font-poppins text-xs font-medium text-white/75">
                  PPF film
                  <select
                    className={selectClass}
                    value={ppfProductName}
                    onChange={(event) => setPpfProductName(event.target.value)}
                  >
                    <option value="">Choose a film</option>
                    {availablePpfProducts.map((product) => (
                      <option key={product.name} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <p className="mt-4 font-poppins text-xs leading-relaxed text-white/45">
              Prices shown are from the current price list. Coating warranty options are displayed separately.
            </p>
          </div>

          <div
            className="flex min-h-48 flex-col justify-center border border-primary/30 bg-black/40 p-5 sm:p-6"
            aria-live="polite"
            role="status"
          >
            {hasCalculatedPrice && selectedItem && vehicle ? (
              <>
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <Calculator size={18} aria-hidden="true" />
                  <span className="font-poppins text-xs font-semibold uppercase tracking-[0.16em]">
                    Your price
                  </span>
                </div>
                <h3 className="font-poppins text-lg font-semibold text-white">
                  {selectedItem.title}
                </h3>
                <p className="mb-4 font-poppins text-xs text-white/55">{vehicle}</p>

                {isExteriorPpf && selectedPpfPrice ? (
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-poppins text-sm font-medium text-white">
                          {selectedPpfProduct?.name}
                        </p>
                        <p className="mt-1 font-poppins text-xs text-white/55">
                          {selectedPpfPrice.warranty}
                        </p>
                      </div>
                      <strong className="shrink-0 font-poppins text-2xl font-semibold text-primary">
                        {formatPrice(selectedPpfPrice.price)}
                      </strong>
                    </div>
                  </div>
                ) : selectedTier ? (
                  selectedTier.options?.length ? (
                    <div className="space-y-2 border-t border-white/10 pt-3">
                      <PriceLine label="Base price" price={selectedTier.price} />
                      {selectedTier.options.map((option) => (
                        <PriceLine key={option.label} label={option.label} price={option.price} />
                      ))}
                    </div>
                  ) : (
                    <strong className="flex items-center gap-1.5 font-poppins text-3xl font-semibold text-primary">
                      <IndianRupee size={25} aria-hidden="true" />
                      {new Intl.NumberFormat("en-IN").format(selectedTier.price)}
                    </strong>
                  )
                ) : null}

                <a
                  href="#contact"
                  className="mt-5 inline-flex w-fit items-center gap-2 font-poppins text-xs font-semibold text-white transition-colors hover:text-primary"
                >
                  Enquire about this service <ArrowRight size={14} aria-hidden="true" />
                </a>
              </>
            ) : isExteriorPpf && selectedItem ? (
              <CalculatorPrompt
                title="Choose a PPF film"
                description="Exterior PPF prices vary by film. Select an option to see its vehicle-specific price."
              />
            ) : selectedItem && !selectedTier ? (
              <CalculatorPrompt
                title="Price not listed"
                description="There isn't a saved price for this vehicle and service. Contact us for a quote."
              />
            ) : !vehicle ? (
              <CalculatorPrompt
                title="Start with your vehicle"
                description="Choose a vehicle type to see the service categories and prices available for it."
              />
            ) : !categoryId ? (
              <CalculatorPrompt
                title="Choose a category"
                description="Only categories with prices for your selected vehicle are shown."
              />
            ) : (
              <CalculatorPrompt
                title="Choose a service"
                description="Select a service to calculate its price for your vehicle."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceLine({ label, price }: { label: string; price: number }) {
  return (
    <div className="flex items-center justify-between gap-4 font-poppins text-sm">
      <span className="text-white/65">{label}</span>
      <strong className="text-right font-semibold text-primary">{formatPrice(price)}</strong>
    </div>
  );
}

function CalculatorPrompt({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-primary">
        <Calculator size={18} aria-hidden="true" />
        <span className="font-poppins text-xs font-semibold uppercase tracking-[0.16em]">
          Price estimate
        </span>
      </div>
      <h3 className="font-poppins text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md font-poppins text-sm leading-relaxed text-white/55">
        {description}
      </p>
    </div>
  );
}
