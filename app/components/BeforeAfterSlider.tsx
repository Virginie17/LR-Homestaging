"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  beforeText?: string;
  afterText?: string;
  badge?: string;
  priority?: boolean;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Avant",
  afterAlt = "Après",
  title = "Transformation avant / après",
  beforeText = "Pièce peu valorisée",
  afterText = "Espace transformé et plus attractif",
  badge = "Projection immédiate",
  priority = false,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percent));

    setPosition(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => setDragging(false);
  const handlePointerLeave = () => setDragging(false);

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h3>
        </div>
      )}

      <div className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/10] select-none touch-none bg-gray-100 cursor-ew-resize"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
        >
          <div className="absolute inset-0">
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <div className="relative h-full w-full min-w-full">
              <Image
                src={afterSrc}
                alt={afterAlt}
                fill
                priority={priority}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="absolute left-4 top-4 z-20 rounded-full bg-black/70 px-4 py-2 text-xs md:text-sm font-semibold text-white backdrop-blur">
            AVANT
          </div>

          <div className="absolute right-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs md:text-sm font-semibold text-gray-900 backdrop-blur">
            APRÈS
          </div>

          <div
            className="absolute inset-y-0 z-20"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="relative h-full w-[3px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-bold">
                <span>‹</span>
                <span>›</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-xs md:text-sm text-white backdrop-blur">
            Faites glisser pour comparer
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">Avant</p>
            <p className="text-sm text-gray-600">{beforeText}</p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-4 border border-yellow-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">Après</p>
            <p className="text-sm text-gray-700">{afterText}</p>
          </div>
        </div>
      </div>

      {badge && (
        <div className="mt-4 text-center">
          <p className="inline-block rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            {badge}
          </p>
        </div>
      )}
    </div>
  );
}