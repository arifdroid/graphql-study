import { Post } from '@prisma/client'
import { Context } from '../index'

interface PostCreateArgs {
    title: string
    content: string
}

interface PostPayloadType {
    userErrors: {
        message: string
    }[],
    post: Post | null
}

export const Mutation = {
    postCreate: async (parent: any,
        { title, content }: PostCreateArgs,
        { prisma }: Context)
        : Promise<PostPayloadType> => {

        if (!title || !content) return {
            userErrors: [{
                message: 'You must provide a title and a content to create a post'
            }],
            post: null
        }


        const post = await prisma.post.create({
            data: {
                authorId: 1,
                title,
                content
            }
        })

        return {
            userErrors: [],
            post
        }
    }
}