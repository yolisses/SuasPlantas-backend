import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  allowedHeaders: ["X-Request", "content-type"],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
