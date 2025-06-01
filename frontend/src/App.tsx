import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from './app/store';
import RedirectPage from './pages/RedirectPage';
import DashBoardPage from './pages/DashBoardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { login, logout } from './features/reduxLogic/authReduxLogic/authSlice';
import { getUrls } from './utils/getUrls';
import { setUrls } from './features/reduxLogic/urlRedux/url.Slice';
import { toast } from 'sonner';


function App() {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login({ token, username: '' }));
      (async () => {
        try {
          const urls = await getUrls(token);
          dispatch(setUrls(urls));
        } catch (error: any) {
          console.error("Error during URL fetching", error);
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      })();
    } else {
      dispatch(logout());
    }
  }, []);


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
        <Route path="/analytics/:shortId" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}

export default App
