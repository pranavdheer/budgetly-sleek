
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/components/TransactionList";

interface BudgetChartProps {
  transactions: Transaction[];
}

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ["#4ECDC4", "#FF6B6B", "#FFB740", "#7A77FF", "#A3A1FF", "#52D1DC", "#FF8E8E"];

const BudgetChart: React.FC<BudgetChartProps> = ({ transactions }) => {
  // Group expenses by category for the pie chart
  const expenseData: ChartData[] = [];
  const expensesByCategory: Record<string, number> = {};
  
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });
  
  Object.entries(expensesByCategory).forEach(([category, amount]) => {
    expenseData.push({
      name: category,
      value: amount,
    });
  });
  
  // Sort data by value in descending order
  expenseData.sort((a, b) => b.value - a.value);
  
  const totalExpenses = expenseData.reduce((total, item) => total + item.value, 0);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
      
      return (
        <div className="bg-card p-3 rounded-lg border shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p>${data.value.toFixed(2)}</p>
          <p className="text-muted-foreground text-sm">{percentage}% of total</p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>
          Where your money is going
        </CardDescription>
      </CardHeader>
      <CardContent>
        {expenseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No expense data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetChart;
