import loginIllus from "../assets/login-illustration.png";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "./ui/auth-field";
import Button from "./ui/Button";

const Register = () => {
  document.title = "Register | Kiro";

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("token", "test-dummy-token");
    localStorage.setItem("username", "test-dummy-username");
    navigate("/");
  };

  return (
    <main className="py-4 md:py-6 lg:py-8 paddingContainer min-h-screen grid grid-cols-2 gap-5">
      <div className="w-full h-full relative flex items-center justify-center max-w-[500px] mx-auto">
        <header className="flex gap-3 absolute top-0 left-0">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h1 className="text-2xl text-primary-950 font-semibold">Kiro</h1>
        </header>
        <div className="flex flex-col gap-[80px] w-full mt-[50px]">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold text-primary-950">
              Buat Akun Anda
            </h1>
            <p className="text-gray-400">
              Bergabung sekarang untuk memulai bertransaksi
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleOnSubmit}>
            <AuthField
              label="Username"
              type="text"
              name="username"
              placeholder="Masukkan username anda"
            />
            <AuthField
              label="Alamat"
              textArea
              name="address"
              placeholder="Masukkan alamat anda"
            />
            <AuthField
              label="Nomor Telepon"
              type="number"
              name="phone"
              placeholder="Masukkan nomor telepon anda"
            />
            <AuthField
              label="Kata Sandi"
              type="password"
              name="password"
              placeholder="Masukkan kata sandi anda"
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
      <div className="w-full rounded-3xl h-full flex items-center justify-center bg-[#FAFAFA]">
        <img src={loginIllus} alt="login-illustration" className="size-80" />
      </div>
    </main>
  );
};

export default Register;
