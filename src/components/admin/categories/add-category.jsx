import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import EmojiPicker from "emoji-picker-react";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    status: "aktif",
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <div className="flex items-center gap-4">
          <Link
            to="/categories"
            className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
          >
            <ArrowLeft className="size-5 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-medium text-primary-950">
            Tambah Kategori Baru
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            to="/categories"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            Batal
          </Link>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            Simpan Kategori
          </Button>
        </div>
      </header>

      <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Ikon Kategori
            </label>
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-16 h-16 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-3xl"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {formData.icon || "😀"}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  className="!w-fit !bg-white !text-primary-500 border border-primary-500 hover:!bg-primary-50"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  {showEmojiPicker ? "Tutup Emoji Picker" : "Pilih Emoji"}
                </Button>
              </div>
            </div>
            {showEmojiPicker && (
              <div className="mt-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Nama Kategori
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Masukkan nama kategori"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <div className="w-full">
              <div className="relative">
                <select
                  className="w-full bg-transparent text-sm border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease appearance-none cursor-pointer h-[42px]"
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="aktif">Aktif</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
                </select>
                <img
                  src="/select.svg"
                  alt="select"
                  className="h-5 w-5 ml-1 absolute top-2.5 right-2.5"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
