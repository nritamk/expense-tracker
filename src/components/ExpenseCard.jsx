import React from 'react';

const ExpenseCard = ({ expense }) => {
  const { title, amount, paidBy, splitBetween } = expense;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 transform hover:scale-105 transition duration-200 ease-in-out">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Total Amount:</span> ₹{amount.toFixed(2)}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Paid by:</span> {paidBy}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Split between:</span> {splitBetween.join(', ')}
      </p>
    </div>
  );
};

export default ExpenseCard;