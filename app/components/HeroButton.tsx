"use client";

import { trackEvent } from "../../lib/analytics";

export default function HeroButton() {
  return (
    <button
      onClick={() => trackEvent("cta_click", { button: "hero_simulation" })}
      className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition"
    >
      Ma Simulation Offerte
    </button>
  );
}
