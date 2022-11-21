import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import display from "./src/display";
import GraphQLHandler from "./src/GraphQLHandler";
import page from "./studio";
export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = display(event);
  return {
    statusCode: 200,
    body,
  };
};

export const graphql = GraphQLHandler;

export const studio = () => Promise.resolve(page);
