import * as O from "fp-ts/Option";

export type UserId = {
  network: string;
  badgeId: number;
};
export type User = UserId & {
  firstName: string;
  profile?: string | null;
  linkedIn?: string | null;
  phone?: string | null;
  email?: string | null;
};
export type SelfUser = User;
