import {
  HomeIcon,
  Package,
  ShoppingBasket,
  ShoppingCartIcon,
} from "lucide-react";

export const navItems = [
  {
    icon: <HomeIcon className="size-4" />,
    label: "Beranda",
    path: "/dashboard",
  },
  {
    icon: <Package className="size-4" />,
    label: "Kategori",
    path: "/categories",
  },
  {
    icon: <ShoppingBasket className="size-4" />,
    label: "Produk",
    path: "/products",
  },
  {
    icon: <ShoppingCartIcon className="size-4" />,
    label: "Transaksi",
    path: "/transactions",
  },
];

export const userNavItems = [
  {
    icon: <HomeIcon className="size-4" />,
    label: "Beranda",
    path: "/",
  },
  {
    icon: <ShoppingCartIcon className="size-4" />,
    label: "Riwayat",
    path: "/history",
  },
];
