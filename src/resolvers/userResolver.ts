import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import userService from "../services/userService";

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    async getOne(
        @Arg("email") email: string
    ): Promise<User> {
        const user = await userService.getByEmail(email);
        return user;
    };

    @Query(() => User)
    async getOneById(
        @Arg("id") id: number
    ): Promise<User> {
        const user = await userService.getById(id);
        return user;
    };
    
    @Mutation(() => User)
    async createUser(
        @Arg("email") email: string,
        @Arg("userName") userName: string,
        @Arg("password") password: string,
        @Arg("phoneNumber") phoneNumber: string,
        ): Promise<User> {
        const user = await userService.create(email, userName, password, phoneNumber);
        return user;
    };

    @Mutation(() => User)
    async deleteUser(
        @Arg("id") id: number,
    ): Promise<string> {
        const deleted = await userService.deleteOne(id);
        return "ok";
    }
};
