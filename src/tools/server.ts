import { ApolloServer } from "apollo-server-express";
import { dataSource } from "./utils";
import { buildSchema } from "type-graphql";
import authService from "../services/authService";
import { UserResolver } from "../resolvers/userResolver";
import { StripeResolver } from "../resolvers/StripeResolver";
import { SubscriptionResolver } from "../resolvers/SubscriptionResolver";
import {LayoutResolver} from "../resolvers/LayoutResolver";
import express, {Express} from 'express';

async function createServer(): Promise<Express> {
    await dataSource.initialize();
    const schema = await buildSchema({
      resolvers: [UserResolver, StripeResolver, SubscriptionResolver, LayoutResolver],
      validate: { forbidUnknownValues: false },
      authChecker: ({ context }) => {
        console.log("CONTEXT", context);
        if (context.user === undefined) {
            return false;
          }
          return false;
      },
    });
    const server = new ApolloServer({
      schema,
      csrfPrevention: true,
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
            console.log(userPayload)
  
            return { user: userPayload };
          } catch (e) {
            console.log(e);
            return {};
          }
        }
      },
    });
    await server.start();

    const app = express();
    app.get('/upload', async (req, res) => {
      res.send('Upload entry');
    })

    server.applyMiddleware({ app, path: "/graphql" });

    return app;
  }

  export default createServer;
