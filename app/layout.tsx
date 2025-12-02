import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HideNavbarOnAuth from "@/features/auth/HideNavbarOnAuth";
import RotatingBar from "@/components/ui/RotatingBar";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* Aplicamos la clase dark a todo el cuerpo para que el tema oscuro funcione */}
      <body className="min-h-screen bg-black dark">
        <CartProvider>
        <HideNavbarOnAuth>
          <RotatingBar />
          <Navbar />
        </HideNavbarOnAuth>      
        {/* Contenedor principal para el contenido de la página, asegurando que el z-index del body::before no lo tape */}
        <div className="relative z-10">
          {children}
        </div>
        <HideNavbarOnAuth>
          <Footer />
        </HideNavbarOnAuth>
        </CartProvider>
      </body>
    </html>
  );
}