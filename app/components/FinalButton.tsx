"use client";

import { trackEvent } from "../../lib/analytics";

export default function FinalButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33612345678";
  
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("cta_click", { button: "final_whatsapp" })}
      className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition inline-block"
    >
      Réserver par WhatsApp
    </a>
  );
}
