import { SelfUser } from "../User";

export const useSubmitPin =
  () =>
  async (
    badgeId: number,
    network: string,
    pin: string
  ): Promise<SelfUser | undefined> =>
    Promise.resolve(
      pin === "1111"
        ? {
            network,
            badgeId,
            firstName: "Maya",
            profile: null,
            linkedIn: null,
            phone: null,
            email: null,
            takenQuiz: false,
          }
        : undefined
    );
