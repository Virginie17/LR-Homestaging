"use client";

import Image from "next/image";
import ProjectionGenerator from "./ProjectionGenerator";

export default function Hero() {
  return (
    <section className="w-full px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Projetez <span className="text-black">VOS meubles</span><br />
            dans votre futur bien
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Transformez n'importe quelle photo en intérieur réaliste en quelques secondes grâce à l'IA.
            Visualisez immédiatement si le bien vous correspond.
          </p>

          <button className="bg-black text-white px-6 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition mb-4">
            Tester votre photo maintenant
          </button>

          <p className="text-sm text-gray-500">
            1 projection gratuite • Sans engagement
          </p>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* VISUEL SIGNATURE */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/projection-signature.jpg"
              alt="Projection meubles dans un bien immobilier"
              fill
              className="object-cover"
            />
          </div>

          {/* GENERATEUR */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <ProjectionGenerator />
          </div>

        </div>
      </div>
    </section>
  );
}
