import { DollarSign, File, Package, ShoppingBag, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import Button from "../../ui/button";
import { useEffect, useState } from "react";
import { client } from "../../../lib/axios-instance";

const Dashboard = () => {
  document.title = "Dashboard | Admin";

  const { username } = useAuth();

  const [overview, setOverview] = useState();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [newestProducts, setNewestProducts] = useState([]);

  const handleFetchOverview = async () => {
    await client.get("/overview").then((res) => {
      setOverview(res.data.data);
    });
  };

  const handleFetchRecentTransactions = async () => {
    await client.get("/overview/recent-transactions").then((res) => {
      setRecentTransactions(res.data.data);
    });
  };

  const handleFetchRecentProducts = async () => {
    await client.get("/overview/recent-products").then((res) => {
      setNewestProducts(res.data.data);
    });
  };

  useEffect(() => {
    handleFetchOverview();
    handleFetchRecentTransactions();
    handleFetchRecentProducts();
  }, []);

  // Format ISO date to readable format
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h1 className="text-2xl font-medium text-primary-950">
          Selamat Datang{" "}
          <span className="font-semibold text-primary-500">{username}</span>
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4 p-5">
          <div className="bg-primary-500/10 rounded-full p-2">
            <Users className="text-primary-500 size-5" />
          </div>
          <div className="-space-y-1">
            <p className="text-gray-500">Total Pelanggan</p>
            <p className="text-2xl font-semibold text-primary-950 mt-2">
              {overview?.totalCustomer}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4 p-5">
          <div className="bg-primary-500/10 rounded-full p-2">
            <Package className="text-primary-500 size-5" />
          </div>
          <div className="-space-y-1">
            <p className="text-gray-500">Total Produk</p>
            <p className="text-2xl font-semibold text-primary-950 mt-2">
              {overview?.totalProduct}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4 p-5">
          <div className="bg-primary-500/10 rounded-full p-2">
            <ShoppingBag className="text-primary-500 size-5" />
          </div>
          <div className="-space-y-1">
            <p className="text-gray-500">Total Penjualan</p>
            <p className="text-2xl font-semibold text-primary-950 mt-2">
              {overview?.totalTransaction}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4 p-5">
          <div className="bg-primary-500/10 rounded-full p-2">
            <DollarSign className="text-primary-500 size-5" />
          </div>
          <div className="-space-y-1">
            <p className="text-gray-500">Total Pendapatan</p>
            <p className="text-2xl font-semibold text-primary-950 mt-2">
              Rp {overview?.totalRevenue.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
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
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-gray-50 text-primary-950"
                  >
                    <td className="p-3 text-sm">
                      {transaction.customer?.username}
                    </td>
                    <td className="p-3 text-sm">{transaction.total_items}</td>
                    <td className="p-3 text-sm">
                      Rp {transaction.total_price.toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 text-sm">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="p-3 text-sm text-right">
                      <Link
                        to={`/transactions/${transaction._id}`}
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
            {newestProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <img
                  src={`http://localhost:8000${product.image_url}`}
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
                <div className="text-sm text-gray-500">
                  Tersisa {product.stock} Stok
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
