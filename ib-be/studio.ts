import { asPage } from "./asPage";
const page = asPage(`
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html> <head>
<title>Icebreaker GraphQL Studio</title>
</head>
<body style="margin: 0">
<div style="width: 100%; height: 100%;" id="embedded-sandbox"></div>
<script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script> 
<script>
  new window.EmbeddedSandbox({
    target: "#embedded-sandbox",
    initialEndpoint: "https://bhetgqwvhb.execute-api.us-east-1.amazonaws.com/graphql",
    includeCookies: false,
  });
</script>
</body></html>
`);
export default page;
