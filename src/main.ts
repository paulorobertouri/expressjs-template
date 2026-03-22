import "dotenv/config.js";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { registerRoutes } from "./api/routes.js";
import { createProviders } from "./di/providers.js";

const app: Express = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Initialize DI providers
const providers = createProviders();

// Register routes
registerRoutes(app, providers);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
