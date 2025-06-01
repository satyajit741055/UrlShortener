import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link, NavLink } from "react-router-dom";
import { logout } from "@/features/reduxLogic/authReduxLogic/authSlice";
import ToggleTheme from "./ToggleTheme";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icon for hamburger and close

const Navbar = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    console.log("logged out");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            UrlShortener
          </Link>

          
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/homepage"
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg transition-colors ${
                  isActive ? "underline underline-offset-4 decoration-2 text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg transition-colors ${
                  isActive ? "underline underline-offset-4 decoration-2 text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </div>

          
          <div className="flex items-center space-x-4">
            <ToggleTheme />
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:ring-red-500 transition"
              >
                Log Out
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Signup
                </Link>
              </>
            )}

           
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <NavLink
              to="/homepage"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold ${
                  isActive ? "underline text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold ${
                  isActive ? "underline text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
