
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import CategoryView from './pages/CategoryView';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { isAdminLoggedIn, logoutAdmin } from './store';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedIn = isAdminLoggedIn();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-gov-green text-white sticky top-0 z-50 shadow-lg">
      <div className="max-container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white rounded-full p-1">
             <div className="bg-gov-red w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">BD</div>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none">সরকারি সেবা ডিরেক্টরি</h1>
            <p className="text-[10px] opacity-80 uppercase tracking-tighter">Government Portal Directory</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">প্রচ্ছদ</Link>
          <Link to="/#categories" className="hover:text-yellow-400 transition">ক্যাটাগরি</Link>
          <Link to="/#popular" className="hover:text-yellow-400 transition">জনপ্রিয়</Link>
          {loggedIn ? (
            <>
              <Link to="/admin" className="bg-white text-gov-green px-4 py-1.5 rounded-full text-sm hover:bg-gray-100 transition font-bold">অ্যাডমিন প্যানেল</Link>
              <button onClick={handleLogout} className="text-red-300 hover:text-white transition text-sm">লগআউট</button>
            </>
          ) : (
            <Link to="/login" className="text-sm opacity-80 hover:opacity-100">অ্যাডমিন লগইন</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#005a42] px-4 pb-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>প্রচ্ছদ</Link>
          <Link to="/#categories" onClick={() => setIsMenuOpen(false)}>ক্যাটাগরি</Link>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)}>অ্যাডমিন প্যানেল</Link>
          {!loggedIn && <Link to="/login" onClick={() => setIsMenuOpen(false)}>লগইন</Link>}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-12 pb-6 mt-12">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1">
        <h3 className="text-lg font-bold mb-4">সরকারি সেবা ডিরেক্টরি</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          জনগণের দোরগোড়ায় সরকারি সেবাসমূহ পৌঁছে দিতে এবং ডিজিটাল বাংলাদেশ গড়ার লক্ষ্যে সকল সরকারি ওয়েবসাইটগুলোকে এক জায়গায় নিয়ে আসার এই ক্ষুদ্র প্রচেষ্টা।
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4">গুরুত্বপূর্ণ লিংক</h4>
        <ul className="text-sm text-slate-400 space-y-2">
          <li><Link to="/" className="hover:text-white transition">প্রচ্ছদ</Link></li>
          <li><Link to="/#categories" className="hover:text-white transition">ক্যাটাগরি</Link></li>
          <li><Link to="/admin" className="hover:text-white transition">অ্যাডমিন ড্যাশবোর্ড</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">যোগাযোগ</h4>
        <ul className="text-sm text-slate-400 space-y-2">
          <li><i className="fas fa-envelope mr-2"></i> info@govportal.com.bd</li>
          <li><i className="fas fa-phone mr-2"></i> +৮৮০ ১৮০০-০০০০০০</li>
          <li><i className="fas fa-map-marker-alt mr-2"></i> ঢাকা, বাংলাদেশ</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">নিউজলেটার</h4>
        <div className="flex">
          <input type="email" placeholder="ইমেইল দিন" className="bg-slate-800 border-none px-4 py-2 text-sm rounded-l focus:ring-1 focus:ring-gov-green w-full" />
          <button className="bg-gov-green px-4 py-2 rounded-r hover:bg-opacity-90 transition text-sm">সাবস্ক্রাইব</button>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-xs text-slate-500">© ২০২৫ সরকারি সেবা ডিরেক্টরি। সর্বস্বত্ব সংরক্ষিত।</p>
      <div className="flex gap-4 text-slate-400">
        <a href="#" className="hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-white transition"><i className="fab fa-youtube"></i></a>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/category/:slug" element={<CategoryView />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
