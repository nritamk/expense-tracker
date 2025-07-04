import React, { createContext, useState, useContext, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    // Load expenses from localStorage on initial load
    try {
      const storedExpenses = localStorage.getItem('expenses');
      return storedExpenses ? JSON.parse(storedExpenses) : [];
    } catch (error) {
      console.error("Failed to parse expenses from localStorage:", error);
      return [];
    }
  });
  const [settlement, setSettlement] = useState({});

  useEffect(() => {
    // Save expenses to localStorage whenever they change
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error("Failed to save expenses to localStorage:", error);
    }
    calculateSettlement(expenses);
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, { ...expense, id: Date.now() }]);
  };

  const calculateSettlement = (currentExpenses) => {
    const balances = {}; // { person: balance }

    currentExpenses.forEach((expense) => {
      const { amount, paidBy, splitBetween } = expense;
      const amountPerPerson = amount / splitBetween.length;

      // Update balance for the person who paid
      balances[paidBy] = (balances[paidBy] || 0) + amount;

      // Update balances for people involved in the split
      splitBetween.forEach((person) => {
        balances[person] = (balances[person] || 0) - amountPerPerson;
      });
    });

    const debtors = [];
    const creditors = [];

    for (const person in balances) {
      if (balances[person] < 0) {
        debtors.push({ person, amount: Math.abs(balances[person]) });
      } else if (balances[person] > 0) {
        creditors.push({ person, amount: balances[person] });
      }
    }

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const newSettlement = [];

    while (debtors.length > 0 && creditors.length > 0) {
      const debtor = debtors[0];
      const creditor = creditors[0];

      const minAmount = Math.min(debtor.amount, creditor.amount);

      newSettlement.push({
        from: debtor.person,
        to: creditor.person,
        amount: minAmount,
      });

      debtor.amount -= minAmount;
      creditor.amount -= minAmount;

      if (debtor.amount === 0) {
        debtors.shift();
      }
      if (creditor.amount === 0) {
        creditors.shift();
      }
    }
    setSettlement(newSettlement);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, settlement, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  return useContext(ExpenseContext);
};