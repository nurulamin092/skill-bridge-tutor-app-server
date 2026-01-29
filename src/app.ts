import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Skill Bridge Tutor Application is running....");
});

export default app;
