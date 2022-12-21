import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import userService from "../services/userService";
import authService from "../services/authService";

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    async getOne(
        @Arg("email") email: string
    ): Promise<User> {
        const user = await userService.getByEmail(email);
        return user;
    };
    
    @Mutation(() => User)
    async createUser(
        @Arg("email") email: string,
        @Arg("username") username: string,
        @Arg("password") password: string,
        @Arg("phone") phone: string,
        ): Promise<User> {
        const user = await userService.create(email, username, password, phone);
        return user;
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
};

