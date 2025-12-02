"use client";
import React from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartContext } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, total } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <ShoppingBag size={120} className="text-purple-900/40 mb-8" />
        <h1 className="text-5xl font-bold mb-4 text-neon-purple text-glow-purple">
          Carrito vacío
        </h1>
        <a
          href="/games"
          className="bg-linear-to-r from-purple-500 to-cyan-500 text-black font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transition-all"
        >
          Volver a la tienda
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 relative overflow-hidden">
      {/* Fondo de grid sutil neon */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-6xl font-black text-center mb-12 text-neon-purple text-glow-purple">
          MI CARRITO
        </h1>

        <div className="space-y-6 mb-10">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-black/80 border-2 border-purple-600/60 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg hover:shadow-purple-500/40 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-xl border-2 border-purple-600/50"
              />

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-neon-purple text-glow-purple">
                  {item.name}
                </h3>
                <p className="text-3xl font-bold text-neon-green text-glow-green">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="w-12 h-12 bg-zinc-900/80 border border-purple-700 rounded-xl hover:bg-red-700 transition flex items-center justify-center"
                >
                  <Minus size={24} />
                </button>
                <span className="text-3xl font-bold w-20 text-center text-neon-green text-glow-green">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-12 h-12 bg-zinc-900/80 border border-purple-700 rounded-xl hover:bg-purple-700 transition flex items-center justify-center"
                >
                  <Plus size={24} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 hover:bg-red-700 p-4 rounded-xl transition"
              >
                <Trash2 size={28} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-black/80 border-2 border-purple-600/60 rounded-2xl p-8 text-right">
          <p className="text-4xl font-black mb-8 text-neon-purple text-glow-purple">
            Total: ${total.toFixed(2)}
          </p>
          <button className="bg-linear-to-r from-green-500 to-cyan-400 text-black font-black text-2xl py-6 px-20 rounded-full hover:scale-105 transition-all shadow-lg shadow-green-400/50">
            IR A PAGAR
          </button>
        </div>
      </div>
    </div>
  );
}
