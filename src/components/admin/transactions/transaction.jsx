import { useEffect, useState } from "react";
import { Ellipsis, Eye, Trash2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transactionMockData } from "../../../lib/mockdata";
import { client } from "../../../lib/axios-instance";

const Transaction = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const fetchTransactions = async () => {
    try {
      const url = searchQuery
        ? `/transactions?q=${encodeURIComponent(searchQuery)}`
        : "/transactions";
      const response = await client.get(url);
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus transaksi ini?"
    );

    if (isConfirmed) {
      try {
        await client.delete(`/transactions/${id}`);
        // Remove the deleted transaction from the state
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
        setActiveDropdown(null); // Close dropdown after deletion
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Gagal menghapus transaksi");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
    fetchTransactions();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchTransactions();
  }, [location.search]);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5">
        <h1 className="text-2xl font-medium text-primary-950">
          Daftar Transaksi
        </h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Cari transaksi"
            value={searchQuery}
            onChange={handleSearchChange}
            className="max-w-[200px] border text-sm border-gray-300 rounded-lg px-4 py-2"
          />
        </form>
      </header>
      <div className="bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-500">
                  ID Pesanan
                </th>
                <th className="p-3 text-sm font-medium text-gray-500 rounded-tl-lg">
                  Nama Pelanggan
                </th>
                <th className="p-3 text-sm font-medium text-gray-500">
                  Jumlah Order
                </th>
                <th className="p-3 text-sm font-medium text-gray-500">Total</th>
                <th className="p-3 text-sm font-medium text-gray-500 rounded-tr-lg text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="hover:bg-gray-50 text-primary-950"
                >
                  <td className="p-3 text-sm font-medium">{transaction._id}</td>
                  <td className="p-3 text-sm font-medium">
                    {transaction.customer.username}
                  </td>
                  <td className="p-3 text-sm">{transaction.total_items}</td>
                  <td className="p-3 text-sm">
                    Rp {transaction.total_price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-sm text-right">
                    <button
                      className="inline-flex items-center justify-center cursor-pointer p-1 rounded-full hover:bg-gray-100"
                      onClick={() => toggleDropdown(transaction._id)}
                    >
                      <Ellipsis className="size-5 text-primary-500" />
                    </button>

                    {activeDropdown === transaction._id && (
                      <div className="absolute right-8 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                        <ul className="py-1 text-sm text-primary-950 divide-y divide-gray-200">
                          <li>
                            <button
                              onClick={() =>
                                navigate(`/transactions/${transaction._id}`)
                              }
                              className="px-4 py-2 hover:bg-gray-100 w-full text-left flex items-center gap-2"
                            >
                              <Eye className="size-4" />
                              Detail
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(transaction._id)}
                              className="px-4 py-2 hover:bg-red-50 text-red-500 w-full text-left flex items-center gap-2"
                            >
                              <Trash2 className="size-4" />
                              Hapus
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {transactionMockData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-3 text-sm text-center text-gray-500"
                  >
                    Tidak ada transaksi yang tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
