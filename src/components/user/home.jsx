import { useEffect, useState } from "react";
import Button from "../ui/button";
import { ShoppingBagIcon } from "lucide-react";
import { client } from "../../lib/axios-instance";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({
    _id: "all",
    name: "All",
    icon: "",
  });
  const [cart, setCart] = useState([]);

  const handleFetchCategories = async () => {
    await client.get("/categories").then((res) => {
      setCategories(res.data.data);
    });
  };

  const allCategories = [
    {
      _id: "all",
      name: "All",
      icon: "",
    },
    ...categories,
  ];

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className="flex-1 pr-64">
        <div className="flex space-x-2 mb-5 overflow-x-auto">
          {allCategories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm hover:cursor-pointer rounded-full whitespace-nowrap ${
                activeCategory._id === category._id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <span className="font-medium text-primary-500">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600">
                      {product.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
                <Button onClick={() => addToCart(product)}>
                  Tambahkan ke Keranjang
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-64 h-dvh fixed top-0 right-0 border-l border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium">
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
          </h2>
        </div>

        {cart.length === 0 ? (
          <div className="p-6 text-center text-gray-500 flex-grow flex items-center justify-center">
            <div>
              <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>Keranjang Anda kosong</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto divide-y divide-gray-100">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-primary-600">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="p-4">
              <Button>Proceed to Checkout</Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Home;
