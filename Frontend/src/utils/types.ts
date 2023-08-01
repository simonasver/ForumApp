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
  User = "User",
  Admin = "Admin",
}
