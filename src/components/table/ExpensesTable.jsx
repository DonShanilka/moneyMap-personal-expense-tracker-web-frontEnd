import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateForm from "../updateExpenses/UpdateForm";
import "../table/table.css";

function ExpensesTable() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userEmail, setuserEmail] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      console.log(userEmail);
      try {
        // Retrieve userEmail from localStorage
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          console.error("User email not found in localStorage");
          return;
        }

        // Make a GET request with userEmail as a parameter
        const response = await axios.get(
          `http://localhost:3000/api/getExpensesByUser/${userEmail}`
        );
        setExpenses(response.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deleteExpenses/${id}`);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
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
    <div className="p-4 w-11/12 h-96 absolute top-32 left-8">
      <div className="overflow-auto bg-white shadow-md rounded-lg h-96">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-gray-700 font-semibold">
                Category
              </th>
              <th className="px-6 py-3 text-gray-700 font-semibold">
                Item Name
              </th>
              <th className="px-6 py-3 text-gray-700 font-semibold">Price</th>
              <th className="px-6 py-3 text-gray-700 font-semibold">Date</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.itemname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleRowClick(item)}
                      className="bg-teal-600 text-white px-3 py-1 rounded mr-2 hover:bg-teal-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UpdateForm
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          expense={selectedExpense}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border rounded-md p-1"
          >
            {[5, 10, 15].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="px-3 py-1 bg-gray-200 rounded-md text-gray-500 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {Math.ceil(expenses.length / rowsPerPage)}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(expenses.length / rowsPerPage) - 1}
            className="px-3 py-1 bg-gray-200 rounded-md text-gray-500 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpensesTable;
