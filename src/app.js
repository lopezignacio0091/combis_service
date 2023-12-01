import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes";
import vanRoutes from "./routes/van.routes";
import seatRoutes from "./routes/seat.routes";
import reatRoutes from "./routes/rate.routes";
import tourRoutes from "./routes/tour.routes";
import scheduleRoutes from "./routes/schedule.routes";
import reservesRoutes from "./routes/reserve.routes";
import mercadoPagoRoutes from "./routes/mercadoPago.routes";
import driverRoutes from "./routes/driver.routes";
config();
const app = express();

// Settings
app.set("port", process.env.PORT);

// Middlewares
app.use(morgan("dev"));

// Routes
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/vans", vanRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/rates", reatRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/reserves", reservesRoutes);
app.use("/api/mercadoPago", mercadoPagoRoutes);
app.use("/api/driver", driverRoutes);

export default app;
