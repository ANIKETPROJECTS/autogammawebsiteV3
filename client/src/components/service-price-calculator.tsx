import { useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const selectTriggerClass =
  "h-11 w-full rounded-lg border-white/10 bg-black/50 font-poppins text-[17px] leading-5 text-white data-[placeholder]:text-white/45 focus:ring-1 focus:ring-primary";

const inputClass =
  "h-11 rounded-lg border-white/10 bg-black/50 font-poppins text-[17px] leading-5 text-white placeholder:text-white/45 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary";

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

function navigateToCard(card: HTMLDivElement | null) {
  if (!card) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktopLayout = window.matchMedia("(min-width: 1024px)").matches;
  if (!isDesktopLayout) {
    card.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }
  card.focus({ preventScroll: true });
}

export default function ServicePriceCalculator() {
  const [vehicle, setVehicle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [serviceKey, setServiceKey] = useState("");
  const [ppfProductName, setPpfProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [revealAttempted, setRevealAttempted] = useState(false);
  const [hasRevealedPrice, setHasRevealedPrice] = useState(false);
  const serviceCardRef = useRef<HTMLDivElement>(null);
  const detailsCardRef = useRef<HTMLDivElement>(null);

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
  const canRevealPrice = Boolean(hasCalculatedPrice && selectedItem && vehicle);

  const resetPriceGate = () => {
    setRevealAttempted(false);
    setHasRevealedPrice(false);
  };

  const resetForVehicle = (nextVehicle: string) => {
    setVehicle(nextVehicle);
    setCategoryId("");
    setServiceKey("");
    setPpfProductName("");
    resetPriceGate();
  };

  const handleRevealPrice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRevealAttempted(true);

    const validName = customerName.trim().length >= 2;
    const validPhone = customerPhone.replace(/\D/g, "").length >= 10;
    if (validName && validPhone) setHasRevealedPrice(true);
  };

  return (
    <section
      id="service-price-calculator"
      className="relative bg-neutral-950 py-8 md:py-10"
      aria-labelledby="service-price-calculator-title"
    >
      <div className="mx-auto w-full max-w-[1400px] px-2 sm:px-4">
        <div className="mb-6 text-center">
          <h2
            id="service-price-calculator-title"
            className="font-poppins text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Service Price Calculator
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-poppins text-sm text-white/65 sm:text-base">
            Choose your vehicle and service, then enter your details to reveal the price.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div
            ref={serviceCardRef}
            tabIndex={-1}
            className="border border-primary/30 bg-white/[0.035] p-4 outline-none focus-visible:ring-1 focus-visible:ring-primary sm:p-6"
            aria-labelledby="calculator-service-step-title"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary/50 font-poppins text-sm font-semibold text-primary">
                01
              </span>
              <h3 id="calculator-service-step-title" className="font-poppins text-base font-semibold text-white sm:text-lg">
                Choose your vehicle and service
              </h3>
            </div>
            <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-2">
                <label id="calculator-vehicle-label" className="font-poppins text-sm font-medium text-white">
                  Vehicle type
                </label>
                <Select value={vehicle} onValueChange={resetForVehicle}>
                  <SelectTrigger
                    aria-labelledby="calculator-vehicle-label"
                    className={selectTriggerClass}
                    data-testid="select-calculator-vehicle"
                  >
                    <SelectValue placeholder="Choose your vehicle" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-neutral-900 text-white">
                    {vehicleTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="font-poppins focus:bg-white/10 focus:text-white"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex min-w-0 flex-col gap-2">
                <label id="calculator-category-label" className="font-poppins text-sm font-medium text-white">
                  Service category
                </label>
                <Select
                  value={categoryId}
                  disabled={!vehicle}
                  onValueChange={(nextCategoryId) => {
                    setCategoryId(nextCategoryId);
                    setServiceKey("");
                    setPpfProductName("");
                    resetPriceGate();
                  }}
                >
                  <SelectTrigger
                    aria-labelledby="calculator-category-label"
                    className={selectTriggerClass}
                    data-testid="select-calculator-category"
                  >
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-neutral-900 text-white">
                    {availableCategories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className="font-poppins focus:bg-white/10 focus:text-white"
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
                <label id="calculator-service-label" className="font-poppins text-sm font-medium text-white">
                  Service
                </label>
                <Select
                  value={serviceKey}
                  disabled={!categoryId}
                  onValueChange={(nextServiceKey) => {
                    setServiceKey(nextServiceKey);
                    setPpfProductName("");
                    resetPriceGate();
                    const nextItem = availableServices.find(
                      (item) => getItemKey(item) === nextServiceKey,
                    );
                    if (nextItem?.href !== "/ppf") {
                      requestAnimationFrame(() => navigateToCard(detailsCardRef.current));
                    }
                  }}
                >
                  <SelectTrigger
                    aria-labelledby="calculator-service-label"
                    className={selectTriggerClass}
                    data-testid="select-calculator-service"
                  >
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-neutral-900 text-white">
                    {availableServices.map((item) => (
                      <SelectItem
                        key={getItemKey(item)}
                        value={getItemKey(item)}
                        className="font-poppins focus:bg-white/10 focus:text-white"
                      >
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isExteriorPpf && (
                <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
                  <label id="calculator-ppf-label" className="font-poppins text-sm font-medium text-white">
                    PPF film
                  </label>
                  <Select
                    value={ppfProductName}
                    onValueChange={(nextProduct) => {
                      setPpfProductName(nextProduct);
                      resetPriceGate();
                      requestAnimationFrame(() => navigateToCard(detailsCardRef.current));
                    }}
                  >
                    <SelectTrigger
                      aria-labelledby="calculator-ppf-label"
                      className={selectTriggerClass}
                      data-testid="select-calculator-ppf"
                    >
                      <SelectValue placeholder="Choose a film" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-neutral-900 text-white">
                      {availablePpfProducts.map((product) => (
                        <SelectItem
                          key={product.name}
                          value={product.name}
                          className="font-poppins focus:bg-white/10 focus:text-white"
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

            </div>
          </div>

          <div
            ref={detailsCardRef}
            tabIndex={-1}
            className="flex min-h-48 flex-col border border-primary/30 bg-black/40 p-4 outline-none focus-visible:ring-1 focus-visible:ring-primary sm:p-6"
            aria-labelledby="calculator-details-step-title"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center border font-poppins text-sm font-semibold ${
                    canRevealPrice ? "border-primary/60 text-primary" : "border-white/20 text-white/40"
                  }`}
                >
                  02
                </span>
                <h3
                  id="calculator-details-step-title"
                  className={`min-w-0 font-poppins text-base font-semibold sm:text-lg ${
                    canRevealPrice ? "text-white" : "text-white/50"
                  }`}
                >
                  Your details and estimate
                </h3>
              </div>
              {canRevealPrice && (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto shrink-0 px-2 py-1 font-poppins text-xs text-white/65 hover:bg-white/5 hover:text-white"
                  onClick={() => requestAnimationFrame(() => navigateToCard(serviceCardRef.current))}
                >
                  Edit choices
                </Button>
              )}
            </div>

            {canRevealPrice && !hasRevealedPrice ? (
              <form onSubmit={handleRevealPrice} className="space-y-4">
                <p className="font-poppins text-sm text-white/65">
                  Enter your name and contact number to view the price for {selectedItem?.title}.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex min-w-0 flex-col gap-2">
                    <label htmlFor="calculator-customer-name" className="font-poppins text-sm font-medium text-white">
                      Name
                    </label>
                    <Input
                      id="calculator-customer-name"
                      autoComplete="name"
                      value={customerName}
                      onChange={(event) => {
                        setCustomerName(event.target.value);
                        resetPriceGate();
                      }}
                      placeholder="Your full name"
                      className={inputClass}
                      aria-invalid={revealAttempted && customerName.trim().length < 2}
                      aria-describedby={
                        revealAttempted && customerName.trim().length < 2
                          ? "calculator-name-error"
                          : undefined
                      }
                    />
                    {revealAttempted && customerName.trim().length < 2 && (
                      <p id="calculator-name-error" className="font-poppins text-xs text-red-400">
                        Enter at least 2 characters.
                      </p>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-2">
                    <label htmlFor="calculator-customer-phone" className="font-poppins text-sm font-medium text-white">
                      Contact number
                    </label>
                    <Input
                      id="calculator-customer-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={customerPhone}
                      onChange={(event) => {
                        setCustomerPhone(event.target.value);
                        resetPriceGate();
                      }}
                      placeholder="Your mobile number"
                      className={inputClass}
                      aria-invalid={revealAttempted && customerPhone.replace(/\D/g, "").length < 10}
                      aria-describedby={
                        revealAttempted && customerPhone.replace(/\D/g, "").length < 10
                          ? "calculator-phone-error"
                          : undefined
                      }
                    />
                    {revealAttempted && customerPhone.replace(/\D/g, "").length < 10 && (
                      <p id="calculator-phone-error" className="font-poppins text-xs text-red-400">
                        Enter a number with at least 10 digits.
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="h-11 w-full rounded-none bg-primary font-poppins text-base font-bold text-white hover:bg-primary/90"
                  data-testid="button-reveal-price"
                >
                  Reveal price
                </Button>
                <p className="font-poppins text-xs leading-relaxed text-white/45">
                  Your details unlock the estimate here; this calculator does not send or store them.
                </p>
              </form>
            ) : hasCalculatedPrice && selectedItem && vehicle && hasRevealedPrice ? (
              <>
                <p className="mb-2 font-poppins text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Your price
                </p>
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
                description="Select a film in the first card to continue to your details and price."
              />
            ) : selectedItem && !selectedTier ? (
              <CalculatorPrompt
                title="Price not listed"
                description="There isn't a saved price for this vehicle and service. Contact us for a quote."
              />
            ) : !vehicle ? (
              <CalculatorPrompt
                title="Complete the first card"
                description="Choose a vehicle, category, and service to continue here."
              />
            ) : !categoryId ? (
              <CalculatorPrompt
                title="Choose a category"
                description="Available categories for this vehicle will appear in the first card."
              />
            ) : (
              <CalculatorPrompt
                title="Choose a service"
                description="Select a service in the first card to continue."
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
      <h4 className="font-poppins text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 max-w-md font-poppins text-sm leading-relaxed text-white/55">
        {description}
      </p>
    </div>
  );
}
