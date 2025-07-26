import { useState, useEffect } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useAccount } from "../context/account";
import apiClient from "../services/api";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const { accountId, setAccountId } = useAccount();
  // tracks backend account registration for current signed-in user via accountId from context

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // call backend register endpoint exactly once for the current signed-in user
  useEffect(() => {
    const register = async () => {
      if (!isSignedIn || accountId) return;
      try {
        const token = await getToken();
        console.log("token", token);
        if (!token) return;
        const username = user?.id;
        console.log("user", user);
        const email = user?.emailAddresses[0]?.emailAddress || "";
        const { data } = await apiClient.post(
          "/accounts/register",
          { username, email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data && data.user && data.user.id) {
          setAccountId(data.user.id);
        }
      } catch (err) {
        // swallow
      }
    };
    register();
  }, [isSignedIn, getToken, user, accountId, setAccountId]);

  // clear stored backend accountId when user signs out so new users register properly
  useEffect(() => {
    if (!isSignedIn && accountId) {
      setAccountId(null);
    }
  }, [isSignedIn, accountId, setAccountId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <Sparkles className="h-8 w-8 text-gray-300 group-hover:text-white transition-colors" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
                Berkeley World
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </button>

            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign Up</Button>
                </SignUpButton>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-300 hover:text-white transition-colors px-4 py-2 text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-300 hover:text-white transition-colors px-4 py-2 text-left"
              >
                FAQ
              </button>

              {isSignedIn ? (
                <div className="flex items-center justify-center px-4 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="w-full">
                      Log In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
