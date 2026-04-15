export interface SiteItem {
  id: number;
  title: string;
  url: string;
  description: string;
  logo?: string;
  preview?: string;
  intDesc: string;
}

export interface CategoryItem {
  slug: string;
  name: string;
  description: string;
  desc: string;
  int: string;
  titleKey: string;
  logo?: string;
  bkglogo?: string;
  sites: SiteItem[];
  priority?: number;
}

export interface SitesData {
  categories: CategoryItem[];
}

