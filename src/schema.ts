import { gql } from 'apollo-server'

export const typeDefs = gql`
    type Query{
        greeting: String
        posts: [Post!]!

    }

    type Mutation{
        #repititive
        postCreate(post: PostInput!): PostPayload!
        postUpdate(postId: ID!, post: PostInput!): PostPayload
        postPublish(postId: ID!): PostPayload!
        postUnpublish(postId: ID!): PostPayload!
        signUp(email: String!, name: String!, password: String!): AuthPayload
        signup(
            credentials: CredentialsInput!
            name: String!
            bio: String!
            ): AuthPayload!
        signin(credentials: CredentialsInput!): AuthPayload!

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

    type AuthPayload{
        userErrors: [UserError!]!
        user: User
    }

    input PostInput{
        title: String,
        content: String
    }

    input CredentialsInput {
        email: String!
        password: String!
  }


`