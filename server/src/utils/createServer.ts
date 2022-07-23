import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import fastify, { FastifyInstance } from "fastify";
import { buildSchema } from "type-graphql";
import UserResolver from "../modules/user/user.resolver";

const app = fastify();

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      console.log("SERVER WILL START");
      return {
        async drainServer() {
          console.log("DRAIN SERVER");
          await app.close();
        },
      };
    },
  };
}

function buildContext() {}

export async function createServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
    context: buildContext,
  });

  return { app, server };
}
