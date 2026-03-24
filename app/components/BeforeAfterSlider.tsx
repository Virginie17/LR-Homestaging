"use client";

import { useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  beforeText?: string;
  afterText?: string;
  badge?: string;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Avant",
  afterAlt = "Après",
  title = "Transformation avant / après",
  beforeText = "Pièce difficile à projeter",
  afterText = "Espace valorisé et immédiatement plus attractif",
  badge = "+35% d'attractivité perçue",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      </div>

      <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm bg-white">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              src={afterSrc}
              alt={afterAlt}
              className="h-full w-full object-cover"
              style={{ width: `${100 / (position / 100)}%`, maxWidth: "none" }}
            />
          </div>

          <div
            className="absolute inset-y-0 z-20"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="relative h-full w-[3px] bg-white/90 shadow-md" />
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 font-bold">
              ↔
            </div>
          </div>

          <div className="absolute left-4 top-4 z-20 rounded-full bg-black/65 px-4 py-2 text-sm font-semibold text-white">
            AVANT
          </div>

          <div className="absolute right-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900">
            APRÈS
          </div>
        </div>

        <div className="px-5 pt-5">
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full accent-black"
            aria-label="Comparer l'image avant et après"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 pb-5 pt-3">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Avant</p>
            <p className="text-sm text-gray-600">{beforeText}</p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-4 border border-yellow-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">Après</p>
            <p className="text-sm text-gray-700">{afterText}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="inline-block rounded-full bg-black text-white px-4 py-2 text-sm font-medium">
          {badge}
        </p>
      </div>
    </div>
  );
}
