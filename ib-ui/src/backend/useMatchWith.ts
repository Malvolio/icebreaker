import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as N from "fp-ts/number";

import { useEffect, useMemo, useState } from "react";
import { User, SelfUser } from "../User";
import { useMatchMutation } from "./generated/graphql";
import useQuizStore, { processAnswers } from "./useQuizStore";
import { useTryError } from "../ErrorDetection";

type Match = {
  user: User;
  matchingAnswers: number[];
};

const NE = O.getEq(N.Eq);
const matchAnswers = (a1: O.Option<number>[], a2: O.Option<number>[]) =>
  pipe(
    a1,
    A.zip(a2),
    A.mapWithIndex((n, [o1, o2]) =>
      O.isSome(o1) && NE.equals(o1, o2) ? O.some(n) : O.none
    ),
    A.filter(O.isSome),
    A.sequence(O.Applicative),
    O.getOrElse((): number[] => [])
  );

export const useMatchWith = (
  loggedInUser: SelfUser,
  badgeId: number
): { loading: boolean; match: Match | null; error: string } => {
  const { answers } = useQuizStore(loggedInUser.network);
  const [doMatch] = useMatchMutation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [theirAnswers, setTheirAnswers] = useState<O.Option<number>[]>([]);
  const tryError = useTryError();

  const [error, setError] = useState("");

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      setUser(null);
      try {
        const { data } = await tryError(() =>
          doMatch({
            variables: {
              network: loggedInUser.network,
              me: loggedInUser.badgeId,
              badgeId,
            },
          })
        );
        const user = data?.match?.user;
        if (user) {
          setUser(user);
          setTheirAnswers(processAnswers(data?.match?.answers));
        } else {
          setError;
        }
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    };
    go();
  }, []);
  const match = useMemo(
    () =>
      user && { user, matchingAnswers: matchAnswers(answers, theirAnswers) },
    [user, answers, theirAnswers]
  );
  return {
    loading,
    error,
    match,
  };
};
