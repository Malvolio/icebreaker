import { AnswerInput } from "./generated/graphql";
import { pipe } from "fp-ts/function";
import * as A from "fp-ts/lib/Array";
import * as R from "fp-ts/lib/Record";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { Pool } from "pg";
import { Generated, Kysely, Selectable, PostgresDialect } from "kysely";
import upsert from "./upsert";

interface AnswerTable {
  id: Generated<string>;
  network: string;
  badgeId: number;
  questionId: string;
  optionIndex: number;
}

interface UserTable {
  id: string;
  network: string;
  badgeId: number;
  firstName: string;
  pin: string;
  profile: string | null;
  linkedIn: string | null;
  phone: string | null;
  email: string | null;
}
interface MatchTable {
  id: Generated<string>;
  network: string;
  badgeId: number;
  otherBadgeId: number;
  score: number;
}

// Keys of this interface are table names.
interface Database {
  answers: AnswerTable;
  users: UserTable;
  matches: MatchTable;
}

// You'd create one of these when you start your app.
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE,
      maxUses: 10,
    }),
  }),
});

export const getAnswerQuery = (network: string, badgeId: number) =>
  db
    .selectFrom("answers")
    .select(["id", "network", "badgeId", "questionId", "optionIndex"])
    .where("network", "=", network)
    .where("badgeId", "=", badgeId);

export const getAnswers = (network: string, badgeId: number) =>
  getAnswerQuery(network, badgeId).execute();

const getAnswer = (network: string, badgeId: number, questionId: string) =>
  getAnswerQuery(network, badgeId)
    .where("questionId", "=", questionId)
    .executeTakeFirstOrThrow();

export const setAnswer = async (
  network: string,
  badgeId: number,
  answer: AnswerInput
) => {
  const update = db
    .updateTable("answers")
    .where("network", "=", network)
    .where("badgeId", "=", badgeId)
    .where("questionId", "=", answer.questionId)
    .set({ optionIndex: answer.optionIndex });

  const insert = db.insertInto("answers").values([
    {
      network,
      badgeId,
      questionId: answer.questionId,
      optionIndex: answer.optionIndex,
    },
  ]);

  await upsert(update, insert);
  return getAnswer(network, badgeId, answer.questionId);
};

const getUserQuery = (network: string) =>
  db
    .selectFrom("users")
    .select([
      "id",
      "network",
      "badgeId",
      "firstName",
      "profile",
      "linkedIn",
      "phone",
      "email",
    ])
    .where("network", "=", network);

const getUser = async (network: string, badgeId: number, pin?: string) => {
  const q = getUserQuery(network).where("badgeId", "=", badgeId);
  const qPin = pin ? q.where("pin", "=", pin) : q;
  return (await qPin.executeTakeFirst()) ?? null;
};

export const getUsers = async (network: string) =>
  getUserQuery(network).execute();

export const login = (network: string, badgeId: number, pin: string) =>
  getUser(network, badgeId, pin);

const calculateMatches = (a1: AnswerInput[], a2: AnswerInput[]) => {
  const other = pipe(
    a2,
    A.map(({ questionId, optionIndex }): [string, number] => [
      questionId,
      optionIndex,
    ]),
    R.fromEntries
  );
  const matches = pipe(
    a1,
    A.filter(({ questionId, optionIndex }) => other[questionId] === optionIndex)
  );

  return matches.length;
};

const recordMatch = (
  network: string,
  badgeId: number,
  otherBadgeId: number,
  score: number
) => {
  const update = db
    .updateTable("matches")
    .where("network", "=", network)
    .where("badgeId", "=", badgeId)
    .where("otherBadgeId", "=", otherBadgeId)
    .set({ score });
  const insert = db
    .insertInto("matches")
    .values({ network, badgeId, otherBadgeId, score });

  return upsert(update, insert);
};

export const makeMatch = async (
  network: string,
  badgeId: number,
  otherBadgeId: number
) => {
  const [user, myAnswers, answers] = await Promise.all([
    getUser(network, otherBadgeId),
    getAnswers(network, badgeId),
    getAnswers(network, otherBadgeId),
  ] as const);
  const score = calculateMatches(myAnswers, answers);
  await recordMatch(network, badgeId, otherBadgeId, score);
  return (
    user && {
      user,
      answers,
    }
  );
};

export const summarizeMatches = (network: string, badgeId: number) => {
  const { count, sum } = db.fn;
  return db
    .selectFrom("matches")
    .select([
      count<number>("score").as("matches"),
      sum<number>("score").as("score"),
    ])
    .where("network", "=", network)
    .where("badgeId", "=", badgeId)
    .executeTakeFirstOrThrow();
};

type UserModel = Selectable<UserTable>;
type Besty = { score: number; user: UserModel };

export const getBesties = async (
  network: string,
  badgeId: number
): Promise<Besty[]> => {
  const { max } = db.fn;
  return pipe(
    TE.tryCatch(
      () =>
        db
          .selectFrom([
            "users",
            "matches",
            (eb) =>
              eb
                .selectFrom("matches")
                .select([max("score").as("score")])
                .where("network", "=", network)
                .where("badgeId", "=", badgeId)
                .where("otherBadgeId", "!=", badgeId)
                .as("hiscore"),
          ])
          .selectAll("users")
          .select("matches.score as score")
          .where("users.network", "=", network)
          .where("matches.badgeId", "=", badgeId)
          .where("matches.otherBadgeId", "!=", badgeId)
          .whereRef("users.badgeId", "=", "matches.otherBadgeId")
          .whereRef("users.network", "=", "matches.network")
          .whereRef("hiscore.score", "=", "matches.score")
          .execute(),
      (e) => {
        console.error(e);
      }
    ),
    TE.map(
      A.map(({ score, ...user }: { score: number } & UserModel) => ({
        score,
        user,
      }))
    ),
    TE.getOrElse(() => T.of([] as Besty[]))
  )();
};
