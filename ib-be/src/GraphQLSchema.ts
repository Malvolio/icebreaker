import { gql } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  getAnswers,
  getUsers,
  login,
  makeMatch,
  setAnswer,
  getBesties,
  summarizeMatches,
} from "./db";
import { Resolvers } from "generated/graphql";

const typeDefs = gql`
  type Answer {
    id: ID!
    network: String!
    badgeId: Int!
    questionId: String!
    optionIndex: Int!
  }

  input AnswerInput {
    questionId: String!
    optionIndex: Int!
  }

  type User {
    id: ID!
    network: String!
    badgeId: Int!
    firstName: String!
    profile: String
    linkedIn: String
    phone: String
    email: String
  }

  type Match {
    user: User!
    answers: [Answer!]!
  }

  type Mutation {
    match(network: String!, me: Int!, badgeId: Int!): Match
    setAnswer(network: String!, badgeId: Int!, answer: AnswerInput!): Answer!
    login(network: String!, badgeId: Int!, pin: String!): User
  }

  type Besty {
    score: Int!
    user: User!
  }

  type MatchSummary {
    matches: Int!
    score: Int!
  }
  type Query {
    getAnswers(network: String!, badgeId: Int!): [Answer!]!
    getUsers(network: String!): [User!]!
    getBesties(network: String!, badgeId: Int!): [Besty!]!
    summarizeMatches(network: String!, badgeId: Int!): MatchSummary!
  }

  schema {
    query: Query
  }
`;

const resolvers: Resolvers = {
  Mutation: {
    match: (_, { network, me, badgeId }) => makeMatch(network, me, badgeId),
    setAnswer: (_, { network, badgeId, answer }) =>
      setAnswer(network, badgeId, answer),
    login: (_, { network, badgeId, pin }) => login(network, badgeId, pin),
  },
  Query: {
    getAnswers: (_, { network, badgeId }) => getAnswers(network, badgeId),
    getUsers: (_, { network }) => getUsers(network),
    getBesties: (_, { network, badgeId }) => getBesties(network, badgeId),
    summarizeMatches: (_, { network, badgeId }) =>
      summarizeMatches(network, badgeId),
  },
};
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
