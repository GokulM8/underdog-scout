const HEADLINES = [
  "WORLD CUP 2026 — UNDERDOG WATCH",
  "CURAÇAO: SMALLEST NATION EVER AT A WORLD CUP",
  "CAPE VERDE MAKE HISTORIC DEBUT",
  "JORDAN CHASE FIRST-EVER QUALIFICATION GLORY",
  "UZBEKISTAN: CENTRAL ASIA'S FIRST WORLD CUP NATION",
  "HAITI BACK AFTER 52 YEARS",
  "SCOTLAND END 28-YEAR WAIT FOR THE FINALS",
  "POWERED BY IBM GRANITE AI PREDICTIONS",
];

export default function TickerBar() {
  const items = [...HEADLINES, ...HEADLINES];
  return (
    <div className="w-full overflow-hidden bg-gold text-background border-b border-black/20">
      <div className="flex w-max animate-ticker py-1.5">
        {items.map((text, i) => (
          <span
            key={i}
            className="font-display text-sm sm:text-base px-6 whitespace-nowrap tracking-wide"
          >
            {text} <span className="mx-2">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
