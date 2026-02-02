
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getLinks, getCategories } from '../store';
import { GovLink, Category } from '../types';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<GovLink[]>([]);
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    const allLinks = getLinks().filter(l => l.status === 'active');
    setCats(getCategories());
    
    if (query) {
      const filtered = allLinks.filter(l => 
        l.titleBn.toLowerCase().includes(query.toLowerCase()) ||
        l.titleEn.toLowerCase().includes(query.toLowerCase()) ||
        l.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        l.shortDescBn.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(allLinks);
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">সার্চ রেজাল্ট: "{query}"</h2>
          <p className="text-slate-500 mt-1">{results.length} টি লিংক পাওয়া গেছে</p>
        </div>
        <Link to="/" className="bg-slate-100 text-slate-600 px-6 py-2 rounded-full font-bold hover:bg-slate-200 transition">
          <i className="fas fa-arrow-left mr-2"></i> পুনরায় সার্চ করুন
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map(link => (
            <div key={link.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col h-full group">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-slate-50 text-gov-green px-3 py-1 rounded-lg text-xs font-bold border border-slate-100">
                  {cats.find(c => c.id === link.categoryId)?.nameBn}
                </span>
                {link.isPopular && <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
              </div>
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-gov-green transition line-clamp-2 h-12">{link.titleBn}</h4>
              <p className="text-sm text-slate-500 mb-6 flex-grow line-clamp-3">{link.shortDescBn}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="text-xs text-slate-400"><i className="far fa-eye mr-1"></i> {link.viewCount}</span>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="bg-gov-green text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-opacity-90 transition">
                  ভিজিট করুন <i className="fas fa-external-link-alt ml-1"></i>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 text-4xl">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-700">দুঃখিত, কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-slate-500 mt-2">অন্য কোনো কি-ওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন অথবা ক্যাটাগরি ব্রাউজ করুন।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
