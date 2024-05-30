import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AllFlowers from './pages/AllFlowers';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FlowerDetailsPage from './pages/FlowerDetailsPage';
import NavLayout from './layouts/NavLayout';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/flowers" element={<AllFlowers />} />
        <Route path="/flowers/:id" element={<FlowerDetailsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/FAQ" element={<ContactUsPage />} />
        <Route path="/contact" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
