import Image from "next/image";
import { MasVendidosData } from '@/features/games/MasVendidosData';
import NuevosLanzamientos from "@/features/games/NuevosLanzamientos";
import AgregadosRecientemente from "@/features/games/AgregadosReciente";



export default function Home() {
  return (
    
      <main >
       <Image src="/fondo2.jpg" alt=""  height={1000} width={2000}
       />
        <NuevosLanzamientos />
        <AgregadosRecientemente />
        <MasVendidosData />
          
      </main>
    
  );
}
