
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TransactionForm from "@/components/TransactionForm";
import TransactionList, { Transaction } from "@/components/TransactionList";
import DashboardSummary from "@/components/DashboardSummary";
import BudgetChart from "@/components/BudgetChart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  // Initialize with some sample data
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem("transactions");
    
    if (savedTransactions) {
      // Parse dates properly when loading from localStorage
      const parsed = JSON.parse(savedTransactions);
      return parsed.map((t: any) => ({
        ...t,
        date: new Date(t.date)
      }));
    }
    
    // Default sample data
    return [
      {
        id: uuidv4(),
        type: "income",
        amount: 2500,
        category: "Salary",
        date: new Date(2023, 9, 5),
        description: "Monthly salary"
      },
      {
        id: uuidv4(),
        type: "expense",
        amount: 800,
        category: "Housing",
        date: new Date(2023, 9, 2),
        description: "Rent payment"
      },
      {
        id: uuidv4(),
        type: "expense",
        amount: 120,
        category: "Utilities",
        date: new Date(2023, 9, 10),
        description: "Electricity bill"
      },
      {
        id: uuidv4(),
        type: "expense",
        amount: 250,
        category: "Food",
        date: new Date(2023, 9, 15),
        description: "Grocery shopping"
      },
      {
        id: uuidv4(),
        type: "expense",
        amount: 50,
        category: "Entertainment",
        date: new Date(2023, 9, 20),
        description: "Movie night"
      }
    ];
  });
  
  const { toast } = useToast();
  
  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  
  const handleAddTransaction = (transactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: uuidv4()
    };
    
    setTransactions((prev) => [newTransaction, ...prev]);
  };
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed successfully",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-4 md:px-6 py-12 mt-16 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Budget Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <DashboardSummary transactions={transactions} />
          </div>
          
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={handleAddTransaction} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <BudgetChart transactions={transactions} />
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <TransactionList 
              transactions={transactions} 
              onDelete={handleDeleteTransaction}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
