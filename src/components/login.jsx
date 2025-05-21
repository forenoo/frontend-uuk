import loginIllus from "../assets/login-illustration.png";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "./ui/auth-field";
import Button from "./ui/button";
import { client } from "../lib/axios-instance";
import { useState } from "react";

const Login = () => {
  document.title = "Login | Kiro";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    await client
      .post("/auth/login", formData)
      .then((res) => {
        const dataToSave = {
          token: res.data.data.token,
          username: res.data.data.user.username,
          role: res.data.data.user.role,
        };

        localStorage.setItem("data", JSON.stringify(dataToSave));
        navigate("/");
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          const validationErrors = {};
          e.response.data.errors.forEach((error) => {
            validationErrors[error.path] = error.msg;
          });
          setErrors(validationErrors);
        } else {
          console.log(e);
        }
      });
  };

  return (
    <main className="py-4 md:py-6 lg:py-8 paddingContainer min-h-screen grid grid-cols-2 gap-5">
      <div className="w-full h-full relative flex items-center justify-center max-w-[500px] mx-auto">
        <header className="flex gap-3 absolute top-0 left-0">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h1 className="text-2xl text-primary-950 font-semibold">Kiro</h1>
        </header>
        <div className="flex flex-col gap-[40px] w-full mt-[50px]">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold text-primary-950">
              Masuk ke Akun Anda
            </h1>
            <p className="text-gray-400">
              Selamat datang kembali! Silakan masuk ke akun Anda
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleOnSubmit}>
            <AuthField
              label="Username"
              type="text"
              name="username"
              onChange={handleOnChange}
              placeholder="Masukkan username anda"
              error={errors.username}
            />
            <AuthField
              label="Kata Sandi"
              type="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Masukkan kata sandi anda"
              error={errors.password}
            />
            <Button className="w-full bg-primary-500 text-white rounded-lg p-2">
              Masuk
            </Button>
          </form>
          <p className="text-sm text-gray-400 text-center">
            Belum punya akun?{" "}
            <Link to="/register" className="text-primary-500 font-medium">
              Daftar
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full rounded-3xl h-full flex items-center justify-center bg-[#FAFAFA]">
        <img src={loginIllus} alt="login-illustration" className="size-80" />
      </div>
    </main>
  );
};

export default Login;
