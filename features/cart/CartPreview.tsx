import { useCartContext } from "@/context/CartContext";

export const CartPreview: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCartContext();

  return (
    <div className="p-4 border rounded-md bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="space-y-2">
          {cart.map(item => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm">{item.price} x {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="w-16 border rounded px-1"
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                />
                <button
                  className="text-red-600 font-bold"
                  onClick={() => removeFromCart(item.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-bold text-lg">Total: {total}</div>
    </div>
  );
};
