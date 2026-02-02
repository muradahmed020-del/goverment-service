
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCategories, getLinks, addSuggestion } from '../store';
import { Category, GovLink } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularLinks, setPopularLinks] = useState<GovLink[]>([]);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [suggestionData, setSuggestionData] = useState({ title: '', url: '' });

  useEffect(() => {
    setCategories(getCategories());
    setPopularLinks(getLinks().filter(l => l.isPopular && l.status === 'active').slice(0, 4));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSuggestion(suggestionData);
    alert('সাজেশন জমা দেওয়া হয়েছে। ধন্যবাদ!');
    setIsSuggestModalOpen(false);
    setSuggestionData({ title: '', url: '' });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400 text-xs gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <i key={star} className={`${star <= Math.round(rating) ? 'fas' : 'far'} fa-star`}></i>
        ))}
        <span className="text-slate-400 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gov-green text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <i className="fas fa-landmark text-[300px]"></i>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">এক ক্লিকে সকল সরকারি সেবা</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            আপনার প্রয়োজনীয় সরকারি ওয়েবসাইটটি সহজে খুঁজে পেতে সার্চ করুন অথবা নিচের ক্যাটাগরিগুলো ব্রাউজ করুন।
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              className="w-full px-6 py-4 rounded-full text-slate-900 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
              placeholder="সার্ভিস বা ওয়েবসাইটের নাম দিয়ে সার্চ করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bg-gov-red text-white p-3 rounded-full hover:scale-105 active:scale-95 transition flex items-center justify-center aspect-square"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="opacity-70">উদাহরণ:</span>
            <button onClick={() => navigate('/search?q=এনআইডি')} className="bg-white bg-opacity-10 px-3 py-1 rounded hover:bg-opacity-20 transition">এনআইডি</button>
            <button onClick={() => navigate('/search?q=পাসপোর্ট')} className="bg-white bg-opacity-10 px-3 py-1 rounded hover:bg-opacity-20 transition">পাসপোর্ট</button>
            <button onClick={() => navigate('/search?q=রেজাল্ট')} className="bg-white bg-opacity-10 px-3 py-1 rounded hover:bg-opacity-20 transition">রেজাল্ট</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">ক্যাটাগরি অনুযায়ী ব্রাউজ করুন</h3>
            <div className="w-16 h-1 bg-gov-green mt-2 rounded"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.slug}`}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:-translate-y-1 transition duration-300 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h4 className="font-bold text-slate-700">{cat.nameBn}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Links with Ratings */}
      <section id="popular" className="max-w-6xl mx-auto px-4">
         <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">জনপ্রিয় সরকারি পোর্টাল</h3>
            <div className="w-16 h-1 bg-gov-green mt-2 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularLinks.map((link) => (
            <div key={link.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-5 hover:border-gov-green transition group relative">
              {link.isBroken && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                  <i className="fas fa-exclamation-triangle"></i> Broken
                </div>
              )}
              <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center text-2xl text-gov-green">
                <i className="fas fa-link"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg text-slate-800 group-hover:text-gov-green transition">{link.titleBn}</h4>
                  <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Popular</span>
                </div>
                <div className="mb-2">{renderStars(link.ratingAvg)}</div>
                <p className="text-sm text-slate-500 mt-1 mb-4 line-clamp-2">{link.shortDescBn}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400"><i className="far fa-eye mr-1"></i> {link.viewCount.toLocaleString()} বার দেখা হয়েছে</span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gov-green hover:text-white transition">ভিজিট করুন <i className="fas fa-external-link-alt ml-1"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA and Suggestion Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gov-green/20 to-transparent"></div>
          <h3 className="text-3xl font-bold mb-4 relative z-10">কোন ওয়েবসাইটের লিংক পাননি?</h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">আপনার পরিচিত কোনো সরকারি লিংক আমাদের ডিরেক্টরিতে যোগ করার জন্য আমাদের সাজেস্ট করতে পারেন।</p>
          <button 
            onClick={() => setIsSuggestModalOpen(true)}
            className="bg-gov-green text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 hover:scale-105 active:scale-95 transition shadow-lg relative z-10"
          >
            নতুন লিংক সাজেস্ট করুন <i className="fas fa-plus-circle ml-2"></i>
          </button>
        </div>
      </section>

      {/* Suggestion Modal */}
      {isSuggestModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSuggestModalOpen(false)}></div>
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative z-10 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-slate-800">নতুন লিংক সাজেস্ট করুন</h3>
            <form onSubmit={handleSuggestionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">ওয়েবসাইটের নাম *</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gov-green focus:outline-none"
                  value={suggestionData.title}
                  onChange={(e) => setSuggestionData({...suggestionData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">ইউআরএল (URL) *</label>
                <input 
                  type="url" 
                  required 
                  className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gov-green focus:outline-none"
                  placeholder="https://..."
                  value={suggestionData.url}
                  onChange={(e) => setSuggestionData({...suggestionData, url: e.target.value})}
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsSuggestModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-600 font-bold">বাতিল</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-gov-green text-white rounded-lg hover:bg-opacity-90 transition font-bold shadow-lg shadow-gov-green/20">জমা দিন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
