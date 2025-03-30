
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, CreditCard, Wallet, PiggyBank } from "lucide-react";
import { Transaction } from "@/components/TransactionList";

interface DashboardSummaryProps {
  transactions: Transaction[];
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Group expenses by category
  const expensesByCategory: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });
  
  // Find the highest expense category
  let highestExpenseCategory = "";
  let highestExpenseAmount = 0;
  
  Object.entries(expensesByCategory).forEach(([category, amount]) => {
    if (amount > highestExpenseAmount) {
      highestExpenseCategory = category;
      highestExpenseAmount = amount;
    }
  });
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Financial Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Income</CardDescription>
            <CardTitle className="text-2xl flex items-center text-budget-income">
              <ArrowUpRight className="mr-2 h-5 w-5" />
              ${totalIncome.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Wallet className="mr-1 h-4 w-4" />
              All income sources
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="text-2xl flex items-center text-budget-expense">
              <ArrowDownRight className="mr-2 h-5 w-5" />
              ${totalExpenses.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <CreditCard className="mr-1 h-4 w-4" />
              {highestExpenseCategory ? (
                <>Highest: {highestExpenseCategory} (${highestExpenseAmount.toFixed(2)})</>
              ) : (
                <>No expense data</>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Balance</CardDescription>
            <CardTitle 
              className={`text-2xl flex items-center ${
                balance >= 0 ? "text-budget-income" : "text-budget-expense"
              }`}
            >
              <PiggyBank className="mr-2 h-5 w-5" />
              ${balance.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {balance >= 0 ? (
                <>Saving ${balance.toFixed(2)} this period</>
              ) : (
                <>Overspent by ${Math.abs(balance).toFixed(2)}</>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSummary;
