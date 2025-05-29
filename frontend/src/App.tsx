import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage';

function App() {
  console.log("App rendered"); 
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App
