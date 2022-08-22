import { Post, Prisma } from '@prisma/client'
import { Context } from '../index'

interface PostArgs {
    post: {
        title?: string
        content?: string
    }
}

interface PostPayloadType {
    userErrors: {
        message: string
    }[],
    post: Post | Prisma.Prisma__PostClient<Post> | null
}

export const Mutation = {
    postCreate: async (parent: any,
        { title, content }: PostArgs["post"],
        { prisma }: Context)
        : Promise<PostPayloadType> => {

        if (!title || !content) return {
            userErrors: [{
                message: 'You must provide a title and a content to create a post'
            }],
            post: null
        }


        // const post = await prisma.post.create({
        //     data: {
        //         authorId: 1,
        //         title,
        //         content
        //     }
        // })

        return {
            userErrors: [],
            post: prisma.post.create({
                data: {
                    authorId: 1,
                    title,
                    content
                }
            })
        }
    },

    postUpdate: async (
        parent: any,
        { postId, post }: { postId: String, post: PostArgs['post'] },
        { prisma }: Context)
        : Promise<PostPayloadType> => {

        const { title, content } = post;

        if (!title && !content) return {
            userErrors: [
                { message: "need to have one field updated" }
            ],
            post: null
        }

        const existingPost = await prisma.post.findUnique({ where: { id: Number(postId) } })

        if (!existingPost) return {
            userErrors: [
                { message: "need to have one field updated" }
            ],
            post: null
        }

        let payloadToUpdate = {
            title,
            content
        }

        if (!title) delete payloadToUpdate.title;
        if (!content) delete payloadToUpdate.content;

        return {
            userErrors: [],
            post: prisma.post.update({
                data: { ...payloadToUpdate },
                where: { id: Number(postId) }
            })
        }


        // const postasd = await prisma.post.create({
        //     data: {
        //         authorId: 1,
        //         title,
        //         content
        //     }
        // })

        // return null
        // return {
        //     const asd = pos
        // }
    }
}