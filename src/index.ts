import { ApolloServer } from "apollo-server";
import { dataSource } from "./tools/utils";
import { buildSchema } from "type-graphql";
import createServer from "./tools/server";
import { UserResolver } from "./resolvers/userResolver";

const port = 5000;

const start = async (): Promise<void> => {
  const server = await createServer();
  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`Server ready at ${url}`);
  } catch (e) {
    console.error("Error starting the server");
  }
};

void start();
