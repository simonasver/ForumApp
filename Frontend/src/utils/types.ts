export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  isEmailConfirmed: boolean;
  registerDate: string;
  lastEditDate: string;
  lastLoginDate: string;
  role: UserRole;
  profilePictureId: string;
  profilePictureUrl: string;
}

export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface Category {
  id: string;
  orderIndex: number;
  title: string;
  createdBy: User;
  createDate: string;
  lastEditDate: string;
}

export interface Comment {
  id: string;
  createdBy: User;
  createDate: string;
  lastEditDate: string;
  initialPost: boolean;
  topic: Topic;
}

export interface Topic {
  id: string;
  orderIndex: number;
  title: string;
  createdBy: User;
  createDate: string;
  lastEditDate: string;
  lastUpdateDate: string;
  category: Category;
  comments: Comment[];
}
