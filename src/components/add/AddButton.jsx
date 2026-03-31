import React, { useEffect, useState } from "react";
import "../add/Button.css";
import axios from "axios";
import AlertPopup from "../../common/alert/AlertPopup";

function AddButton({ onRefresh }) {
  const [isVisible, setIsVisible] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    price: "",
    date: "",
    itemname: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setuserEmail(email);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/saveData", {
        category: formData.category,
        price: formData.price,
        date: formData.date,
        itemname: formData.itemname,
        userEmail: userEmail,
      });
      
      if (onRefresh) onRefresh();
      toggleModal();
      setFormData({ category: "", price: "", date: "", itemname: "" }); 
    } catch (error) {
      console.error("Error during save:", error);
      alert("Save failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-lg 
                   shadow-md hover:bg-teal-700 hover:shadow-lg
                   transition duration-300 ease-in-out flex items-center"
      >
        <span className="mr-2 text-xl">+</span> Add Expense
      </button>

      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">New Expense</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700">Category</span>
                <select
                  className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                  required
                  onChange={(val) =>
                    setFormData({ ...formData, category: val.target.value })
                  }
                >
                  <option value="" disabled selected>
                    Select category
                  </option>
                  <option value="Foods">Foods</option>
                  <option value="Education">Education</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Item Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter amount"
                  required
                  onChange={(val) =>
                    setFormData({ ...formData, itemname: val.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Amount</span>
                <input
                  type="number"
                  className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter amount"
                  required
                  onChange={(val) =>
                    setFormData({ ...formData, price: val.target.value })
                  }
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Date</span>
                <input
                  type="date"
                  className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                  required
                  onChange={(val) =>
                    setFormData({ ...formData, date: val.target.value })
                  }
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition duration-300 ease-in-out"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="mt-4 ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddButton;
