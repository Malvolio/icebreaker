import { APIGatewayProxyResult } from "aws-lambda";

export const asPage = (body: string): APIGatewayProxyResult => ({
  body,
  statusCode: 200,
  headers: {
    "Content-type": "text/html",
  },
});
