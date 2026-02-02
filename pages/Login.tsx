
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'admin123') {
      loginAdmin();
      navigate('/admin');
      window.location.reload();
    } else {
      setError('ইউজারনেম বা পাসওয়ার্ড ভুল!');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gov-green text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">অ্যাডমিন প্যানেল</h2>
          <p className="text-sm text-slate-500 mt-1">লগইন করতে আপনার তথ্য দিন</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1">ইউজারনেম</label>
            <div className="relative">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                required 
                className="w-full border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-gov-green focus:outline-none transition"
                placeholder="admin"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="password" 
                required 
                className="w-full border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-gov-green focus:outline-none transition"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-gov-green text-white py-3 rounded-xl font-bold hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-gov-green/20">
            লগইন করুন
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Default Credentials</p>
          <div className="flex justify-center gap-4 mt-2 text-xs text-slate-500 font-mono">
            <span>user: admin</span>
            <span>pass: admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
