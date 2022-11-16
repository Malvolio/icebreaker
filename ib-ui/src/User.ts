import * as O from "fp-ts/Option";

export type UserId = {
  network: string;
  badgeId: string;
};
export type User = UserId & {
  firstName: string;
  profile?: string;
  linkedIn?: string;
  phone?: string;
};
export type SelfUser = User & {
  takenQuiz: boolean;
  answers?: O.Option<number>[];
};
