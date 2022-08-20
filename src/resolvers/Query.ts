import { Context } from "..";

export const Query = {
    posts: async (_: any, __: any, { prisma }: Context) => {

        const posts = await prisma.post.findMany({
            orderBy: [{
                createAt: "desc"
            }
            ]
        });

        return posts;



    }
}