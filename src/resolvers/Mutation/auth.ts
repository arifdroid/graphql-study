import { Context } from '../../index'
import validator from 'validator';

interface signUpArgs {
    email: string
    name: string
    bio: string
    password: string
}

export const authResolvers = {

    signUp: (
        _: any,
        { email, name, bio, password }: signUpArgs,
        { prisma }: Context) => {

       const isEmail = validator.isEmail(email);
       


        return prisma.user.create({ data: { email, name, password } })

    }

}