import Image from "next/image";
import { MasVendidosData } from '@/features/games/MasVendidosData';
import NuevosLanzamientos from "@/features/games/MasVendidos";
import AgregadosRecientemente from "@/features/games/AgregadosReciente";
import RotatingBar from "@/components/ui/RotatingBar";


export default function Home() {
  return (
    <main className="flex flex-col gap-10">

      {/* === BANNER HERO === */}
      <div className="relative w-full h-[430px] overflow-hidden rounded-2xl">
        <Image
          src="/GAMING STORE.gif"
          alt="Gaming Store Banner"
          fill
          priority
          className="
		        opacity-50
            object-cover
            scale-105
            brightness-[0.95]
            contrast-110
            transition-all duration-700 ease-out
            hover:scale-110
            hover:brightness-100
            hover:contrast-125
          "
        />

        {/* Marco suave con sombra para que se vea premium */}
        <div className="absolute inset-0 shadow-[0_0_35px_5px_rgba(0,0,0,0.7)] pointer-events-none" />
      </div>
      <NuevosLanzamientos />
      <RotatingBar />
      <MasVendidosData />
      <AgregadosRecientemente />
    </main>
  );
}
