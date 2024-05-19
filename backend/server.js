import express from "express";
import { createServer } from "http";
import cors from "cors";
import mongoose from "mongoose";

import MongoStore from "connect-mongo";

import dotenv from "dotenv";

import session from "express-session";
import passport from "passport";

import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import chatRouter from "./routes/ChatRoutes.js";

import swaggerSpec from "./utils/swagger.js";
import swaggerUi from "swagger-ui-express";

import socketIo from "./controllers/socketIo.js";

dotenv.config();

const app = express();

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/MKChat",
    }),
    cookie: { maxAge: 60000 * 60 * 24 * 7 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors("*"));

const server = createServer(app);
socketIo(server);

mongoose
  .connect("mongodb://localhost:27017/MKChat", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
