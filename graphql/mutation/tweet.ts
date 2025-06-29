export const createTweetMutation = `#graphql

mutation CreateTweet($payload: CreateTweetData!){
    CreateTweet(payload: $payload){
       id
    }

}

`