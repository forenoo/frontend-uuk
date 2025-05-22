import {
  Cookie,
  CupSoda,
  Ellipsis,
  Hamburger,
  Pencil,
  Plus,
  Trash2,
  Loader2,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../../ui/button";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { client } from "../../../lib/axios-instance";

const Product = () => {
  document.title = "Daftar Produk | Admin";

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `${import.meta.env.VITE_API_URL}/products?q=${encodeURIComponent(
            searchQuery
          )}`
        : `${import.meta.env.VITE_API_URL}/products`;
      const response = await client.get(url);
      setProducts(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
    fetchProducts();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        fetchProducts();
        setActiveDropdown(null);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h1 className="text-2xl font-medium text-primary-950">Daftar Produk</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <div className="relative w-full sm:w-[200px]">
              <input
                type="text"
                placeholder="Cari produk"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border text-sm border-gray-300 rounded-lg pl-9 pr-4 py-2"
              />
              <Search className="absolute left-3 top-2.5 size-4 text-gray-400" />
            </div>
            <Button type="submit" className={"!w-fit"}>
              Cari
            </Button>
          </form>
          <Button
            onClick={() => navigate("/products/add")}
            className="!w-full sm:!w-fit flex items-center justify-center gap-2"
          >
            <Plus className="size-4" />
            Tambah Produk
          </Button>
        </div>
      </header>
      <div className="bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="size-8 animate-spin text-primary-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-5">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3 text-sm font-medium text-gray-500 rounded-tl-lg">
                    Produk
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Tipe
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Kategori
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Harga
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Stok
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500 rounded-tr-lg text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product._id || product.id}
                    className="hover:bg-gray-50 text-primary-950"
                  >
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={`http://localhost:8000${product.image_url}`}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/100x100";
                          }}
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      {product.type === "drink" ? (
                        <span className="bg-red-500/10 text-red-500 text-sm px-2 py-1 rounded-full flex w-fit items-center gap-2">
                          <CupSoda className="size-4" />
                          Minuman
                        </span>
                      ) : product.type === "food" ? (
                        <span className="bg-blue-500/10 text-blue-500 text-sm px-2 py-1 rounded-full flex w-fit items-center gap-2">
                          <Hamburger className="size-4" />
                          Makanan
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-500 text-sm px-2 py-1 rounded-full flex w-fit items-center gap-2">
                          <Cookie className="size-4" />
                          Snack
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {product.category ? (
                        <div className="flex items-center gap-1">
                          <span>{product.category.icon}</span>
                          <span>{product.category.name}</span>
                          {product.category.status === "inactive" && (
                            <span className="text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                              Inactive
                            </span>
                          )}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 text-sm">{product.stock}</td>
                    <td className="p-3 text-sm text-center">
                      <div className="relative">
                        <button
                          className="inline-flex items-center justify-center cursor-pointer p-1 rounded-full hover:bg-gray-100"
                          onClick={() =>
                            toggleDropdown(product._id || product.id)
                          }
                        >
                          <Ellipsis className="size-5 text-primary-500" />
                        </button>

                        {activeDropdown === (product._id || product.id) && (
                          <div className="absolute right-0 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                            <ul className="py-1 text-sm text-primary-950 divide-y divide-gray-200">
                              <li>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/products/edit/${
                                        product._id || product.id
                                      }`
                                    )
                                  }
                                  className="px-4 py-2 hover:bg-gray-100 w-full text-left flex items-center gap-2"
                                >
                                  <Pencil className="size-4" />
                                  Ubah
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleDelete(product._id || product.id)
                                  }
                                  className="px-4 py-2 hover:bg-red-50 text-red-500 w-full text-left flex items-center gap-2"
                                >
                                  <Trash2 className="size-4" />
                                  Hapus
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-3 text-sm text-center text-gray-500"
                    >
                      Tidak ada produk yang tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
