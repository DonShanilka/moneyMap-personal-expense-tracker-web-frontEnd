import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateForm({ isOpen, closeModal, expense }) { // Receive the selected expense as a prop

    const id = expense.id; // Handle undefined gracefully
    const [category, setCategory] = useState("");
    const [itemName, setItemname] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");

    const handleUpdate = async (event) => {
        event.preventDefault();

        // Check if all required fields are filled in
        if (!id || !category || !price || !date || !itemName) {
            alert("Please fill in all fields.");
            return;
        }

        console.log(id, category, price, date, itemName);

        try {
            const response = await axios.put('http://localhost:3000/api/updateExpenses', {
                id: id,
                category: category,
                price: price,
                date: date,
                itemname: itemName,
            });

            console.log(response.data.message);
            closeModal(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating expense:', error.response?.data?.error || error.message);
        }
    };


    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-4">Update Expense</h2>
                    <form onSubmit={handleUpdate}>
                        <label className="block mb-4">
                            <span className="text-gray-700">Category</span>
                            <select
                                className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Foods">Foods</option>
                                <option value="Education">Education</option>
                                <option value="Transport">Transport</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Item name</span>
                            <input
                                type="text"
                                className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                                required
                                value={itemName}
                                onChange={(e) => setItemname(e.target.value)}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Price</span>
                            <input
                                type="number"
                                className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Date</span>
                            <input
                                type="date"
                                className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default UpdateForm;
