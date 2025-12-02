"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FaCartPlus } from "react-icons/fa6";
import type { Product } from "@/types/game";
import { useCartContext } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  disableNavigation?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  disableNavigation = false,
}) => {
  const { addToCart } = useCartContext(); // <-- usamos el hook de carrito
  const router = useRouter();

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleCardClick = () => {
    if (!disableNavigation) {
      router.push(`/games/${product.id}`);
    }
  };
  
  return (
    <Card
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-2xl
        border border-purple-500/40
        bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.25),rgba(255,255,255,0)_70%),rgba(255,255,255,0.08)]
        backdrop-blur-2xl
        shadow-purple-700/30 shadow-lg
        transition-all duration-300
        hover:border-purple-500 hover:shadow-purple-500/60 hover:shadow-xl hover:scale-[1.02]
        ${disableNavigation ? "cursor-default" : "cursor-pointer"}`}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title || "Producto"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/600x600?text=MiJuego";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-2xl font-bold text-gray-500">Sin Imagen</span>
          </div>
        )}

        <div
          className="absolute inset-x-0 bottom-0 translate-y-full shadow-2xl transition-all duration-300 ease-out group-hover:translate-y-0 bg-white/95 backdrop-blur"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="flex gap-3">
              <Button
                className="flex-1 h-12 bg-black text-white font-bold rounded-full hover:bg-gray-800 shadow-lg"
                onClick={() => console.log("Comprar", product)}
              >
                COMPRAR
              </Button>

              <Button
                onClick={() => addToCart(product)}
                className="flex-1 h-12 bg-white text-black font-bold rounded-full border-2 border-black hover:bg-gray-100 shadow-lg"
              >
                <FaCartPlus className="h-5 w-5 mr-2" />
                AGREGAR
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-gray-900">
          {product.title}
        </h3>

        <p className="text-3xl font-extrabold text-gray-900">
          {formattedPrice}
        </p>

        {(onEdit || onDelete) && (
          <div className="flex gap-2 border-t px-4 py-3">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 h-9 rounded-full border border-black text-gray-700 hover:bg-gray-100 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product);
                }}
              >
                Editar
              </Button>
            )}

            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 h-9 text-red-600 border-black border rounded-full hover:bg-red-50 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product.id);
                }}
              >
                Eliminar
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
