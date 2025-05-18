import { HomeIcon, PackageIcon, ShoppingCartIcon } from "lucide-react";

export const navItems = [
  {
    icon: <HomeIcon className="size-4" />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <PackageIcon className="size-4" />,
    label: "Produk",
    path: "/products",
  },
  {
    icon: <ShoppingCartIcon className="size-4" />,
    label: "Transaksi",
    path: "/transactions",
  },
];
