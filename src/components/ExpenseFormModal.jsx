import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';

const ExpenseFormModal = ({ isOpen, onClose }) => {
  const { addExpense } = useExpense();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [people, setPeople] = useState(''); // Comma-separated names
  const [paidBy, setPaidBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const splitBetween = people.split(',').map((p) => p.trim()).filter(Boolean);

    if (!title || !amount || !paidBy || splitBetween.length === 0) {
      alert('Please fill in all fields.');
      return;
    }

    addExpense({
      title,
      amount: parseFloat(amount),
      paidBy,
      splitBetween,
    });

    // Reset form
    setTitle('');
    setAmount('');
    setPeople('');
    setPaidBy('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Expense Title:
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="people" className="block text-gray-700 text-sm font-bold mb-2">
              People to Split (comma-separated):
            </label>
            <input
              type="text"
              id="people"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="e.g., Alice, Bob, Charlie"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="paidBy" className="block text-gray-700 text-sm font-bold mb-2">
              Who Paid:
            </label>
            <input
              type="text"
              id="paidBy"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Add Expense
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;