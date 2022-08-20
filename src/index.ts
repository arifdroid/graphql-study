import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './schema'
import { PrismaClient, Prisma } from '@prisma/client'
import { Query, Mutation } from './resolvers';

const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
}


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    context: {
        prisma
    }


})


server.listen().then(({ url }) => {
    console.log(`Server ready on ${url}`)
})