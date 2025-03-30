
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, DollarSign, PieChart, Wallet, Landmark, Target, PiggyBank } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    hero: true,
    features: false,
    testimonials: false,
  });

  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
    };
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col apple-gradient">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 flex flex-col items-center text-center min-h-[90vh] justify-center">
        <div 
          className={`max-w-4xl mx-auto space-y-6 transition-all duration-1000 ${
            isVisible.hero ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-budget-savings">
              Take Control
            </span> of Your Finances
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Budgetly helps you track expenses, manage budgets, and achieve your financial goals with a beautiful and intuitive interface.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full px-8">
                Get Started
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8"
              onClick={scrollToFeatures}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="mt-20 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full animate-bounce-subtle"
            onClick={scrollToFeatures}
            aria-label="Scroll down"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </section>
      
      {/* Features */}
      <section 
        id="features" 
        ref={featuresRef} 
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Budgetly?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your finances in one beautifully designed app.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-budget-income" />,
                title: "Track Your Expenses",
                description: "Easily record and categorize your spending to understand where your money goes.",
              },
              {
                icon: <PieChart className="h-8 w-8 text-budget-savings" />,
                title: "Visualize Your Budget",
                description: "Interactive charts and graphs that give you a clear picture of your financial health.",
              },
              {
                icon: <DollarSign className="h-8 w-8 text-budget-expense" />,
                title: "Manage Your Income",
                description: "Track multiple income sources and plan your budget more effectively.",
              },
              {
                icon: <Target className="h-8 w-8 text-primary" />,
                title: "Set Financial Goals",
                description: "Define savings goals and track your progress towards achieving them.",
              },
              {
                icon: <Landmark className="h-8 w-8 text-budget-debt" />,
                title: "Debt Management",
                description: "Track loans and debts with detailed repayment schedules and progress tracking.",
              },
              {
                icon: <PiggyBank className="h-8 w-8 text-budget-income" />,
                title: "Smart Insights",
                description: "Get personalized recommendations to optimize your spending and saving habits.",
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className={`budget-card bg-card ${
                  isVisible.features 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty: "all",
                  transitionDuration: "700ms" 
                }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* App Preview */}
      <section className="py-20 px-6 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Beautiful, Intuitive Interface</h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/40 bg-card">
            {/* App Preview Placeholder - replace with actual screenshot */}
            <div className="aspect-video bg-gradient-to-br from-card to-secondary flex items-center justify-center">
              <p className="text-muted-foreground">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section 
        id="testimonials"
        ref={testimonialsRef} 
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">What People Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Budgetly completely changed how I manage my finances. The interface is so intuitive and the insights are incredibly helpful.",
                author: "Alex Johnson",
                role: "Software Engineer",
              },
              {
                quote: "As someone who always struggled with budgeting, this app made it simple and even enjoyable. I've saved more in the last 3 months than the entire previous year.",
                author: "Sarah Williams",
                role: "Marketing Director",
              },
              {
                quote: "The debt tracking feature helped me create a realistic plan to pay off my student loans. The visualization really helps me stay motivated.",
                author: "Michael Chen",
                role: "Healthcare Professional",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`budget-card glass-card ${
                  isVisible.testimonials 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty: "all",
                  transitionDuration: "700ms" 
                }}
              >
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 px-6 bg-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have transformed their financial habits with Budgetly.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="rounded-full px-8">
              Start Budgeting Now
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
