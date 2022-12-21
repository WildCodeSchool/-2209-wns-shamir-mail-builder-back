import { ApolloServer } from "apollo-server";
import { dataSource } from "./utils";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import authService from "../services/authService";
import { UserResolver } from "../resolvers/userResolver";

async function createServer(): Promise<ApolloServer> {
    dotenv.config();
    await dataSource.initialize();
    const schema = await buildSchema({
      resolvers: [UserResolver], 
      authChecker: ({ context }) => {
        console.log("CONTEXT", context);

        if (context.user === undefined) {
            return false;
          }
          return false;
      },
    });
    return new ApolloServer({
      schema,
      context: ({ req }) => {
        if (
          req?.headers.authorization === undefined ||
          process.env.JWT_SECRET_KEY === undefined
        ) {
          return {};
        } else {
          try {
            const bearer = req.headers.authorization.split("Bearer ")[1];
            const userPayload = authService.verifyToken(bearer);
  
            return { user: userPayload };
          } catch (e) {
            console.log(e);
            return {};
          }
        }
      },
    });
  }

  export default createServer;
