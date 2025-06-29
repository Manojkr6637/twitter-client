import {graphql} from '@/gql';
export const verifyUserGoogleTokenQuery =
graphql(`#graphql
query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token) 
}`);


export const getCurrentUserQuery = graphql(`#graphql
        query getCurrentUserQuery {  
                        getCurrentUser {
                                        id
                                        email
                                        firstName                                         
                                        profileImageURL
                                        tweets {
                                        id
                                        content
                                        author {
                                            firstName
                                            lastName
                                            profileImageURL
                                        }  
                                        }
                           }
                        }


        `)


export const getUserByIdQuery = graphql(`#graphql        
query GetUserById($id: ID!) {
  getUserById(id: $id) {
                id
                firstName
                lastName
                followers {
                        id
                        firstName
                        email
                        profileImageURL
                    }
                  following
                        {
                                id
                                firstName
                                email
                                profileImageURL
                        
                        } 

                    tweets {
                            id
                            content
                            author {
                                        id
                                        email
                                        firstName
                                        profileImageURL
                                   }
                        }
     
         }
     }`
) ;       