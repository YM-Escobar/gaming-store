"use client";
import { FormEvent, useEffect, useState } from "react";
import { productService } from "@/services/gameService";
import type { Product } from "@/types/game";
import { ProductCard } from "@/features/games/GameCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formTitle = formData.get("title") as string;
    const productData = {
      // keep id locally for update calls only
      id: editingProduct?.id,
      title: formTitle,
      name: formTitle,
      price: Number(formData.get("price") || 0),
      description: (formData.get("description") as string) || "Sin descripción",
      image: (formData.get("image") as string) || "https://via.placeholder.com/600x800?text=Game",
      category: (formData.get("category") as string) || "Videojuego",
      genre: (formData.get("genre") as string) || "Acción",
      platforms: (formData.get("platforms") as string)
        ?.split(",")
        .map((p) => p.trim())
        .filter(Boolean) || ["PC"],
      releaseDate: (formData.get("releaseDate") as string) || new Date().toISOString().split("T")[0],
      developer: (formData.get("developer") as string) || "Estudio Independiente",
    };

    // Build a payload that matches Omit<Product, "id">
    const payload = {
      title: productData.title,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      // map existing `image` field to the Product interface fields
      imageSrc: productData.image,
      imageAlt: productData.title,
      category: productData.category,
      genre: productData.genre,
      platforms: productData.platforms,
      releaseDate: productData.releaseDate,
      developer: productData.developer,
      // provide defaults for required fields your Product type expects
      color: (formData.get("color") as string) || "",
      quantity: Number(formData.get("quantity") || 1),
      href: (editingProduct?.id && `/products/${editingProduct.id}`) || "#",
    };

    try {
      if (editingProduct) {
        await productService.update(editingProduct.id!, payload);
        toast.success("Producto actualizado correctamente");
      } else {
        await productService.create(payload);
        toast.success("Producto creado correctamente");
      }
      setOpen(false);
      setEditingProduct(null);
      load();
    } catch (err) {
      console.error(err);
      toast.error(editingProduct ? "Error al actualizar" : "Error al crear producto");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await productService.remove(id);
      toast.success("Producto eliminado");
      load();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Gestión de Productos
            </h1>
            <p className="text-gray-600 mt-2">
              Administra tu catálogo de juegos
            </p>
          </div>

          <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="gap-3 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Plus className="w-5 h-5" />
                Nuevo Producto
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-screen overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="title">Título del juego *</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingProduct?.title}
                      required
                      placeholder="Ej: God of War Ragnarök"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Precio (COP) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="1000"
                      defaultValue={editingProduct?.price}
                      required
                      placeholder="150000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Input
                      id="category"
                      name="category"
                      defaultValue={editingProduct?.category}
                      placeholder="Ej: Acción, RPG, Terror..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="genre">Género</Label>
                    <Input
                      id="genre"
                      name="genre"
                      defaultValue={editingProduct?.genre}
                      placeholder="Ej: Acción-Aventura"
                    />
                  </div>

                  <div>
                    <Label htmlFor="platforms">
                      Plataformas (separadas por coma)
                    </Label>
                    <Input
                      id="platforms"
                      name="platforms"
                      defaultValue={editingProduct?.platforms?.join(", ")}
                      placeholder="PC, PlayStation 5, Xbox Series X"
                    />
                  </div>

                  <div>
                    <Label htmlFor="releaseDate">Fecha de lanzamiento</Label>
                    <Input
                      id="releaseDate"
                      name="releaseDate"
                      type="date"
                      defaultValue={editingProduct?.releaseDate}
                    />
                  </div>

                  <div>
                    <Label htmlFor="developer">Desarrollado por</Label>
                    <Input
                      id="developer"
                      name="developer"
                      defaultValue={editingProduct?.developer}
                      placeholder="Ej: Santa Monica Studio"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">URL de la imagen</Label>
                    <Input
                      id="image"
                      name="image"
                      defaultValue={editingProduct?.image}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción completa</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={editingProduct?.description}
                    placeholder="Una descripción atractiva del juego..."
                  />
                </div>

                <DialogFooter className="flex gap-3 sm:justify-between">
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit" size="lg">
                    {editingProduct ? "Guardar Cambios" : "Crear Producto"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              <p className="text-xl">No hay productos aún</p>
              <p className="mt-2">¡Agrega el primero!</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                disableNavigation={true}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
