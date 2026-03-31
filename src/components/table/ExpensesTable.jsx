import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateForm from "../updateExpenses/UpdateForm";
import "../table/table.css";

function ExpensesTable({ refreshTrigger }) {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchExpenses = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.error("User email not found in localStorage");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/getExpensesByUser/${userEmail}`
      );
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/deleteExpenses/${id}`);
      fetchExpenses(); // Refresh after delete
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleRowClick = (item) => {
    setSelectedExpense(item);
    setIsModalOpen(true);
  };

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(expenses.length / rowsPerPage)) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-0 flex flex-col h-full w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {expenses.length > 0 ? (
              expenses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <tr key={item.id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.itemname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Rs: {item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleRowClick(item)}
                        className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-md hover:bg-teal-100 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UpdateForm
          isOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
            fetchExpenses();
          }}
          expense={selectedExpense}
        />
      )}

      {/* Pagination Controls */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">Rows:</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border-gray-300 rounded-md py-1 px-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {[5, 10, 15].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            {page + 1} / {Math.ceil(expenses.length / rowsPerPage) || 1}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(expenses.length / rowsPerPage) - 1}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpensesTable;
