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

export type UpdateUser = {
  username: string;
  city: string;
  postalCode: number;
};

export type UserType = {
  id: number;
  username: string;
  createdAt: string;
  email: string;
  city: string;
  postalCode: number;
};
