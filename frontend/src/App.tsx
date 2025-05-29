import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup'

function App() {
  console.log("App rendered"); 
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
  );
}

export default App
