import {
  DollarSign,
  EyeIcon,
  File,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import Button from "../../ui/Button";

const Dashboard = () => {
  const { username } = useAuth();

  document.title = "Dashboard | Admin";

  const mockData = [
    {
      icon: Users,
      label: "Total Pelanggan",
      value: 2000,
    },
    {
      icon: Package,
      label: "Total Produk",
      value: 1000,
    },
    {
      icon: ShoppingBag,
      label: "Total Penjualan",
      value: 100,
    },
    {
      icon: DollarSign,
      label: "Total Pendapatan",
      value: 10000000,
    },
  ];

  const mockTransactions = [
    {
      id: 1,
      customer_name: "John Doe",
      order_count: 5,
      total: 10000000,
      date: "2024-01-01",
    },
    {
      id: 2,
      customer_name: "Sarah Johnson",
      order_count: 3,
      total: 7500000,
      date: "2024-01-02",
    },
    {
      id: 3,
      customer_name: "Ahmad Rizki",
      order_count: 2,
      total: 3500000,
      date: "2024-01-03",
    },
    {
      id: 4,
      customer_name: "Maya Putri",
      order_count: 4,
      total: 8500000,
      date: "2024-01-04",
    },
    {
      id: 5,
      customer_name: "Budi Santoso",
      order_count: 1,
      total: 2500000,
      date: "2024-01-05",
    },
    {
      id: 6,
      customer_name: "Dewi Lestari",
      order_count: 6,
      total: 12000000,
      date: "2024-01-06",
    },
    {
      id: 7,
      customer_name: "Rudi Hermawan",
      order_count: 2,
      total: 4500000,
      date: "2024-01-07",
    },
    {
      id: 8,
      customer_name: "Linda Wijaya",
      order_count: 3,
      total: 6800000,
      date: "2024-01-08",
    },
    {
      id: 9,
      customer_name: "Fajar Pratama",
      order_count: 4,
      total: 9200000,
      date: "2024-01-09",
    },
    {
      id: 10,
      customer_name: "Siti Nurhaliza",
      order_count: 2,
      total: 3800000,
      date: "2024-01-10",
    },
  ];

  const mockNewestProducts = [
    {
      id: 1,
      name: "Thai Tea",
      price: 150000,
      stock: 50,
      image: "https://placehold.co/100x100",
    },
    {
      id: 2,
      name: "Green Tea",
      price: 75000,
      stock: 100,
      image: "https://placehold.co/100x100",
    },
    {
      id: 3,
      name: "Kopi Susu",
      price: 95000,
      stock: 75,
      image: "https://placehold.co/100x100",
    },
    {
      id: 4,
      name: "Kopi Arabica",
      price: 95000,
      stock: 75,
      image: "https://placehold.co/100x100",
    },
    {
      id: 5,
      name: "Kopi Robusta",
      price: 95000,
      stock: 75,
      image: "https://placehold.co/100x100",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h1 className="text-2xl font-medium text-primary-950">
          Selamat Datang{" "}
          <span className="font-semibold text-primary-500">{username}</span>
        </h1>
        <Button className="!w-fit flex items-center gap-2">
          <File className="size-4" />
          Buat Laporan
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4 p-5"
          >
            <div className="bg-primary-500/10 rounded-full p-2">
              <item.icon className="text-primary-500 size-5" />
            </div>
            <div className="-space-y-1">
              <p className="text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold text-primary-950 mt-2">
                {item.label === "Total Pendapatan"
                  ? `Rp ${item.value.toLocaleString("id-ID")}`
                  : item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7 bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-primary-950">
              Transaksi Terbaru
            </h2>
            <Link
              to={"/transactions"}
              className="text-primary-500 text-sm font-medium hover:underline"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="overflow-y-auto max-h-[300px] pr-2">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3 text-sm font-medium text-gray-500 rounded-tl-lg">
                    Nama
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Order
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Total
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500">
                    Tanggal
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-500 rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 text-primary-950"
                  >
                    <td className="p-3 text-sm">{transaction.customer_name}</td>
                    <td className="p-3 text-sm">{transaction.order_count}</td>
                    <td className="p-3 text-sm">
                      Rp {transaction.total.toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 text-sm">{transaction.date}</td>
                    <td className="p-3 text-sm text-right">
                      <Link
                        to={`/transactions/${transaction.id}`}
                        className="text-primary-500 text-sm font-medium hover:underline"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-5 bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-primary-950">
              Produk Terbaru
            </h2>
            <Link
              to={"/products"}
              className="text-primary-500 text-sm font-medium hover:underline"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="flex flex-col overflow-y-auto max-h-[300px] pr-2 divide-y divide-gray-200">
            {mockNewestProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-primary-950 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-primary-500">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="text-sm text-gray-500">Tersisa 50 Stok</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
