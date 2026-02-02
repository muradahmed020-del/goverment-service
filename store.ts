
import { GovLink, Category, UserSuggestion, ActivityLog, LinkRating } from './types';
import { INITIAL_CATEGORIES, INITIAL_LINKS } from './data';

const STORAGE_KEYS = {
  LINKS: 'gov_portal_links',
  CATEGORIES: 'gov_portal_categories',
  SUGGESTIONS: 'gov_portal_suggestions',
  ADMIN: 'gov_portal_admin',
  LOGS: 'gov_portal_logs',
  RATINGS: 'gov_portal_ratings'
};

export const getLinks = (): GovLink[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LINKS);
  return data ? JSON.parse(data) : INITIAL_LINKS;
};

export const saveLinks = (links: GovLink[]) => {
  localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
};

export const getCategories = (): Category[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : INITIAL_CATEGORIES;
};

export const saveCategories = (cats: Category[]) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cats));
};

export const getLogs = (): ActivityLog[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LOGS);
  return data ? JSON.parse(data) : [];
};

export const addLog = (action: string, details: string) => {
  const logs = getLogs();
  const newLog: ActivityLog = {
    id: Math.random().toString(36).substr(2, 9),
    adminName: 'Super Admin',
    action,
    timestamp: new Date().toISOString(),
    details
  };
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify([newLog, ...logs].slice(0, 100)));
};

export const getSuggestions = (): UserSuggestion[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SUGGESTIONS);
  return data ? JSON.parse(data) : [];
};

export const addSuggestion = (suggestion: Omit<UserSuggestion, 'id' | 'status' | 'createdAt'>) => {
  const suggestions = getSuggestions();
  const newSuggestion: UserSuggestion = {
    ...suggestion,
    id: Math.random().toString(36).substr(2, 9),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify([...suggestions, newSuggestion]));
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN) === 'true';
};

export const loginAdmin = () => localStorage.setItem(STORAGE_KEYS.ADMIN, 'true');
export const logoutAdmin = () => localStorage.removeItem(STORAGE_KEYS.ADMIN);

// --- New Features from Prompts ---

export const getRatings = (): LinkRating[] => {
  const data = localStorage.getItem(STORAGE_KEYS.RATINGS);
  return data ? JSON.parse(data) : [];
};

export const submitRating = (rating: Omit<LinkRating, 'id' | 'isApproved' | 'createdAt'>) => {
  const ratings = getRatings();
  const newRating: LinkRating = {
    ...rating,
    id: Math.random().toString(36).substr(2, 9),
    isApproved: false, // Moderation required
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify([...ratings, newRating]));
};

export const checkLinksStatus = () => {
  // Simulate a background job checking broken links
  const links = getLinks();
  const updated = links.map(l => {
    // Randomly mark 5% as broken for simulation
    const isBrokenNow = Math.random() < 0.05;
    return { ...l, isBroken: isBrokenNow, lastCheckedAt: new Date().toISOString() };
  });
  saveLinks(updated);
  addLog('Health Check', 'Simulated broken link check completed.');
  return updated;
};
