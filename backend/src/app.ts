import express from "express";
import cors from "cors";
import { getGraphData } from "./Utils/Graph";
import { getDevices } from "./Controllers/devicesController";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

app.get("/devices", getDevices);

export default app;