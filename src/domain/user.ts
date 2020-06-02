import { Validator, isObj, isStringMaxLen, isNatural, TypeValidator } from "./validate";

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
export type UserInfoNeeded = Omit<UserWithAccount, "hasAccount" | "id" | "createdAt">;

export interface UserWithoutAccount {
  hasAccount: false;
  name: string;
  slackId: string;
  picture: string;
}

export type User = UserWithoutAccount | UserWithAccount;

export type UserValidator = { [P in keyof Partial<UserWithAccount>]: (arg: unknown) => arg is UserWithAccount[P] };

export const userPropValidators: { [P in keyof Partial<UserWithAccount>]: Validator<UserWithAccount[P]> } = {
  // hasAccount: isBoolean,
  id: isNatural,
  name: isStringMaxLen(20),
  keyword: isStringMaxLen(20),
  hint: isStringMaxLen(100),
  twitterId: isStringMaxLen(100),

  generation: isNatural,
  content: isStringMaxLen(400),
  slackId: isStringMaxLen(100),
  picture: isStringMaxLen(200),

  // createdAt: (arg: unknown) => (arg instanceof Date ? { valid: true } : { valid: false, errorType: "not_date" }),
};

export const userValidator = new TypeValidator(isObj(userPropValidators));
