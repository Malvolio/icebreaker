import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: 'Answer';
  badgeId: Scalars['Int'];
  id: Scalars['ID'];
  network: Scalars['String'];
  optionIndex: Scalars['Int'];
  questionId: Scalars['String'];
};

export type AnswerInput = {
  optionIndex: Scalars['Int'];
  questionId: Scalars['String'];
};

export type Besty = {
  __typename?: 'Besty';
  score: Scalars['Int'];
  user: User;
};

export type Match = {
  __typename?: 'Match';
  answers: Array<Answer>;
  user: User;
};

export type MatchSummary = {
  __typename?: 'MatchSummary';
  matches: Scalars['Int'];
  score: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  match?: Maybe<Match>;
  setAnswer: Answer;
};


export type MutationLoginArgs = {
  badgeId: Scalars['Int'];
  network: Scalars['String'];
  pin: Scalars['String'];
};


export type MutationMatchArgs = {
  badgeId: Scalars['Int'];
  me: Scalars['Int'];
  network: Scalars['String'];
};


export type MutationSetAnswerArgs = {
  answer: AnswerInput;
  badgeId: Scalars['Int'];
  network: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAnswers: Array<Answer>;
  getBesties: Array<Besty>;
  getUsers: Array<User>;
  summarizeMatches: MatchSummary;
};


export type QueryGetAnswersArgs = {
  badgeId: Scalars['Int'];
  network: Scalars['String'];
};


export type QueryGetBestiesArgs = {
  badgeId: Scalars['Int'];
  network: Scalars['String'];
};


export type QueryGetUsersArgs = {
  network: Scalars['String'];
};


export type QuerySummarizeMatchesArgs = {
  badgeId: Scalars['Int'];
  network: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  badgeId: Scalars['Int'];
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  linkedIn?: Maybe<Scalars['String']>;
  network: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
};

export type GetUsersQueryVariables = Exact<{
  network: Scalars['String'];
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', network: string, badgeId: number, firstName: string, profile?: string | null }> };

export type GetAnswersQueryVariables = Exact<{
  network: Scalars['String'];
  badgeId: Scalars['Int'];
}>;


export type GetAnswersQuery = { __typename?: 'Query', getAnswers: Array<{ __typename?: 'Answer', id: string, network: string, badgeId: number, questionId: string, optionIndex: number }> };

export type MatchMutationVariables = Exact<{
  network: Scalars['String'];
  me: Scalars['Int'];
  badgeId: Scalars['Int'];
}>;


export type MatchMutation = { __typename?: 'Mutation', match?: { __typename?: 'Match', user: { __typename?: 'User', id: string, network: string, badgeId: number, firstName: string, profile?: string | null, linkedIn?: string | null, phone?: string | null, email?: string | null }, answers: Array<{ __typename?: 'Answer', id: string, network: string, badgeId: number, questionId: string, optionIndex: number }> } | null };

export type SetAnswerMutationVariables = Exact<{
  network: Scalars['String'];
  badgeId: Scalars['Int'];
  answer: AnswerInput;
}>;


export type SetAnswerMutation = { __typename?: 'Mutation', setAnswer: { __typename?: 'Answer', id: string, network: string, badgeId: number, questionId: string, optionIndex: number } };

export type SubmitPinMutationVariables = Exact<{
  network: Scalars['String'];
  badgeId: Scalars['Int'];
  pin: Scalars['String'];
}>;


export type SubmitPinMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, network: string, badgeId: number, firstName: string, profile?: string | null, linkedIn?: string | null, phone?: string | null, email?: string | null } | null };

export type SummarizeMatchesQueryVariables = Exact<{
  network: Scalars['String'];
  badgeId: Scalars['Int'];
}>;


export type SummarizeMatchesQuery = { __typename?: 'Query', summarizeMatches: { __typename?: 'MatchSummary', matches: number, score: number }, getBesties: Array<{ __typename?: 'Besty', score: number, user: { __typename?: 'User', badgeId: number, firstName: string, profile?: string | null } }> };


export const GetUsersDocument = gql`
    query GetUsers($network: String!) {
  getUsers(network: $network) {
    network
    badgeId
    firstName
    profile
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      network: // value for 'network'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetAnswersDocument = gql`
    query GetAnswers($network: String!, $badgeId: Int!) {
  getAnswers(network: $network, badgeId: $badgeId) {
    id
    network
    badgeId
    questionId
    optionIndex
  }
}
    `;

/**
 * __useGetAnswersQuery__
 *
 * To run a query within a React component, call `useGetAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnswersQuery({
 *   variables: {
 *      network: // value for 'network'
 *      badgeId: // value for 'badgeId'
 *   },
 * });
 */
export function useGetAnswersQuery(baseOptions: Apollo.QueryHookOptions<GetAnswersQuery, GetAnswersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnswersQuery, GetAnswersQueryVariables>(GetAnswersDocument, options);
      }
export function useGetAnswersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnswersQuery, GetAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnswersQuery, GetAnswersQueryVariables>(GetAnswersDocument, options);
        }
