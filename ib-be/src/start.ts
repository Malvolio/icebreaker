import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./GraphQLSchema";

const server = new ApolloServer({
  schema,
});
(async () => {
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
