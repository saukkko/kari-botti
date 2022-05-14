import express from "express";
import helmet from "helmet";
import { API } from "./Routes.js";

export const app = express();

app.set("trust-proxy", true);
app.use(helmet());
app.use(express.text({ type: "application/json" }));

app.use((req, res, next) => {
  try {
    if (req.method !== "GET" && req.method !== "OPTION") {
      if (req.headers["content-type"]?.split(";")[0] !== "application/json")
        throw new Error("invalid content-type header");
      JSON.parse(req.body);
    }
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ code: res.statusCode, message: err.message });
    } else {
      res.sendStatus(418);
    }
  }
});

app.use("/api", API);

app.get("/", (req, res) => res.sendStatus(200));

app.all("*", (req, res) =>
  res.status(404).json({ code: res.statusCode, message: "Not found" })
);
