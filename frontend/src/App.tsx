import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from './app/store';
import RedirectPage from './pages/RedirectPage';
import DashBoardPage from './pages/DashBoardPage';


function App() {
  console.log("App rendered");
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:shortId" element={<RedirectPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Route>
    </Routes>
  );
}

export default App
