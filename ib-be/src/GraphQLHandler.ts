import { ApolloServer } from "apollo-server-lambda";
import schema from "./GraphQLSchema";

const server = new ApolloServer({
  schema,
});
const GraphQLHandler = server.createHandler();

export default GraphQLHandler;
