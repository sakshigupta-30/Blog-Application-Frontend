export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: User;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}