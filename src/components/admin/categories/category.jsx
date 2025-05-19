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
import { categoryMockData } from "../../../lib/mockdata";

const Category = () => {
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h1 className="text-2xl font-medium text-primary-950">
          Kategori Produk
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari kategori"
            className="max-w-[200px] border text-sm border-gray-300 rounded-lg px-4 py-2"
          />
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-500 rounded-tl-lg">
                  Ikon
                </th>
                <th className="p-3 text-sm font-medium text-gray-500">Nama</th>
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
              {categoryMockData.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 text-primary-950"
                >
                  <td className="p-3 text-lg">{category.icon}</td>
                  <td className="p-3 text-sm">{category.name}</td>
                  <td className="p-3 text-sm">{category.total_product}</td>
                  <td className="p-3 text-sm">
                    {category.status === "aktif" ? (
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
                      onClick={() => toggleDropdown(category.id)}
                    >
                      <Ellipsis className="size-5 text-primary-500" />
                    </button>

                    {activeDropdown === category.id && (
                      <div className="absolute right-8 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                        <ul className="py-1 text-sm text-primary-950 divide-y divide-gray-200">
                          <li>
                            <button
                              onClick={() =>
                                navigate(`/categories/edit/${category.id}`)
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
              {categoryMockData.length === 0 && (
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

export default Category;
