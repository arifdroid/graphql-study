import { Post, Prisma } from '@prisma/client'
import { Context } from '../../index'
import { canUserMutatePost } from '../../utils/canUserMutatePost'

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


export const postResolvers = {

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
    },

    postPublish: async (
        _: any,
        { postId }: { postId: string },
        { prisma, userInfo }: Context
    ): Promise<PostPayloadType> => {

        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "Forbidden access (unauthenticated)",
                    },
                ],
                post: null,
            };
        }


        const error = await canUserMutatePost({
            userId: userInfo?.userId,
            postId: Number(postId),
            prisma,
        });


        if (error) return error;



        return {
            userErrors: [],
            post: prisma.post.update({
                where: {
                    id: Number(postId),
                },
                data: {
                    published: true,
                },
            }),
        };
    },

}