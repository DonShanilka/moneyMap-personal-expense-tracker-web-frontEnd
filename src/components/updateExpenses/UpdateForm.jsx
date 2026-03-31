import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateForm({ isOpen, closeModal, expense }) {
    const [id, setId] = useState("");
    const [category, setCategory] = useState("");
    const [itemName, setItemname] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (expense) {
            setId(expense.id || "");
            setCategory(expense.category || "");
            setItemname(expense.itemname || "");
            setPrice(expense.price || "");
            setDate(expense.date || "");
        }
    }, [expense]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!id || !category || !price || !date || !itemName) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await axios.put('http://localhost:3000/api/updateExpenses', {
                id: id,
                category: category,
                price: price,
                date: date,
                itemname: itemName,
            });
            closeModal();
        } catch (error) {
            console.error('Error updating expense:', error.response?.data?.error || error.message);
            alert("Update failed");
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
                        <div className="flex justify-end mt-6 space-x-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                            >
                                Update Expense
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default UpdateForm;
