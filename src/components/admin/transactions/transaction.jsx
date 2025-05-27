import { useEffect, useState } from "react";
import { Ellipsis, Eye, Printer, Trash2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transactionMockData } from "../../../lib/mockdata";
import { client } from "../../../lib/axios-instance";
import Button from "../../ui/button";
import { jsPDF } from "jspdf";

const Transaction = () => {
  document.title = "Daftar Transaksi | Admin";

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
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
        setActiveDropdown(null);
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Gagal menghapus transaksi");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const generateTransactionsReport = () => {
    if (!transactions || transactions.length === 0) {
      alert("Tidak ada data transaksi untuk dibuat laporannya");
      return;
    }

    const doc = new jsPDF();

    doc.setProperties({
      title: "Laporan Daftar Transaksi",
      subject: "Laporan Transaksi",
      author: "KasirKita",
      keywords: "laporan, transaksi",
      creator: "KasirKita System",
    });

    const primaryColor = [45, 55, 72];
    const subtleGray = [240, 240, 240];
    const textColor = [75, 85, 99];
    const white = [255, 255, 255];

    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 20, "F");

    doc.setTextColor(...white);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("KasirKita", 14, 13);

    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.text("Laporan Daftar Transaksi", 14, 30);
    doc.setFontSize(9);
    doc.text(
      `Tanggal cetak: ${new Date().toLocaleDateString("id-ID")}`,
      14,
      36
    );

    doc.setDrawColor(...subtleGray);
    doc.setLineWidth(0.5);
    doc.line(14, 42, 196, 42);

    const tableY = 50;
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(14, tableY, 196, tableY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text("ID TRANSAKSI", 14, tableY - 4);
    doc.text("PELANGGAN", 65, tableY - 4);
    doc.text("TANGGAL", 110, tableY - 4);
    doc.text("JML ITEM", 150, tableY - 4);
    doc.text("TOTAL", 196, tableY - 4, { align: "right" });

    let rowY = tableY + 10;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);

    doc.setDrawColor(...subtleGray);
    doc.setLineWidth(0.5);

    const itemsPerPage = 35;

    transactions.forEach((transaction, index) => {
      if (index > 0 && index % itemsPerPage === 0) {
        doc.addPage();

        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 20, "F");

        doc.setTextColor(...white);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("KasirKita", 14, 13);

        rowY = 40;

        doc.setDrawColor(...primaryColor);
        doc.line(14, rowY, 196, rowY);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...primaryColor);
        doc.text("ID TRANSAKSI", 14, rowY - 4);
        doc.text("PELANGGAN", 65, rowY - 4);
        doc.text("TANGGAL", 110, rowY - 4);
        doc.text("JML ITEM", 150, rowY - 4);
        doc.text("TOTAL", 196, rowY - 4, { align: "right" });

        rowY += 10;
      }

      const shortId = transaction._id.substring(0, 8) + "...";

      const customerName =
        transaction.customer.username.length > 20
          ? transaction.customer.username.substring(0, 17) + "..."
          : transaction.customer.username;

      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.text(shortId, 14, rowY);
      doc.text(customerName, 65, rowY);

      const txDate = formatDate(transaction.createdAt);
      doc.text(txDate, 110, rowY);

      doc.text(`${transaction.total_items}`, 150, rowY);
      doc.text(
        `Rp ${transaction.total_price.toLocaleString("id-ID")}`,
        196,
        rowY,
        {
          align: "right",
        }
      );

      rowY += 6;
      doc.line(14, rowY, 196, rowY);
      rowY += 6;
    });

    doc.setDrawColor(...subtleGray);
    doc.setLineWidth(0.5);
    doc.line(14, 275, 196, 275);

    doc.setTextColor(120, 120, 120);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    doc.save(`laporan-transaksi-${new Date().toISOString().split("T")[0]}.pdf`);
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
      <header className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-5 gap-4">
        <h1 className="text-xl sm:text-2xl font-medium text-primary-950">
          Daftar Transaksi
        </h1>
        <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-3">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <input
              type="text"
              placeholder="Cari transaksi"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:max-w-[200px] border text-sm border-gray-300 rounded-lg px-4 py-2"
            />
            <Button type="submit" className={"!w-fit"}>
              Cari
            </Button>
          </form>
          <Button
            type="button"
            onClick={generateTransactionsReport}
            className="flex w-full sm:w-auto items-center justify-center gap-2"
          >
            <Printer className="size-4" />
            Buat Laporan
          </Button>
        </div>
      </header>
      <div className="bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
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
                  <td className="p-3 text-sm font-medium max-w-[150px] truncate">
                    {transaction._id}
                  </td>
                  <td className="p-3 text-sm font-medium">
                    {transaction.customer.username}
                  </td>
                  <td className="p-3 text-sm">{transaction.total_items}</td>
                  <td className="p-3 text-sm">
                    Rp {transaction.total_price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-sm text-right relative">
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
