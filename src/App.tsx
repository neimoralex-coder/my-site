import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import PricingPage from './pages/PricingPage';
import AdminPage from './admin/AdminPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/sa8ps4sge702pl" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
