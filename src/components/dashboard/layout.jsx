import React from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { navItems } from "../../lib/nav-items";
import { LogOutIcon } from "lucide-react";

const RootLayout = () => {
  const { pathname } = useLocation();

  const data = JSON.parse(localStorage.getItem("data"));
  if (!data || !data.username || !data.token || !data.role) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-dvh bg-gray-50">
      <aside className="w-72 h-dvh hidden lg:flex border-r border-gray-200 flex-col bg-white">
        <header className="flex gap-2 items-center pl-4 h-[4rem] border-b border-gray-200">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h1 className="text-2xl text-primary-950 font-semibold">Kiro</h1>
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
          <button className="flex gap-2 p-3 hover:bg-gray-400/10 transition-all duration-300 rounded-lg cursor-pointer w-full text-sm items-center text-gray-400">
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </footer>
      </aside>
      <div className="w-full">
        <header className="flex bg-white gap-3 items-center pl-4 h-[4rem] border-b border-gray-200">
          <h1 className="text-xl text-primary-500 font-semibold">
            {pathname.includes("/dashboard")
              ? "Dashboard"
              : pathname.includes("/products")
              ? "Produk"
              : "Transaksi"}
          </h1>
        </header>
        <main className="p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
