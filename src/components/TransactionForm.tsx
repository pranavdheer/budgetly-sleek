
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export interface TransactionFormProps {
  onSubmit: (transaction: {
    type: string;
    amount: number;
    category: string;
    date: Date;
    description: string;
  }) => void;
}

const transactionCategories = {
  income: [
    "Salary",
    "Freelance",
    "Investments",
    "Gifts",
    "Other Income"
  ],
  expense: [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Shopping",
    "Personal Care",
    "Education",
    "Debt",
    "Savings",
    "Other Expenses"
  ]
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<string>("expense");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    });
    
    // Reset form
    setAmount("");
    setCategory("");
    setDescription("");
    
    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border/50 p-6 bg-card">
      <h3 className="text-lg font-medium">Add Transaction</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="type">Transaction Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {type === "income" ? (
                transactionCategories.income.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))
              ) : (
                transactionCategories.expense.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
