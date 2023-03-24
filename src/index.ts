import createServer from "./tools/server";
import * as dotenv from "dotenv";

const port = 5000;

const start = async (): Promise<void> => {
  dotenv.config();
  const server = await createServer();
  try {
    await server.listen({ port });
    console.log(`Server ready at http://localhost:${port}/graphql`);
  } catch (e) {
    console.error("Error starting the server");
  }
};

void start();
