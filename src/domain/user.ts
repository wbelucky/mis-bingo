export interface UserWithAccount {
  hasAccount: true;
  id: number;
  name: string;
  keyword: string;
  hint: string;
  twitterId: string;
  // TODO: hauntInfo
  generation: number;
  content: string;
  slackId: string;
  picture: string;

  createdAt: Date;
}

export interface UserWithoutAccount {
  hasAccount: false;
  name: string;
  slackId: string;
  picture: string;
}

export type User = UserWithoutAccount | UserWithAccount;
