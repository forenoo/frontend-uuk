import {
  Cookie,
  CupSoda,
  Ellipsis,
  Hamburger,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { productMockData } from "../../../lib/mockdata";

const Product = () => {
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h1 className="text-2xl font-medium text-primary-950">Daftar Produk</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari produk"
            className="max-w-[200px] border text-sm border-gray-300 rounded-lg px-4 py-2"
          />
          <Button
            onClick={() => navigate("/products/add")}
            className="!w-fit flex items-center gap-2"
          >
            <Plus className="size-4" />
            Tambah Produk
          </Button>
        </div>
      </header>
      <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-500 rounded-tl-lg">
                  Produk
                </th>
                <th className="p-3 text-sm font-medium text-gray-500">Tipe</th>
                <th className="p-3 text-sm font-medium text-gray-500">
                  Kategori
                </th>
                <th className="p-3 text-sm font-medium text-gray-500">Harga</th>
                <th className="p-3 text-sm font-medium text-gray-500">Stok</th>
                <th className="p-3 text-sm font-medium text-gray-500 rounded-tr-lg text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productMockData.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 text-primary-950"
                >
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    {product.type === "minuman" ? (
                      <span className="bg-red-500/10 text-red-500 text-sm px-2 py-1 rounded-full flex w-fit items-center gap-2">
                        <CupSoda className="size-4" />
                        Minuman
                      </span>
                    ) : product.type === "makanan" ? (
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
                  <td className="p-3 text-sm">{product.category}</td>
                  <td className="p-3 text-sm">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-sm">{product.stock}</td>
                  <td className="p-3 text-sm text-center">
                    <button
                      className="inline-flex items-center justify-center cursor-pointer p-1 rounded-full hover:bg-gray-100"
                      onClick={() => toggleDropdown(product.id)}
                    >
                      <Ellipsis className="size-5 text-primary-500" />
                    </button>

                    {activeDropdown === product.id && (
                      <div className="absolute right-8 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                        <ul className="py-1 text-sm text-primary-950 divide-y divide-gray-200">
                          <li>
                            <button
                              onClick={() =>
                                navigate(`/products/edit/${product.id}`)
                              }
                              className="px-4 py-2 hover:bg-gray-100 w-full text-left flex items-center gap-2"
                            >
                              <Pencil className="size-4" />
                              Ubah
                            </button>
                          </li>
                          <li>
                            <button className="px-4 py-2 hover:bg-red-50 text-red-500 w-full text-left flex items-center gap-2">
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
              {productMockData.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-3 text-sm text-center text-gray-500"
                  >
                    Tidak ada produk yang tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
