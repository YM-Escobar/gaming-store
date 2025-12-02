"use client";

import { productService } from "@/services/gameService";

import { Product } from "@/types/game";

import Image from "next/image";

import { useParams, notFound } from "next/navigation";

import { useState, useEffect } from "react";
import Loading from "../loading";

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col p-3 rounded-lg bg-zinc-800/50 border border-purple-800/50">
    <span className="text-xs font-medium uppercase text-purple-400 tracking-wider">
      {label}
    </span>

    <span className="text-base font-semibold text-white mt-0.5">{value}</span>
  </div>
);

const GameDetailPage = () => {
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [game, setGame] = useState<Product | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Efecto para obtener los datos al montar el componente

  useEffect(() => {
    if (!id) {
      setIsLoading(false);

      return;
    }

    const fetchGame = async () => {
      try {
        const fetchedGame = await productService.getById(id);

        if (!fetchedGame) {
          notFound();
        }

        setGame(fetchedGame);
      } catch (error) {
        console.error(`Error al obtener el juego ${id}:`, error);

        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  // Manejo de estados de carga y error

  if (isLoading || !id) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl font-bold">
          <Loading />
        </div>
      </div>
    );
  }

  if (!game) {
    return notFound();
  }

  // Lógica de Renderizado

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",

    currency: "COP",

    minimumFractionDigits: 0,
  }).format(game.price);

  return (
    // Fondo oscuro con ambiente neón

    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 relative overflow-hidden">
      {/* Capa de efecto de cuadrícula */}

      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-transparent to-purple-900"></div>

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,

            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Contenedor Principal (Estilo Neón) */}

        <div
          className="bg-black/90 border-2 border-purple-600/60 rounded-xl shadow-2xl p-6 md:p-12 backdrop-blur-xl

                       shadow-purple-600/20"
        >
          {/* TÍTULO PRINCIPAL */}

          <h1
            className="text-4xl sm:text-5xl font-extrabold text-white mb-8 border-b border-purple-800/50 pb-4

                       tracking-wider"
            style={{ textShadow: "0 0 5px #a855f7, 0 0 10px #7e22ce" }}
          >
            {game.name.toUpperCase()}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* COLUMNA 1: IMAGEN (AQUÍ SOLO QUEDA LA IMAGEN) */}

            <div className="lg:col-span-1 space-y-8">
              {/* Imagen Principal */}

              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-2xl border-2 border-cyan-500/50">
                <Image
                  src={
                    game.image ||
                    "https://placehold.co/600x750/1e1e1e/d8b4fe?text=GAME+COVER"
                  }
                  alt={`Portada de ${game.name}`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* COLUMNA 2: DETALLES, DESCRIPCIÓN Y CTA (AHORA EN ESTA COLUMNA) */}

            <div className="lg:col-span-2 space-y-10">
              {/* Metadatos Clave (Grid) */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DetailItem label="Género" value={game.genre} />

                <DetailItem label="Desarrollador" value={game.developer} />

                <DetailItem
                  label="Lanzamiento"
                  value={new Date(game.releaseDate).toLocaleDateString(
                    "es-ES",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                />

                <DetailItem label="Categoría" value={game.category || "N/A"} />
              </div>

              {/* Descripción Completa */}

              <div>
                <h2 className="text-2xl font-bold text-purple-300 mb-4 border-b border-gray-700 pb-2 tracking-wide">
                  TRANSMISIÓN DE DATOS / DESCRIPCIÓN
                </h2>

                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                  {game.description}
                </p>
              </div>

              {/* Bloque de Precio y CTA (MOVIDO AQUÍ) */}

              <div className="p-5 bg-zinc-900 border border-cyan-700 rounded-lg shadow-xl shadow-cyan-900/40 text-center border-l-4 border-l-purple-500">
                <p className="text-sm font-semibold uppercase text-purple-400 mb-1 tracking-wider">
                  PRECIO DE ACCESO
                </p>

                <p className="text-5xl font-black text-cyan-400 mb-4 tracking-tight">
                  {formattedPrice}
                </p>

                {/* Botón CTA sin icono */}

                <button
                  className="w-full bg-purple-600 text-white font-bold text-lg py-4 rounded-lg

                             shadow-xl shadow-purple-600/50 tracking-wider uppercase

                             transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]

                             border-2 border-purple-500 flex items-center justify-center gap-2"
                >
                  COMPRAR
                </button>

                <p className="text-xs text-gray-400 mt-3 font-mono">
                  PLATAFORMAS: {game.platforms.join(" / ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
