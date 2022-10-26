import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import cors from "cors";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoute.js";
// import paymentRoutes from "./routes/PaymentRoutes.js";
// import employeeRoutes from "./routes/employeeRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoute from "./routes/employeeRoute.js";
import fileUpload from "express-fileupload";
app.use(
  cors()
  // cors({
  //   origin: "http://103.204.131.51:3000",
  //   methods: ["PATCH"],
  // })
);
// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import authorizePermission from "./middleware/authorizePermission.js";

// db and authenticate user
import connectDB from "./db/connect.js";
import auth from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

//file upload
app.use(fileUpload());
// used to get the acess the data from the post route
app.use(express.json());
// security
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("/api/v1", (req, res) => {
  // throw new Error("error");
  res.json({ msg: "welcome" });
});
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
// app.use("/api/employee", employeeRoutes);
app.use(
  "/api/v1",
  authenticateUser,
  authorizePermission("Admin", "stateAdmin"),
  adminRoutes
);
app.use("/api/v2", authenticateUser, employeeRoute);
// app.use(
//   "/api/v1/payment",
//   authenticateUser,
//   authorizePermission("admin"),
//   paymentRoutes
// );

// only when ready to deploy
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
