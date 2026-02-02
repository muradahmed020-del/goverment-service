
import { Category, GovLink } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', nameBn: 'শিক্ষা', nameEn: 'Education', slug: 'education', icon: '🎓', displayOrder: 1 },
  { id: '2', nameBn: 'স্বাস্থ্য', nameEn: 'Health', slug: 'health', icon: '🏥', displayOrder: 2 },
  { id: '3', nameBn: 'যোগাযোগ', nameEn: 'Transport', slug: 'transport', icon: '🚗', displayOrder: 3 },
  { id: '4', nameBn: 'আইন ও বিচার', nameEn: 'Law', slug: 'law', icon: '⚖️', displayOrder: 4 },
  { id: '5', nameBn: 'কর্মসংস্থান', nameEn: 'Employment', slug: 'employment', icon: '💼', displayOrder: 5 },
  { id: '6', nameBn: 'কর ও রাজস্ব', nameEn: 'Tax', slug: 'tax', icon: '💰', displayOrder: 6 },
  { id: '7', nameBn: 'কৃষি', nameEn: 'Agriculture', slug: 'agriculture', icon: '🌾', displayOrder: 7 },
  { id: '8', nameBn: 'সমাজকল্যাণ', nameEn: 'Social', slug: 'social', icon: '👶', displayOrder: 8 },
];

const now = new Date().toISOString();

export const INITIAL_LINKS: GovLink[] = [
  // --- Category 1: Education ---
  {
    id: 'edu-1',
    titleBn: 'বাংলাদেশ শিক্ষা বোর্ড',
    titleEn: 'Education Board Bangladesh',
    url: 'http://www.educationboard.gov.bd',
    shortDescBn: 'এসএসসি, এইচএসসি পরীক্ষার ফলাফল ও তথ্য অনুসন্ধান কেন্দ্র।',
    categoryId: '1',
    tags: ['result', 'board', 'education'],
    isFeatured: true,
    isPopular: true,
    viewCount: 15400,
    ratingAvg: 4.8,
    ratingCount: 120,
    status: 'active',
    isBroken: false,
    lastCheckedAt: now,
    updatedAt: now
  },
  {
    id: 'edu-2',
    titleBn: 'বিশ্ববিদ্যালয় মঞ্জুরি কমিশন',
    titleEn: 'University Grants Commission',
    url: 'http://www.ugc.gov.bd',
    shortDescBn: 'উচ্চশিক্ষার মানোন্নয়ন ও পাবলিক বিশ্ববিদ্যালয় সমূহের নিয়ন্ত্রক সংস্থা।',
    categoryId: '1',
    tags: ['university', 'ugc', 'higher education'],
    isFeatured: false,
    isPopular: false,
    viewCount: 5200,
    ratingAvg: 4.2,
    ratingCount: 45,
    status: 'active',
    isBroken: false,
    lastCheckedAt: now,
    updatedAt: now
  },
  {
    id: 'edu-4',
    titleBn: 'প্রাথমিক শিক্ষা অধিদপ্তর',
    titleEn: 'DPE',
    url: 'http://www.dpe.gov.bd',
    shortDescBn: 'প্রাথমিক শিক্ষার মান উন্নয়ন ও ব্যবস্থাপনার জন্য দায়বদ্ধ সংস্থা।',
    categoryId: '1',
    tags: ['primary', 'dpe', 'scholarship'],
    isFeatured: false,
    isPopular: true,
    viewCount: 12400,
    ratingAvg: 4.5,
    ratingCount: 88,
    status: 'active',
    isBroken: false,
    lastCheckedAt: now,
    updatedAt: now
  },
  // --- Category 8: Social ---
  {
    id: 's-1',
    titleBn: 'জন্ম ও মৃত্যু নিবন্ধন',
    titleEn: 'Birth & Death Registration',
    url: 'https://bdris.gov.bd',
    shortDescBn: 'অনলাইনে জন্ম ও মৃত্যু নিবন্ধন আবেদন এবং যাচাই করার পোর্টাল।',
    categoryId: '8',
    tags: ['birth', 'registration', 'citizen'],
    isFeatured: true,
    isPopular: true,
    viewCount: 45000,
    ratingAvg: 4.1,
    ratingCount: 560,
    status: 'active',
    isBroken: false,
    lastCheckedAt: now,
    updatedAt: now
  },
  {
    id: 's-2',
    titleBn: 'জাতীয় পরিচয়পত্র সেবা',
    titleEn: 'National ID Services',
    url: 'https://services.nidw.gov.bd',
    shortDescBn: 'স্মার্ট কার্ড এবং এনআইডি সংক্রান্ত অনলাইন সেবাসমূহ।',
    categoryId: '8',
    tags: ['nid', 'voter', 'identity'],
    isFeatured: true,
    isPopular: true,
    viewCount: 62000,
    ratingAvg: 3.9,
    ratingCount: 1200,
    status: 'active',
    isBroken: false,
    lastCheckedAt: now,
    updatedAt: now
  }
];
