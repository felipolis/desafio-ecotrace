
export type IUpdateInfo = {
  email?: string;
  password?: string;
  username?: string;
  avatarUrl?: string;
};

export type IUser = {
  id: number;
  name?: string;
  avatarUrl?: string;
  username: string;
  following: number;
  followers: number;
  repositories: number;
  bio?: string;
  email: string;
  twitter?: string;
  companyName?: string;
  site?: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
};