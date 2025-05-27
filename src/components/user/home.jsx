import { useEffect, useState } from "react";
import Button from "../ui/button";
import { ShoppingBagIcon, SearchIcon, XIcon } from "lucide-react";
import { client } from "../../lib/axios-instance";
import ProductCard from "./product-card";
import { useAuth } from "../../hooks/use-auth";

const Home = () => {
  document.title = "Beranda | Kasir Kita";

  const { id } = useAuth();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const fetchProducts = async () => {
    const res = await client.get("/products");
    setProducts(res.data.data);
    setFilteredProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

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

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      const transactionData = {
        customer_id: id,
        total_price: cartTotal,
        products: cart.map((item) => ({
          product_id: item.id || item._id,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
      };

      const response = await client.post("/transactions", transactionData);

      if (response.status === 200 || response.status === 201) {
        alert("Transaction successful!");
        setCart([]);
        setShowMobileCart(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row h-dvh">
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="sticky top-0 p-4 border-b border-gray-200 bg-white z-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-medium lg:hidden">Beranda</h1>
            <button
              className="flex items-center gap-1 lg:hidden relative"
              onClick={() => setShowMobileCart(true)}
            >
              <ShoppingBagIcon className="h-5 w-5 text-primary-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </header>

        <div className="p-4 flex-1 overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No products found matching your search
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id || product._id}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="hidden lg:flex w-80 h-dvh border-l border-gray-200 bg-white flex-col overflow-hidden">
        <header className="p-4 h-[74px] border-b border-gray-200 bg-white">
          <h2 className="font-medium flex items-center gap-2">
            Detail Pesanan
          </h2>
          <p className="text-xs text-gray-400">
            {new Date()
              .toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace("pukul", "")}
          </p>
        </header>

        {cart.length === 0 ? (
          <div className="p-4 text-center flex-grow flex items-center justify-center">
            <div className="space-y-3">
              <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-300" />
              <div>
                <p className="font-medium">Keranjang Anda kosong</p>
                <p className="text-sm text-gray-400 mt-1">
                  Add items to get started
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <div className="flex gap-3 w-full">
                    <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                      <img
                        src={`http://localhost:8000${item.image_url}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="font-medium text-primary-500">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="w-6 h-6 flex items-center hover:cursor-pointer justify-center rounded border border-gray-200 hover:bg-gray-200 text-gray-700"
                          onClick={() => {
                            setCart((prev) =>
                              prev
                                .map((cartItem) =>
                                  cartItem.id === item.id &&
                                  cartItem.quantity > 0
                                    ? {
                                        ...cartItem,
                                        quantity: cartItem.quantity - 1,
                                      }
                                    : cartItem
                                )
                                .filter((cartItem) => cartItem.quantity > 0)
                            );
                          }}
                        >
                          -
                        </button>
                        <span className="text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="w-6 h-6 flex items-center hover:cursor-pointer justify-center rounded border border-gray-200 hover:bg-gray-200 text-gray-700"
                          onClick={() => {
                            setCart((prev) =>
                              prev.map((cartItem) =>
                                cartItem.id === item.id
                                  ? {
                                      ...cartItem,
                                      quantity: cartItem.quantity + 1,
                                    }
                                  : cartItem
                              )
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-base">Total:</span>
                <span className="font-semibold text-base text-primary-600">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <Button
                className="w-full py-2.5"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </div>
          </>
        )}
      </aside>

      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex transition-opacity duration-300 ease-in-out ${
          showMobileCart ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white w-full sm:w-96 h-full ml-auto flex flex-col transform transition-transform duration-300 ease-in-out ${
            showMobileCart ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <header className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <h2 className="font-medium">Detail Pesanan</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowMobileCart(false)}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </header>

          {cart.length === 0 ? (
            <div className="p-4 text-center flex-grow flex items-center justify-center">
              <div className="space-y-3">
                <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-300" />
                <div>
                  <p className="font-medium">Keranjang Anda kosong</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add items to get started
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <div className="flex gap-3 w-full">
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                        <img
                          src={`http://localhost:8000${item.image_url}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="font-medium text-primary-500">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="w-6 h-6 flex items-center hover:cursor-pointer justify-center rounded border border-gray-200 hover:bg-gray-200 text-gray-700"
                            onClick={() => {
                              setCart((prev) =>
                                prev
                                  .map((cartItem) =>
                                    cartItem.id === item.id &&
                                    cartItem.quantity > 0
                                      ? {
                                          ...cartItem,
                                          quantity: cartItem.quantity - 1,
                                        }
                                      : cartItem
                                  )
                                  .filter((cartItem) => cartItem.quantity > 0)
                              );
                            }}
                          >
                            -
                          </button>
                          <span className="text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="w-6 h-6 flex items-center hover:cursor-pointer justify-center rounded border border-gray-200 hover:bg-gray-200 text-gray-700"
                            onClick={() => {
                              setCart((prev) =>
                                prev.map((cartItem) =>
                                  cartItem.id === item.id
                                    ? {
                                        ...cartItem,
                                        quantity: cartItem.quantity + 1,
                                      }
                                    : cartItem
                                )
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-base">Total:</span>
                  <span className="font-semibold text-base text-primary-600">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <Button
                  className="w-full py-2.5"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
