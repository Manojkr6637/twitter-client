import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined'

export const  graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_API as string, {

    headers: ()=>{
        const token = isClient? localStorage.getItem('_twitter_token'): ''	
        return {
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});