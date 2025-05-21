import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Package, Printer } from "lucide-react";
import Button from "../../ui/button";
import { client } from "../../../lib/axios-instance";

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        setLoading(true);
        const response = await client.get(`/transactions/${id}`);
        setTransaction(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        setError("Failed to fetch transaction details");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-primary-500 cursor-pointer"
              onClick={() => navigate("/transactions")}
            >
              <ArrowLeft className="size-4" />
              <span>Kembali</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-10">
            <div className="text-lg text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="flex flex-col gap-5">
        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-primary-500 cursor-pointer"
              onClick={() => navigate("/transactions")}
            >
              <ArrowLeft className="size-4" />
              <span>Kembali</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-10">
            <div className="text-lg text-gray-500">
              {error || "Transaksi tidak ditemukan"}
            </div>
            <Button className="mt-4" onClick={() => navigate("/transactions")}>
              Kembali ke Daftar Transaksi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/transactions"
              className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
            >
              <ArrowLeft className="size-5 text-gray-500" />
            </Link>
            <h1 className="text-2xl font-medium text-primary-950">
              Detail Transaksi
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="!w-fit flex items-center gap-2"
            onClick={() => window.print()}
          >
            <Printer className="size-4" />
            Cetak Struk
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
          <h2 className="text-lg font-medium text-primary-950 mb-4">
            Informasi Pelanggan
          </h2>
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{transaction.customer.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor Telepon</p>
              <p className="font-medium">{transaction.customer.phone_number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="font-medium">{transaction.customer.address}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
          <h2 className="text-lg font-medium text-primary-950 mb-4">
            Ringkasan Transaksi
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">ID Pesanan</p>
              <p className="font-medium">#{transaction._id}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Tanggal</p>
              <p className="font-medium">{formatDate(transaction.createdAt)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Waktu</p>
              <p className="font-medium">{formatTime(transaction.createdAt)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total Produk</p>
              <p className="font-medium">{transaction.total_items} Item</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-medium text-primary-500">
                Rp {transaction.total_price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h2 className="text-lg font-medium text-primary-950 mb-4">
          Detail Pesanan
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-500 rounded-tl-lg">
                  Produk
                </th>
                <th className="p-3 text-sm font-medium text-gray-500">
                  Harga Satuan
                </th>
                <th className="p-3 text-sm font-medium text-gray-500">
                  Jumlah
                </th>
                <th className="p-3 text-sm font-medium text-gray-500 rounded-tr-lg text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transaction.details?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 text-primary-950"
                >
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-3">
                      {item.product.image_url ? (
                        <img
                          src={`http://localhost:8000${item.product.image_url}`}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="size-5 text-gray-400" />
                        </div>
                      )}
                      <span className="font-medium">{item.product.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    Rp {item.product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-sm">{item.quantity} item</td>
                  <td className="p-3 text-sm text-right">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td
                  colSpan={4}
                  className="p-3 text-sm font-semibold text-primary-500 text-right"
                >
                  Rp {transaction.total_price.toLocaleString("id-ID")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
