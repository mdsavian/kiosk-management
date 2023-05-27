import connectDB from "./database/connection";
import closeOpenKioskJob from "./jobs/closeOpenKioskJob";
import { createServer } from "./server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const server = createServer();

server.listen(port, () => {
  console.log(`Backend api is running on ${port}`);
});

closeOpenKioskJob();
