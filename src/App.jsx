import React from 'react';
import { ExpenseProvider } from './contexts/ExpenseContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Dashboard />
      </div>
    </ExpenseProvider>
  );
}

export default App;