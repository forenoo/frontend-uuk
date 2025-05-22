import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../ui/button";
import EmojiPicker from "emoji-picker-react";
import { client } from "../../../lib/axios-instance";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "😀",
    status: "active",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmojiClick = (emojiData) => {
    setFormData((prev) => ({
      ...prev,
      icon: emojiData.emoji,
    }));
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await client.post("/categories", formData).then(() => {
      navigate("/categories");
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <Link
              to="/categories"
              className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
            >
              <ArrowLeft className="size-5 text-gray-500" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-medium text-primary-950">
              Tambah Kategori Baru
            </h1>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              to="/categories"
              className="w-full sm:w-auto text-center px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
            >
              Batal
            </Link>
            <Button
              type="submit"
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Simpan Kategori
            </Button>
          </div>
        </header>

        <div className="bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-4 sm:p-6 flex flex-col">
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Ikon Kategori
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div
                  className="flex items-center justify-center w-16 h-16 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-3xl"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  {formData.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    className="!w-fit !bg-white !text-primary-500 border border-primary-500 hover:!bg-primary-50 text-xs sm:text-sm"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    {showEmojiPicker ? "Tutup Emoji Picker" : "Pilih Emoji"}
                  </Button>
                </div>
              </div>
              {showEmojiPicker && (
                <div className="mt-2 max-w-full overflow-x-auto">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    width="100%"
                    height="350px"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-xs sm:text-sm font-medium text-gray-700 mb-2"
              >
                Nama Kategori
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 text-xs sm:text-sm"
                placeholder="Masukkan nama kategori"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="text-xs sm:text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <div className="w-full">
                <div className="relative">
                  <select
                    className="w-full bg-transparent text-xs sm:text-sm border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease appearance-none cursor-pointer h-[42px]"
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Tidak Aktif</option>
                  </select>
                  <img
                    src="/select.svg"
                    alt="select"
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
