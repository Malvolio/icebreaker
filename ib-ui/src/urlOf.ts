import { UserId } from "./User";

export const urlOfQuiz = (network: string, page?: number) =>
  `/quiz/${network}/${(page || 0) + 1}`;
export const urlOfBadge = ({ network, badgeId }: UserId, root = "") =>
  `${root}/badge/${network}/${badgeId}`;
