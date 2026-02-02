
export type LinkStatus = 'active' | 'inactive' | 'draft';
export type UserRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  icon: string;
  parentId?: string; // Support for sub-categories
  displayOrder: number;
}

export interface LinkRating {
  id: string;
  linkId: string;
  rating: number; // 1-5
  reviewText: string;
  reviewerName: string;
  isApproved: boolean;
  createdAt: string;
}

export interface GovLink {
  id: string;
  titleBn: string;
  titleEn: string;
  url: string;
  shortDescBn: string;
  categoryId: string;
  tags: string[];
  isFeatured: boolean;
  isPopular: boolean;
  viewCount: number;
  ratingAvg: number;
  ratingCount: number;
  status: LinkStatus;
  isBroken: boolean;
  lastCheckedAt: string;
  updatedAt: string;
}

export interface UserSuggestion {
  id: string;
  title: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  submitterName?: string;
  submitterEmail?: string;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  action: string; // e.g., 'Update Link', 'Delete Category'
  timestamp: string;
  details: string;
}
