import { UserId } from "./User";

export const urlOfQuiz = (page?: number) => `/quiz/${(page || 0) + 1}`;
export const urlOfBadge = ({ network, badgeId }: UserId) =>
  `/badge/${network}/${badgeId}`;
