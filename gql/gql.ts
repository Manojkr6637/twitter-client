/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "#graphql\n\n    query GetAllTweets {\n            getAllTweets {\n             id\n             content    \n             imageURL\n             author {\n                 id\n                 firstName\n                 lastName\n                 profileImageURL\n             }\n            \n            }\n    \n    }\n    \n    \n    ": types.GetAllTweetsDocument,
    "\n           query GetSignedURLForTweetQuery($imageName: String!, $imageType: String!) {\n  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n}\n        ": types.GetSignedUrlForTweetQueryDocument,
    "#graphql\nquery VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token) \n}": types.VerifyUserGoogleTokenDocument,
    "#graphql\n        query getCurrentUserQuery {  \n                        getCurrentUser {\n                                        id\n                                        email\n                                        firstName                                         \n                                        profileImageURL\n                                        tweets {\n                                        id\n                                        content\n                                        author {\n                                            firstName\n                                            lastName\n                                            profileImageURL\n                                        }  \n                                        }\n                           }\n                        }\n\n\n        ": types.GetCurrentUserQueryDocument,
    "#graphql        \nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n                id\n                firstName\n                lastName\n                followers {\n                        id\n                        firstName\n                        email\n                        profileImageURL\n                    }\n                  following\n                        {\n                                id\n                                firstName\n                                email\n                                profileImageURL\n                        \n                        } \n\n                    tweets {\n                            id\n                            content\n                            author {\n                                        id\n                                        email\n                                        firstName\n                                        profileImageURL\n                                   }\n                        }\n     \n         }\n     }": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\n    query GetAllTweets {\n            getAllTweets {\n             id\n             content    \n             imageURL\n             author {\n                 id\n                 firstName\n                 lastName\n                 profileImageURL\n             }\n            \n            }\n    \n    }\n    \n    \n    "): (typeof documents)["#graphql\n\n    query GetAllTweets {\n            getAllTweets {\n             id\n             content    \n             imageURL\n             author {\n                 id\n                 firstName\n                 lastName\n                 profileImageURL\n             }\n            \n            }\n    \n    }\n    \n    \n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n           query GetSignedURLForTweetQuery($imageName: String!, $imageType: String!) {\n  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n}\n        "): (typeof documents)["\n           query GetSignedURLForTweetQuery($imageName: String!, $imageType: String!) {\n  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n}\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token) \n}"): (typeof documents)["#graphql\nquery VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token) \n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n        query getCurrentUserQuery {  \n                        getCurrentUser {\n                                        id\n                                        email\n                                        firstName                                         \n                                        profileImageURL\n                                        tweets {\n                                        id\n                                        content\n                                        author {\n                                            firstName\n                                            lastName\n                                            profileImageURL\n                                        }  \n                                        }\n                           }\n                        }\n\n\n        "): (typeof documents)["#graphql\n        query getCurrentUserQuery {  \n                        getCurrentUser {\n                                        id\n                                        email\n                                        firstName                                         \n                                        profileImageURL\n                                        tweets {\n                                        id\n                                        content\n                                        author {\n                                            firstName\n                                            lastName\n                                            profileImageURL\n                                        }  \n                                        }\n                           }\n                        }\n\n\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql        \nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n                id\n                firstName\n                lastName\n                followers {\n                        id\n                        firstName\n                        email\n                        profileImageURL\n                    }\n                  following\n                        {\n                                id\n                                firstName\n                                email\n                                profileImageURL\n                        \n                        } \n\n                    tweets {\n                            id\n                            content\n                            author {\n                                        id\n                                        email\n                                        firstName\n                                        profileImageURL\n                                   }\n                        }\n     \n         }\n     }"): (typeof documents)["#graphql        \nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n                id\n                firstName\n                lastName\n                followers {\n                        id\n                        firstName\n                        email\n                        profileImageURL\n                    }\n                  following\n                        {\n                                id\n                                firstName\n                                email\n                                profileImageURL\n                        \n                        } \n\n                    tweets {\n                            id\n                            content\n                            author {\n                                        id\n                                        email\n                                        firstName\n                                        profileImageURL\n                                   }\n                        }\n     \n         }\n     }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;