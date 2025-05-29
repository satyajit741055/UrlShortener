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
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            UrlShortener
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/homepage"
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium ${
                  isActive ? "underline underline-offset-4 decoration-2 text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium ${
                  isActive ? "underline underline-offset-4 decoration-2 text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <div><ToggleTheme /></div>
            {isAuthenticated ? (
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                Log Out
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile nav can be added later if you want */}
      </div>
    </nav>
  );
};

export default Navbar;
