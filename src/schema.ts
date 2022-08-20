import { gql } from 'apollo-server'

export const typeDefs = gql`
    type Query{
        greeting: String

    }

    type Mutation{
        postCreate(title: String!, content: String!): PostPayload!
    }
    

    type Post{
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        published: Boolean!
        user: User!
        
    }

    type User{
        id: ID!
        name: String!
        email: String!
        profile: Profile!
        posts: [Post!]!
        # Profile
        # [Post]
    }

    type Profile{
        id: ID!
        bio: String!
        user: User!
        # User
    }

    type UserError{
        message: String!
    }

    type PostPayload{
        userErrors: [UserError!]!
        post: Post
    }



`