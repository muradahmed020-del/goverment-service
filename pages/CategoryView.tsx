
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLinks, getCategories } from '../store';
import { GovLink, Category } from '../types';

const CategoryView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [links, setLinks] = useState<GovLink[]>([]);

  useEffect(() => {
    const cats = getCategories();
    const cat = cats.find(c => c.slug === slug);
    if (cat) {
      setCategory(cat);
      const allLinks = getLinks();
      setLinks(allLinks.filter(l => l.categoryId === cat.id && l.status === 'active'));
    }
  }, [slug]);

  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">ক্যাটাগরি পাওয়া যায়নি</h2>
        <Link to="/" className="text-gov-green mt-4 block">প্রচ্ছদে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white shadow-sm border rounded-2xl flex items-center justify-center text-4xl">
            {category.icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">{category.nameBn} বিভাগ</h2>
            <p className="text-slate-500">মোট {links.length} টি সরকারি সেবা পাওয়া গেছে</p>
          </div>
        </div>
        <Link to="/" className="text-sm font-bold text-gov-green hover:underline">
          <i className="fas fa-arrow-left mr-1"></i> অন্য ক্যাটাগরি দেখুন
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map(link => (
          <div key={link.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col h-full group">
            <h4 className="font-bold text-slate-800 mb-3 group-hover:text-gov-green transition line-clamp-2 h-12">{link.titleBn}</h4>
            <p className="text-sm text-slate-500 mb-6 flex-grow line-clamp-3">{link.shortDescBn}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3">
                 <span className="text-xs text-slate-400"><i className="far fa-eye mr-1"></i> {link.viewCount.toLocaleString()}</span>
              </div>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="bg-gov-green text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-opacity-90 transition">
                ভিজিট করুন <i className="fas fa-external-link-alt ml-1"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {links.length === 0 && (
        <div className="py-20 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 text-3xl">
            <i className="fas fa-folder-open"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-700">এই ক্যাটাগরিতে কোনো লিংক নেই</h3>
          <p className="text-slate-500 mt-2">খুব শীঘ্রই এই বিভাগে নতুন লিংক যুক্ত করা হবে।</p>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
