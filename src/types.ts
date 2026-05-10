export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  available: boolean;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}
