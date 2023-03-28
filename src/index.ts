import createServer from "./tools/server";
import * as dotenv from "dotenv";

const port = 5000;

const start = async (): Promise<void> => {
  dotenv.config();
  const server = await createServer();
  try {
    const { url }: { url: string } = await server.listen(port);
    console.log(`Server ready at ${url}`);
  } catch (e) {
    console.error("Error starting the server");
  }
};

void start();
