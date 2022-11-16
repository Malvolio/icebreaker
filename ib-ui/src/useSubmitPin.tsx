import { SelfUser } from "./User";

export const useSubmitPin =
  () =>
  async (
    badgeId: string,
    network: string,
    pin: string
  ): Promise<SelfUser | undefined> =>
    Promise.resolve(
      pin === "1111"
        ? { network, badgeId, firstName: "Maya", takenQuiz: false }
        : undefined
    );
