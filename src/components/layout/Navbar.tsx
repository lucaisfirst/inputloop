
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = user
    ? [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Task Board", href: "/task-board" },
        { title: "Projects", href: "/projects" },
        user.role === "admin" ? { title: "Admin", href: "/admin" } : null,
      ].filter(Boolean)
    : [
        { title: "Features", href: "/#features" },
        { title: "Pricing", href: "/#pricing" },
        { title: "About", href: "/#about" },
      ];

  const userNavItems = [
    { title: "Profile", href: "/profile" },
    { title: "Settings", href: "/settings" },
    { title: "Logout", onClick: logout },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300",
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-soft border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div
              className="bg-primary text-white h-8 w-8 rounded-lg flex items-center justify-center"
            >
              P
            </div>
            <span
              className="font-semibold text-lg"
            >
              PlanPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(
              (item) =>
                item && (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>

          {/* Authentication / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Notification Icon */}
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5 text-gray-600" />
                </Button>

                {/* User Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="gap-2 h-10">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden lg:inline-block">
                        {user.name || user.email.split("@")[0]}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium px-2 py-1.5">
                        {user.name || user.email.split("@")[0]}
                      </p>
                      <p className="text-xs text-gray-500 px-2">
                        {user.email}
                      </p>
                      <div className="h-px bg-gray-100 my-1"></div>
                      {userNavItems.map((item) => (
                        item.onClick ? (
                          <Button
                            key={item.title}
                            variant="ghost"
                            className="justify-start px-2 py-1.5 h-9 w-full text-sm"
                            onClick={item.onClick}
                          >
                            {item.title}
                          </Button>
                        ) : (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="text-sm px-2 py-1.5 hover:bg-gray-100 rounded-md block"
                          >
                            {item.title}
                          </Link>
                        )
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/login?signup=true">
                  <Button className="rounded-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden overflow-hidden"
        >
          <div className="container mx-auto px-6 py-4 bg-white">
            <div className="flex flex-col gap-2">
              {navItems.map(
                (item) =>
                  item && (
                    <Link
                      key={item.title}
                      to={item.href}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium",
                        location.pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}

              {user ? (
                <>
                  <div className="h-px bg-gray-100 my-2"></div>
                  {userNavItems.map((item) => (
                    item.onClick ? (
                      <Button
                        key={item.title}
                        variant="ghost"
                        className="justify-start px-4 py-3 h-auto"
                        onClick={item.onClick}
                      >
                        {item.title}
                      </Button>
                    ) : (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {item.title}
                      </Link>
                    )
                  ))}
                </>
              ) : (
                <>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/login?signup=true">
                    <Button className="w-full mt-2">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
