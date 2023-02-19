export type RegisterUser = {
  email: string;
  username: string;
  password: string;
  city: string;
  postalCode: number;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  isAvailable: boolean;
  category: any;
  againstCategory: any;
  user: any;
  slug: string;
};
