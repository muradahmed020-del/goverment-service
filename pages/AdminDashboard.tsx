
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getLinks, 
  saveLinks, 
  getCategories, 
  getSuggestions, 
  isAdminLoggedIn, 
  getLogs, 
  addLog, 
  checkLinksStatus,
  getRatings
} from '../store';
import { GovLink, Category, UserSuggestion, ActivityLog, LinkRating } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'links' | 'categories' | 'suggestions' | 'logs' | 'ratings'>('links');
  const [links, setLinks] = useState<GovLink[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [ratings, setRatings] = useState<LinkRating[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<GovLink | null>(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/login');
      return;
    }
    setLinks(getLinks());
    setCats(getCategories());
    setSuggestions(getSuggestions());
    setLogs(getLogs());
    setRatings(getRatings());
  }, []);

  const handleDeleteLink = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই লিংকটি মুছে ফেলতে চান?')) {
      const updated = links.filter(l => l.id !== id);
      setLinks(updated);
      saveLinks(updated);
      addLog('Delete Link', `Deleted link with ID ${id}`);
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = links.map(l => l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' as any } : l);
    setLinks(updated);
    saveLinks(updated);
    addLog('Update Status', `Toggled status for link ${id}`);
  };

  const handleHealthCheck = () => {
    const updated = checkLinksStatus();
    setLinks(updated);
    setLogs(getLogs());
    alert('লিংক হেলথ চেক সম্পন্ন হয়েছে!');
  };

  const handleSaveLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const linkData: Partial<GovLink> = {
      titleBn: formData.get('titleBn') as string,
      titleEn: formData.get('titleEn') as string,
      url: formData.get('url') as string,
      categoryId: formData.get('categoryId') as string,
      shortDescBn: formData.get('shortDescBn') as string,
      isFeatured: formData.get('isFeatured') === 'on',
      isPopular: formData.get('isPopular') === 'on',
      status: 'active',
      updatedAt: new Date().toISOString()
    };

    let updatedLinks;
    if (editingLink) {
      updatedLinks = links.map(l => l.id === editingLink.id ? { ...l, ...linkData } : l);
      addLog('Update Link', `Updated link: ${linkData.titleBn}`);
    } else {
      const newLink: GovLink = {
        ...linkData as GovLink,
        id: Math.random().toString(36).substr(2, 9),
        viewCount: 0,
        ratingAvg: 0,
        ratingCount: 0,
        isBroken: false,
        lastCheckedAt: new Date().toISOString(),
        tags: []
      };
      updatedLinks = [...links, newLink];
      addLog('Create Link', `Added new link: ${linkData.titleBn}`);
    }

    setLinks(updatedLinks);
    saveLinks(updatedLinks);
    setIsModalOpen(false);
    setEditingLink(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">অ্যাডমিন ড্যাশবোর্ড</h2>
          <p className="text-slate-500">পোর্টালের তথ্য এবং সেটিংস ম্যানেজ করুন</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={handleHealthCheck}
             className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition"
           >
             <i className="fas fa-heartbeat mr-2"></i> হেলথ চেক
           </button>
           <button 
             onClick={() => { setEditingLink(null); setIsModalOpen(true); }}
             className="bg-gov-green text-white px-6 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg shadow-gov-green/20"
           >
             <i className="fas fa-plus mr-2"></i> নতুন লিংক
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {[
          { id: 'links', label: 'লিংকসমূহ', icon: 'fa-link', count: links.length },
          { id: 'categories', label: 'ক্যাটাগরি', icon: 'fa-folder', count: cats.length },
          { id: 'suggestions', label: 'সাজেশন', icon: 'fa-lightbulb', count: suggestions.length },
          { id: 'ratings', label: 'রেটিং', icon: 'fa-star', count: ratings.length },
          { id: 'logs', label: 'অ্যাক্টিভিটি লগ', icon: 'fa-history', count: logs.length }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-bold transition flex items-center gap-2 ${activeTab === tab.id ? 'border-b-4 border-gov-green text-gov-green' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <i className={`fas ${tab.icon}`}></i> {tab.label} <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {activeTab === 'links' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">নাম ও ইউআরএল</th>
                  <th className="px-6 py-4">হেলথ</th>
                  <th className="px-6 py-4">ক্যাটাগরি</th>
                  <th className="px-6 py-4">রেটিং</th>
                  <th className="px-6 py-4">স্ট্যাটাস</th>
                  <th className="px-6 py-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {links.map(link => (
                  <tr key={link.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{link.titleBn}</p>
                      <p className="text-xs text-slate-400 truncate max-w-xs">{link.url}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${link.isBroken ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {link.isBroken ? 'Broken' : 'Alive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{cats.find(c => c.id === link.categoryId)?.nameBn}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-yellow-500 text-xs gap-1">
                        <i className="fas fa-star"></i> {link.ratingAvg.toFixed(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleToggleStatus(link.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${link.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
                      >
                        {link.status === 'active' ? 'সচল' : 'বন্ধ'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => { setEditingLink(link); setIsModalOpen(true); }} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDeleteLink(link.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="p-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">সময়</th>
                  <th className="px-6 py-4">অ্যাডমিন</th>
                  <th className="px-6 py-4">অ্যাকশন</th>
                  <th className="px-6 py-4">বিস্তারিত</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map(log => (
                  <tr key={log.id} className="text-sm">
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{log.adminName}</td>
                    <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{log.action}</span></td>
                    <td className="px-6 py-4 text-slate-500">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className="p-8 text-center text-slate-400">
            রেটিং মডারেশন শীঘ্রই যুক্ত করা হবে...
          </div>
        )}
        
        {/* Placeholder for other tabs */}
        {(activeTab === 'categories' || activeTab === 'suggestions') && (
          <div className="p-12 text-center text-slate-400 italic">
            এই বিভাগটি শীঘ্রই কার্যকর করা হবে।
          </div>
        )}
      </div>

      {/* Modal - Enhanced */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">{editingLink ? 'লিংক এডিট করুন' : 'নতুন লিংক যোগ করুন'}</h3>
            <form onSubmit={handleSaveLink} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">নাম (বাংলা) *</label>
                  <input name="titleBn" defaultValue={editingLink?.titleBn} required className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gov-green focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">নাম (ইংরেজি)</label>
                  <input name="titleEn" defaultValue={editingLink?.titleEn} className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gov-green focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">ইউআরএল (URL) *</label>
                <input name="url" type="url" defaultValue={editingLink?.url} required className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gov-green focus:outline-none" />
              </div>
              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-600 font-bold">বাতিল</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-gov-green text-white rounded-xl hover:bg-opacity-90 transition font-bold shadow-lg shadow-gov-green/20">সংরক্ষণ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
