

export type IUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  twitter: string;
  companyName: string;
  site: string;
};

export type IGithubUser = {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  twitter_username: string;
  company: string;
  blog: string;
  public_repos: number;
  email: string;
};

export type IRepository = {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
  updated_at: Date;
}

export type ISearch = {
  id: number;
  username: string;
  repositories: number;
  status: boolean;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
};