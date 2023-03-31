import { ApolloServer } from "apollo-server";
import { dataSource } from "./utils";
import { buildSchema } from "type-graphql";
import authService from "../services/authService";
import { UserResolver } from "../resolvers/UserResolver";
import { StripeResolver } from "../resolvers/StripeResolver";
import { SubscriptionResolver } from "../resolvers/SubscriptionResolver";
import {LayoutResolver} from "../resolvers/LayoutResolver";
import { TemplateEmailsResolver } from "../resolvers/templateEmailsResolver";
import { CompaniesResolver } from "../resolvers/CompaniesResolver";

async function createServer(): Promise<ApolloServer> {
    await dataSource.initialize();
    const schema = await buildSchema({
      resolvers: [UserResolver, StripeResolver, SubscriptionResolver, LayoutResolver, TemplateEmailsResolver, CompaniesResolver],

      validate: { forbidUnknownValues: false },
      authChecker: ({ context }, roles) => {
        console.log("CONTEXT", context, roles);

        if (context.user === undefined) {
            return false;
          }
        if (roles.length === 0) {
          return true;
        }
          return false;
      },
    });
    return new ApolloServer({
      schema,
      cors: {
        origin: "*",
        credentials: true,
      },
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