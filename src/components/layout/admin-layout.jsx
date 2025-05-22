import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { navItems } from "../../lib/nav-items";
import { LogOutIcon, Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { useState } from "react";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminPathname = [
    "/dashboard",
    "/products",
    "/categories",
    "/transactions",
  ];

  const { username, role, token } = useAuth();

  if (!username || !token || !role) {
    return <Navigate to="/login" />;
  }

  if (
    role === "user" &&
    adminPathname.some((path) => pathname.startsWith(path))
  ) {
    return <Navigate to="/customer" />;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-dvh bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="w-64 h-dvh fixed top-0 left-0 hidden lg:flex border-r border-gray-200 flex-col bg-white z-30">
        <header className="flex gap-2 items-center pl-4 h-[4rem] border-b border-gray-200">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h1 className="text-2xl text-primary-950 font-semibold">
            Kasir Kita
          </h1>
        </header>
        <nav className="flex p-4">
          <ul className="flex flex-col w-full">
            {navItems.map((item) => {
              const isActive = pathname.includes(item.path);
              return (
                <li key={item.path} className="w-full">
                  <Link
                    to={item.path}
                    className={`flex gap-2 rounded-lg items-center w-full text-sm p-3 transition-all duration-300 ${
                      isActive
                        ? "text-primary-500 bg-primary-500/10 rounded-md"
                        : "text-gray-400 hover:bg-gray-400/10 rounded-md"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <footer className="mt-auto p-4">
          <button
            onClick={() => {
              localStorage.removeItem("data");
              navigate("/login");
            }}
            className="flex gap-2 p-3 hover:bg-gray-400/10 transition-all duration-300 rounded-lg cursor-pointer w-full text-sm items-center text-gray-400"
          >
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </footer>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`w-64 h-dvh fixed top-0 left-0 flex flex-col bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex justify-between items-center px-4 h-[4rem] border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="logo" className="size-8" />
            <h1 className="text-xl text-primary-950 font-semibold">
              Kasir Kita
            </h1>
          </div>
          <button
            onClick={closeMobileMenu}
            className="text-gray-500 hover:cursor-pointer"
          >
            <X className="size-6" />
          </button>
        </header>
        <nav className="flex p-4">
          <ul className="flex flex-col w-full">
            {navItems.map((item) => {
              const isActive = pathname.includes(item.path);
              return (
                <li key={item.path} className="w-full">
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex gap-2 rounded-lg items-center w-full text-sm p-3 transition-all duration-300 ${
                      isActive
                        ? "text-primary-500 bg-primary-500/10 rounded-md"
                        : "text-gray-400 hover:bg-gray-400/10 rounded-md"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <footer className="mt-auto p-4">
          <button
            onClick={() => {
              localStorage.removeItem("data");
              navigate("/login");
              closeMobileMenu();
            }}
            className="flex gap-2 p-3 hover:bg-gray-400/10 transition-all duration-300 rounded-lg cursor-pointer w-full text-sm items-center text-gray-400"
          >
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </footer>
      </aside>

      <div className="w-full">
        {/* Desktop Header */}
        <header className="hidden lg:flex fixed w-full top-0 left-64 bg-white gap-3 items-center pl-4 h-[4rem] border-b border-gray-200">
          <h1 className="text-xl text-primary-500 font-semibold">
            {pathname.includes("/dashboard")
              ? "Dashboard"
              : pathname.includes("/products")
              ? "Produk"
              : pathname.includes("/categories")
              ? "Kategori"
              : "Transaksi"}
          </h1>
        </header>

        {/* Mobile Header */}
        <header className="flex lg:hidden fixed w-full top-0 z-20 bg-white justify-between items-center px-4 h-[4rem] border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:cursor-pointer"
            >
              <Menu className="size-6" />
            </button>
            <img src="/logo.svg" alt="logo" className="size-6" />
            <h1 className="text-lg text-primary-950 font-semibold">
              Kasir Kita
            </h1>
          </div>
          <h2 className="text-base text-primary-500 font-semibold">
            {pathname.includes("/dashboard")
              ? "Dashboard"
              : pathname.includes("/products")
              ? "Produk"
              : pathname.includes("/categories")
              ? "Kategori"
              : "Transaksi"}
          </h2>
        </header>

        <main className="lg:ml-64 mt-16 p-4 lg:p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
