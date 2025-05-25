import {
  Navigate,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { userNavItems } from "../../lib/nav-items";
import { LogOutIcon, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

const UserLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { role, username, token } = useAuth();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  if (!username || !token || !role) {
    return <Navigate to="/login" />;
  }

  if (role !== "user" && pathname === "/customer") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex min-h-dvh bg-gray-50">
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 lg:hidden z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="text-gray-500"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h1 className="text-xl text-primary-950 font-semibold">Kasir Kita</h1>
        </div>
      </header>

      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          onClick={() => setShowMobileSidebar(false)}
        ></div>
      )}

      <aside className="w-64 h-dvh fixed top-0 left-0 hidden lg:flex border-r border-gray-200 flex-col bg-white z-40">
        <header className="flex gap-2 items-center pl-4 h-[74px] border-b border-gray-200">
          <img src="/logo.svg" alt="logo" className="size-8" />
          <h1 className="text-2xl text-primary-950 font-semibold">
            Kasir Kita
          </h1>
        </header>
        <nav className="flex p-4">
          <ul className="flex flex-col w-full">
            {userNavItems.map((item) => {
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
        <footer className="mt-auto border-t border-gray-200 p-4">
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

      <aside
        className={`w-64 h-dvh fixed top-0 left-0 flex lg:hidden border-r border-gray-200 flex-col bg-white z-40 transform transition-transform duration-300 ${
          showMobileSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex justify-between items-center px-4 h-[74px] border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="logo" className="size-8" />
            <h1 className="text-2xl text-primary-950 font-semibold">
              Kasir Kita
            </h1>
          </div>
          <button
            onClick={() => setShowMobileSidebar(false)}
            className="text-gray-500"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </header>
        <nav className="flex p-4">
          <ul className="flex flex-col w-full">
            {userNavItems.map((item) => {
              const isActive = pathname.includes(item.path);
              return (
                <li key={item.path} className="w-full">
                  <Link
                    to={item.path}
                    onClick={() => setShowMobileSidebar(false)}
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
        <footer className="mt-auto border-t border-gray-200 p-4">
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

      <main className="lg:ml-64 w-full pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
