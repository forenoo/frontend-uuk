import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Package, Printer } from "lucide-react";
import { transactionMockData } from "../../../lib/mockdata";
import Button from "../../ui/Button";

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const foundTransaction = transactionMockData.find(
      (t) => t.id === parseInt(id)
    );
    setTransaction(foundTransaction);
  }, [id]);

  if (!transaction) {
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
              Transaksi tidak ditemukan
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
              to="/products"
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
              <p className="text-sm text-gray-500">Nama</p>
              <p className="font-medium">{transaction.customer.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor Telepon</p>
              <p className="font-medium">{transaction.customer.phone}</p>
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
              <p className="font-medium">#{transaction.id}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Tanggal</p>
              <p className="font-medium">
                {formatDate(transaction.created_at)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Waktu</p>
              <p className="font-medium">
                {formatTime(transaction.created_at)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total Produk</p>
              <p className="font-medium">
                {transaction.order_details.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}{" "}
                Item
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-medium text-primary-500">
                Rp {transaction.total.toLocaleString("id-ID")}
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
              {transaction.order_details.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-primary-950">
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.product}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <span className="font-medium">{item.product}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-sm">{item.quantity} item</td>
                  <td className="p-3 text-sm text-right">
                    Rp {item.total.toLocaleString("id-ID")}
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
                  Rp {transaction.total.toLocaleString("id-ID")}
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
