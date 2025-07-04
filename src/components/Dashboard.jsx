import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import ExpenseCard from './ExpenseCard';
import ExpenseFormModal from './ExpenseFormModal';

const Dashboard = () => {
  const { expenses, settlement } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Expense Tracker</h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add New Expense
        </button>
      </div>

      <ExpenseFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {expenses.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No expenses added yet. Click "Add New Expense" to get started!</p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-8 text-center">Your Expenses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-10 text-center">Settlement Details</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-md p-6">
            {settlement.length === 0 ? (
              <p className="text-center text-gray-700">All balances are settled.</p>
            ) : (
              <ul className="space-y-3">
                {settlement.map((s, index) => (
                  <li key={index} className="bg-blue-100 p-3 rounded-md flex justify-between items-center text-lg text-gray-800">
                    <span className="font-medium">{s.from}</span>
                    <span className="text-gray-600">owes</span>
                    <span className="font-bold text-blue-700">₹{s.amount.toFixed(2)}</span>
                    <span className="text-gray-600">to</span>
                    <span className="font-medium">{s.to}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;