import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { User } from "../entities/User";
import userService from "../services/userService";
import authService from "../services/authService";
import { SubscriptionInput } from "../inputs/subscriptionInput";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
      try {
        return await userService.getAllUsers();
      } catch (e: any) {
        throw new Error("Error while looking for all users");
      }
    }

    @Query(() => User)
    async getOneUser(
        @Arg("email") email: string,
    ): Promise<User> {
      try {
        const user = await userService.getByEmail(email);
        return user;
      } catch (e) {
        throw new Error("Error while getting user by email");
      }
    };

    @Query(() => User)
    async getUserWithSubStatus(
        @Arg("email") email: string,
    ): Promise<User> {
      try {
        const user = await userService.getByEmail(email);
        return user;
      } catch (e) {
        throw new Error("Error while getting user by email");
      }
    };
    
    @Mutation(() => User)
    async createUser(
      @Arg("username") username: string,
      @Arg("password") password: string,
      @Arg("email") email: string,
      @Arg("phone") phone: string,
        ): Promise<User> {
        return await userService.create(username, password, email, phone);
    };

    @Mutation(() => User)
    async deleteUser(
        @Arg("id") id: number,
    ): Promise<string> {
        const deleted = await userService.deleteOne(id);
        return "ok";
    }

    @Mutation(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<String> {
    try {
      // Récupérer l'utilisateur dans la bdd suivant l'email
      const user = await userService.getByEmail(email);
      console.log(user);
      // Vérifier que ce sont les même mots de passe
      if (
        await authService.verifyPassword(password, user.hashedPassword)
      ) {
        // Créer un nouveau token => signer un token
        const token = authService.signJwt({
          email: user.email,
        });

        return token;
      } else {
        throw new Error();
      }
    } catch (e) {
      throw new Error("Invalid credentials");
    }
  }

    @Authorized()
    @Mutation(() => User)
    async saveUserSub(
      @Arg("subscription") subscription: SubscriptionInput,
      @Arg("email") email: string,
    ): Promise<User> {
      return await userService.saveUserSub(email, subscription);
    }
  
};

