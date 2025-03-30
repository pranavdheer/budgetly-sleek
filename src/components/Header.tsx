
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md fixed top-0 z-50">
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-bold text-xl tracking-tight">
          Budgetly
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link to="/dashboard">
            <Button size="sm" className="rounded-full">
              Try it Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
