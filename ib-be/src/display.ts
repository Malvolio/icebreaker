import { APIGatewayProxyEvent } from "aws-lambda";
import imported from "./imported";
const display = (event: APIGatewayProxyEvent) =>
  JSON.stringify(
    {
      message: "Go Serverless v3.0! Your function executed successfully!",
      input: event,
      imported,
    },
    null,
    2
  );

export default display;