export type GetAnswersQueryHookResult = ReturnType<typeof useGetAnswersQuery>;
export type GetAnswersLazyQueryHookResult = ReturnType<typeof useGetAnswersLazyQuery>;
export type GetAnswersQueryResult = Apollo.QueryResult<GetAnswersQuery, GetAnswersQueryVariables>;
export const MatchDocument = gql`
    mutation Match($network: String!, $me: Int!, $badgeId: Int!) {
  match(network: $network, me: $me, badgeId: $badgeId) {
    user {
      id
      network
      badgeId
      firstName
      profile
      linkedIn
      phone
      email
    }
    answers {
      id
      network
      badgeId
      questionId
      optionIndex
    }
  }
}
    `;
export type MatchMutationFn = Apollo.MutationFunction<MatchMutation, MatchMutationVariables>;

/**
 * __useMatchMutation__
 *
 * To run a mutation, you first call `useMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [matchMutation, { data, loading, error }] = useMatchMutation({
 *   variables: {
 *      network: // value for 'network'
 *      me: // value for 'me'
 *      badgeId: // value for 'badgeId'
 *   },
 * });
 */
export function useMatchMutation(baseOptions?: Apollo.MutationHookOptions<MatchMutation, MatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MatchMutation, MatchMutationVariables>(MatchDocument, options);
      }
export type MatchMutationHookResult = ReturnType<typeof useMatchMutation>;
export type MatchMutationResult = Apollo.MutationResult<MatchMutation>;
export type MatchMutationOptions = Apollo.BaseMutationOptions<MatchMutation, MatchMutationVariables>;
export const SetAnswerDocument = gql`
    mutation SetAnswer($network: String!, $badgeId: Int!, $answer: AnswerInput!) {
  setAnswer(network: $network, badgeId: $badgeId, answer: $answer) {
    id
    network
    badgeId
    questionId
    optionIndex
  }
}
    `;
export type SetAnswerMutationFn = Apollo.MutationFunction<SetAnswerMutation, SetAnswerMutationVariables>;

/**
 * __useSetAnswerMutation__
 *
 * To run a mutation, you first call `useSetAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAnswerMutation, { data, loading, error }] = useSetAnswerMutation({
 *   variables: {
 *      network: // value for 'network'
 *      badgeId: // value for 'badgeId'
 *      answer: // value for 'answer'
 *   },
 * });
 */
export function useSetAnswerMutation(baseOptions?: Apollo.MutationHookOptions<SetAnswerMutation, SetAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAnswerMutation, SetAnswerMutationVariables>(SetAnswerDocument, options);
      }
export type SetAnswerMutationHookResult = ReturnType<typeof useSetAnswerMutation>;
export type SetAnswerMutationResult = Apollo.MutationResult<SetAnswerMutation>;
export type SetAnswerMutationOptions = Apollo.BaseMutationOptions<SetAnswerMutation, SetAnswerMutationVariables>;
export const SubmitPinDocument = gql`
    mutation SubmitPin($network: String!, $badgeId: Int!, $pin: String!) {
  login(network: $network, badgeId: $badgeId, pin: $pin) {
    id
    network
    badgeId
    firstName
    profile
    linkedIn
    phone
    email
  }
}
    `;
export type SubmitPinMutationFn = Apollo.MutationFunction<SubmitPinMutation, SubmitPinMutationVariables>;

/**
 * __useSubmitPinMutation__
 *
 * To run a mutation, you first call `useSubmitPinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitPinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitPinMutation, { data, loading, error }] = useSubmitPinMutation({
 *   variables: {
 *      network: // value for 'network'
 *      badgeId: // value for 'badgeId'
 *      pin: // value for 'pin'
 *   },
 * });
 */
export function useSubmitPinMutation(baseOptions?: Apollo.MutationHookOptions<SubmitPinMutation, SubmitPinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitPinMutation, SubmitPinMutationVariables>(SubmitPinDocument, options);
      }
export type SubmitPinMutationHookResult = ReturnType<typeof useSubmitPinMutation>;
export type SubmitPinMutationResult = Apollo.MutationResult<SubmitPinMutation>;
export type SubmitPinMutationOptions = Apollo.BaseMutationOptions<SubmitPinMutation, SubmitPinMutationVariables>;
export const SummarizeMatchesDocument = gql`
    query SummarizeMatches($network: String!, $badgeId: Int!) {
  summarizeMatches(network: $network, badgeId: $badgeId) {
    matches
    score
  }
  getBesties(network: $network, badgeId: $badgeId) {
    score
    user {
      badgeId
      firstName
      profile
    }
  }
}
    `;

/**
 * __useSummarizeMatchesQuery__
 *
 * To run a query within a React component, call `useSummarizeMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSummarizeMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSummarizeMatchesQuery({
 *   variables: {
 *      network: // value for 'network'
 *      badgeId: // value for 'badgeId'
 *   },
 * });
 */
export function useSummarizeMatchesQuery(baseOptions: Apollo.QueryHookOptions<SummarizeMatchesQuery, SummarizeMatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SummarizeMatchesQuery, SummarizeMatchesQueryVariables>(SummarizeMatchesDocument, options);
      }
export function useSummarizeMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SummarizeMatchesQuery, SummarizeMatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SummarizeMatchesQuery, SummarizeMatchesQueryVariables>(SummarizeMatchesDocument, options);
        }
export type SummarizeMatchesQueryHookResult = ReturnType<typeof useSummarizeMatchesQuery>;
export type SummarizeMatchesLazyQueryHookResult = ReturnType<typeof useSummarizeMatchesLazyQuery>;
export type SummarizeMatchesQueryResult = Apollo.QueryResult<SummarizeMatchesQuery, SummarizeMatchesQueryVariables>;