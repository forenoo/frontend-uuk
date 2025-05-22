import { MinusIcon, PlusIcon } from "lucide-react";

const ProductCard = ({ product, cart, setCart, formatPrice }) => {
  const cartItem = cart.find(
    (item) => (item.id || item._id) === (product.id || product._id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (cartItem) {
      setCart(
        cart.map((item) =>
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleMinus = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      setCart(
        cart.filter(
          (item) => (item.id || item._id) !== (product.id || product._id)
        )
      );
    } else {
      setCart(
        cart.map((item) =>
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
      <div className="h-32 sm:h-40 overflow-hidden relative">
        <img
          src={`http://localhost:8000${product.image_url}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-2 w-fit px-2 text-xs h-6 flex items-center justify-center right-2 rounded-full bg-white ${
            product.stock === 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {product.stock} tersisa
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div>
          <p className="text-xs text-gray-600 truncate">
            {product.category?.name}
          </p>
          <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">
            {product.name}
          </h3>
          <p className="font-medium text-primary-500 text-sm sm:text-base">
            {formatPrice(product.price)}
          </p>
        </div>

        <div
          className={`flex items-center p-1 rounded-xl justify-between mt-2 sm:mt-3 ${
            product.stock === 0 ? "bg-red-500/20" : "bg-primary-500/20"
          }`}
        >
          <button
            onClick={handleMinus}
            disabled={quantity === 0}
            className={`w-7 h-7 sm:!w-8 sm:!h-8 flex items-center justify-center rounded-lg enabled:hover:bg-primary-600 transition-colors duration-300 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
              product.stock === 0 ? "bg-red-500" : "bg-primary-500"
            }`}
          >
            <MinusIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span
            className={`text-center font-semibold ${
              product.stock === 0 ? "text-red-500" : "text-primary-900"
            }`}
          >
            {quantity}
          </span>
          <button
            onClick={handleAdd}
            disabled={quantity >= product.stock}
            className={`w-7 h-7 sm:!w-8 sm:!h-8 flex items-center justify-center rounded-lg enabled:hover:bg-primary-600 transition-colors duration-300 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
              product.stock === 0 ? "bg-red-500" : "bg-primary-500"
            }`}
          >
            <PlusIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
