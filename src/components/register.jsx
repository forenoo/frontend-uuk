import loginIllus from "../assets/login-illustration.png";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "./ui/auth-field";
import Button from "./ui/button";
import { useState } from "react";
import { client } from "../lib/axios-instance";

const Register = () => {
  document.title = "Register | Kasir Kita";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    await client
      .post("/auth/register", formData)
      .then((res) => {
        const dataToSave = {
          id: res.data.data.user.id,
          token: res.data.data.token,
          username: res.data.data.user.username,
          role: res.data.data.user.role,
        };

        localStorage.setItem("data", JSON.stringify(dataToSave));
        navigate("/customer");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="py-4 md:py-6 lg:py-8 paddingContainer min-h-screen grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="w-full h-full relative flex items-center justify-center max-w-[500px] mx-auto">
        <header className="flex gap-3 absolute top-0 left-0">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h1 className="text-2xl text-primary-950 font-semibold">
            Kasir Kita
          </h1>
        </header>
        <div className="flex flex-col gap-[30px] md:gap-[40px] w-full mt-[50px]">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-primary-950">
              Buat Akun Anda
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Bergabung sekarang untuk memulai bertransaksi
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleOnSubmit}>
            <AuthField
              label="Username"
              type="text"
              name="username"
              placeholder="Masukkan username anda"
              onChange={handleOnChange}
            />
            <AuthField
              label="Alamat"
              textArea
              name="address"
              placeholder="Masukkan alamat anda"
              onChange={handleOnChange}
            />
            <AuthField
              label="Nomor Telepon"
              type="number"
              name="phone"
              placeholder="Masukkan nomor telepon anda"
              onChange={handleOnChange}
            />
            <AuthField
              label="Kata Sandi"
              type="password"
              name="password"
              placeholder="Masukkan kata sandi anda"
              onChange={handleOnChange}
            />
            <Button className="w-full bg-primary-500 text-white rounded-lg p-2">
              Daftar
            </Button>
          </form>
          <p className="text-sm text-gray-400 text-center">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-primary-500 font-medium">
              Masuk
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full rounded-3xl h-full hidden md:flex items-center justify-center bg-[#FAFAFA]">
        <img
          src={loginIllus}
          alt="login-illustration"
          className="w-4/5 max-w-[320px] md:size-80"
        />
      </div>
    </main>
  );
};

export default Register;
