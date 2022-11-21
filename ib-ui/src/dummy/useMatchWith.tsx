import { User, SelfUser } from "../User";

type Match = {
  user: User;
  matchingAnswers: number[];
};
export const useMatchWith = (
  loggedInUser: SelfUser,
  badgeId: number
):
  | { loading: true; match: null; error: "" }
  | { loading: false; match: null; error: string }
  | { loading: false; match: Match; error: "" } => ({
  loading: false,
  error: "",
  match: {
    user: {
      network: "meet",
      badgeId: 133,
      firstName: "John",
      linkedIn: "https://www.linkedin.com/in/john-gefroh-a84455b6/",
      profile:
        "https://media-exp1.licdn.com/dms/image/C5103AQEHG-ckU2uJ3A/profile-displayphoto-shrink_200_200/0/1517066229750?e=1674086400&v=beta&t=JmcZJI4j9uVwvVLdtkBLVljXsEdk9MpbVzAdTKfMnnc",
      phone: "+14158675309",
    },
    matchingAnswers: [1, 2],
  },
});
