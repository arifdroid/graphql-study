import { Context } from '../../index'
import validator from 'validator';

interface signUpArgs {
    email: string
    name: string
    bio: string
    password: string
}

interface UserPayload {
    userErrors: {
        message: string
    }[],
    user: any

}

export const authResolvers = {

    signUp: async (
        _: any,
        { email, name, bio, password }: signUpArgs,
        { prisma }: Context): Promise<UserPayload> => {

        const isEmail = validator.isEmail(email);

        if (!isEmail) return {
            userErrors: [{
                message: 'invalid emails'
            }],
            user: null
        }

        return {
            userErrors: [{
                message: 'invalid emails'
            }],
            user: null
        }



        // return await prisma.user.create({ data: { email, name, password } })

    }

}