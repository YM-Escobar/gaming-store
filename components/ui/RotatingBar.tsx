"use client";
import { useEffect, useState } from "react";

export default function RotatingBar() {
  const mensajes = [
    "🔥 EMPEZAMOS EL BLACK FRIDAY — Hasta 80% OFF 😎",
    "🚀 Entrega Digital Inmediata",
    "🎮 Juegos PS5, Xbox y Nintendo al Mejor Precio",
    "💳 Pagos Seguros — Nequi, Daviplata, Bancolombia",
    "📦 Atención 24/7 • Entregas Garantizadas"
  ];

  const [index, setIndex] = useState(0);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAnimar(true); // activa animación hacia un lado
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % mensajes.length);
        setAnimar(false); // regresa mensaje desde la derecha
      }, 480);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="rotbar">
      <div className={`rotbar__msg ${animar ? "slide-out" : "slide-in"}`}>
        {mensajes[index]}
      </div>

      <style jsx>{`
        .rotbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 6000;
          overflow: hidden;
          padding: 10px 0;
          background: linear-gradient(90deg, #000000e5, #5e1bb7cc);
          color: #fff;
          text-align: center;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
        }

        .rotbar__msg {
          display: inline-block;
          white-space: nowrap;
          transition: transform 0.45s ease, opacity 0.3s ease;
        }

        /* Sale hacia la izquierda */
        .slide-out {
          transform: translateX(-120%);
          opacity: 0;
        }

        /* Entra desde la derecha */
        .slide-in {
          transform: translateX(0%);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
