"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/game";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    // Guard: ensure we have a defined id (CartItem.id expects string)
    if (!product.id) {
      console.warn("Can't add product without an id to the cart", product);
      return;
    }

    // Normalize image -> string. If it's a Blob, create an object URL.
    const src = product.imageSrc ?? product.image;
    let imageStr = "";
    if (typeof src === "string") {
      imageStr = src;
    } else if (src instanceof Blob) {
      imageStr = URL.createObjectURL(src);
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // Create a CartItem with required fields (id is guaranteed defined)
      return [
        ...prev,
        {
          id: product.id,
          name: product.name ?? product.title ?? "Unknown",
          price: product.price ?? 0,
          quantity: 1,
          image: imageStr,
        },
      ];
    });
  }, []);



  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const toRemove = prev.find((item) => item.id === id);
      if (toRemove && typeof toRemove.image === "string" && toRemove.image.startsWith("blob:")) {
        try { URL.revokeObjectURL(toRemove.image); } catch {}
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

    const clearCart = useCallback(() => {
    setCart((prev) => {
      prev.forEach((item) => {
        if (item.image && item.image.startsWith("blob:")) {
          try { URL.revokeObjectURL(item.image); } catch {}
        }
      });
      return [];
    });
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de un CartProvider");
  }
  return context;
};
