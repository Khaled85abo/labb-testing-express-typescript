import express, { json, urlencoded, Request, Response } from "express";

const makeApp = ({}) => {
  const app = express();
  // app.use(json())
  // app.use(urlencoded())

  app.get("/api/healthcheck", (req: Request, res: Response) => {
    res.status(200).json({ msg: "Your app is healthy and running" });
  });
  return app;
};

export default makeApp;
