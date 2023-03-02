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

export type UserType = {
  id: number;
  username: string;
  createdAt: string;
  email: string;
  city: string;
  postalCode: number;
};
