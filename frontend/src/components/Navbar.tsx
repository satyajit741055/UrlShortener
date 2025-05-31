import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link, NavLink } from "react-router-dom";
import { logout } from "@/features/reduxLogic/authReduxLogic/authSlice";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("logged out")
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            UrlShortener
          </Link>

          {/* Navigation Links */}
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

          {/* Auth Buttons */}
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
          </div>
        </div>

        {/* TODO: Add Mobile Navigation Hamburger here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;
