import { Ellipsis, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../ui/button";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { client } from "../../../lib/axios-instance";

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `/categories?q=${encodeURIComponent(searchQuery)}`
        : "/categories";

      const response = await client.get(url);
      setCategories(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
    fetchCategories();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await client.delete(`/categories/${id}`);
        fetchCategories();
        setActiveDropdown(null);
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [location.search]);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h1 className="text-2xl font-medium text-primary-950">
          Kategori Produk
        </h1>
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Cari kategori"
              value={searchQuery}
              onChange={handleSearchChange}
              className="max-w-[200px] border text-sm border-gray-300 rounded-lg px-4 py-2"
            />
          </form>
          <Button
            onClick={() => navigate("/categories/add")}
            className="!w-fit flex items-center gap-2"
          >
            <Plus className="size-4" />
            Tambah Kategori
          </Button>
        </div>
      </header>
      <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-5">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3 text-sm font-medium text-gray-500 rounded-tl-lg">
                    Ikon
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Nama
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Total Produk
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500 rounded-tr-lg text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-gray-50 text-primary-950"
                  >
                    <td className="p-3 text-lg">{category.icon}</td>
                    <td className="p-3 text-sm">{category.name}</td>
                    <td className="p-3 text-sm">
                      {category.total_product || 0}
                    </td>
                    <td className="p-3 text-sm">
                      {category.status === "active" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-500">Aktif</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-red-500">
                            Tidak Aktif
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-sm text-right">
                      <button
                        className="inline-flex items-center justify-center cursor-pointer p-1 rounded-full hover:bg-gray-100"
                        onClick={() => toggleDropdown(category._id)}
                      >
                        <Ellipsis className="size-5 text-primary-500" />
                      </button>

                      {activeDropdown === category._id && (
                        <div className="absolute right-8 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                          <ul className="py-1 text-sm text-primary-950 divide-y divide-gray-200">
                            <li>
                              <button
                                onClick={() =>
                                  navigate(`/categories/edit/${category._id}`)
                                }
                                className="px-4 py-2 hover:bg-gray-100 w-full text-left flex items-center gap-2"
                              >
                                <Pencil className="size-4" />
                                Ubah
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(category._id)}
                                className="px-4 py-2 hover:bg-red-50 text-red-500 w-full text-left flex items-center gap-2"
                              >
                                <Trash2 className="size-4" />
                                Hapus
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-3 text-sm text-center text-gray-500"
                    >
                      Tidak ada kategori yang tersedia
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

export default Category;
