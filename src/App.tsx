import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AllFlowers from './pages/AllFlowers';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavLayout from './layouts/NavLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/flowers" element={<AllFlowers />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
