export interface RegisterUser {
  name: string;
  email: string;
  password: string;
};

export interface LoginUser {
  email: string;
  password: string;
};

export interface CreatePost {
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  drafted?: boolean;
};