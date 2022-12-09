import makeApp from "./app";

const PORT = process.env.PORT || 8080;

const app = makeApp({});

console.log("server.ts file");

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
