export interface CategoryCardProps {
  slug: string;
  name: string;
  titleKey: string;
  descriptionKey?: string;
  logo?: string;
  bkglogo?: string;
  isAdult?: boolean;
}

export interface Site {
  id: number;
  title: string;
  description: string;
  intDesc: string;
  url: string;
  logo: string;
  preview?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  titleKey: string;
  desc?: string;
  logo?: string;
  bkglogo?: string;
  isAdult?: boolean;
  sites: Site[];
  
}
