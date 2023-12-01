import { config } from "dotenv";

config();
export default {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",
  accessToken : process.env.ACCESS_TOKEN,
  port:process.env.PORT_BD,
};
