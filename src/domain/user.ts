export interface UserWithAccount {
  hasAccount: true;
  id: number;
  name: string;
  keyword: string;
  hint: string;
  twitterId: string;
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

const isUser = (arg: unknown): arg is User => typeof arg === "object" && arg !== null && arg.hoge;
