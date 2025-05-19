import { ArrowLeft, Cookie, CupSoda, Hamburger, Upload } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    type: "makanan",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
          >
            <ArrowLeft className="size-5 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-medium text-primary-950">
            Tambah Produk Baru
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            to="/products"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            Batal
          </Link>
          <Button type="submit" className="flex items-center gap-2">
            Simpan Produk
          </Button>
        </div>
      </header>

      <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Foto Produk
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col relative items-center p-4 justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
                  ${
                    imagePreview
                      ? "border-primary-300 bg-primary-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {imagePreview ? (
                  <div className="w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white text-base">
                        Klik untuk mengubah
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Klik untuk upload</span>{" "}
                      atau drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG, WEBP
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Nama Produk
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Masukkan nama produk"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="type"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Kategori
            </label>
            <div class="w-full">
              <div class="relative">
                <select
                  class="w-full bg-transparent text-sm border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease appearance-none cursor-pointer h-[42px]"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="kopi">Kopi</option>
                  <option value="es_kopi">Es Kopi</option>
                  <option value="jus">Jus</option>
                </select>
                <img
                  src="/select.svg"
                  alt="select"
                  className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 "
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Tipe Produk
              </label>
              <div class="w-full">
                <div class="relative">
                  <select
                    class="w-full bg-transparent text-sm border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease appearance-none cursor-pointer h-[42px]"
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="minuman">Minuman</option>
                    <option value="makanan">Makanan</option>
                    <option value="snack">Snack</option>
                  </select>
                  <img
                    src="/select.svg"
                    alt="select"
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 "
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Harga (Rp)
              </label>
              <input
                type="number"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Pilih kategori produk"
                min="0"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="stock"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Stok
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Masukkan jumlah stok"
                min="0"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
