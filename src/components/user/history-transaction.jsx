import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { client } from "../../lib/axios-instance";
import { EyeIcon, SearchIcon } from "lucide-react";

const HistoryTransaction = () => {
  document.title = "Riwayat Transaksi | Kasir Kita";

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [transactions, setTransactions] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
    fetchTransactions();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchTransactions = async () => {
    try {
      const url = searchQuery
        ? `/transactions/user?q=${encodeURIComponent(searchQuery)}`
        : "/transactions/user";
      const response = await client.get(url);
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [location.search]);

  return (
    <div className="flex flex-col gap-4 p-3 sm:gap-5 sm:p-5">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-4">
        <h1 className="text-xl sm:text-2xl font-medium text-primary-950">
          Riwayat Transaksi
        </h1>
        <form onSubmit={handleSearch} className="w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transaction"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:max-w-[200px] border text-sm border-gray-300 rounded-lg pl-9 pr-4 py-2"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </header>

      <div className="hidden sm:flex bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-5 flex-col">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-500">
                  ID Pesanan
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
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-gray-50 text-primary-950"
                  >
                    <td className="p-3 text-sm font-medium">
                      {transaction._id}
                    </td>
                    <td className="p-3 text-sm">{transaction.total_items}</td>
                    <td className="p-3 text-sm">
                      Rp {transaction.total_price.toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 text-sm text-right">
                      <button
                        onClick={() => navigate(`/history/${transaction._id}`)}
                        className="inline-flex items-center justify-center cursor-pointer p-1.5 rounded-full hover:bg-gray-100"
                        title="View details"
                      >
                        <EyeIcon className="size-4 text-primary-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-3 text-sm text-center text-gray-500"
                  >
                    No transactions available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sm:hidden bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-3 flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-2 text-xs font-medium text-gray-500">
                  ID Pesanan
                </th>
                <th className="p-2 text-xs font-medium text-gray-500">
                  Jumlah Order
                </th>
                <th className="p-2 text-xs font-medium text-gray-500">Total</th>
                <th className="p-2 text-xs font-medium text-gray-500 rounded-tr-lg text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-gray-50 text-primary-950"
                  >
                    <td className="p-2 text-xs font-medium truncate max-w-[100px]">
                      {transaction._id}
                    </td>
                    <td className="p-2 text-xs">{transaction.total_items}</td>
                    <td className="p-2 text-xs">
                      Rp {transaction.total_price.toLocaleString("id-ID")}
                    </td>
                    <td className="p-2 text-xs text-right">
                      <button
                        onClick={() => navigate(`/history/${transaction._id}`)}
                        className="inline-flex items-center justify-center cursor-pointer p-1.5 rounded-full hover:bg-gray-100"
                        title="View details"
                      >
                        <EyeIcon className="size-3 text-primary-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-2 text-xs text-center text-gray-500"
                  >
                    No transactions available
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

export default HistoryTransaction;
