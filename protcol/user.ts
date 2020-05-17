export interface User {
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
