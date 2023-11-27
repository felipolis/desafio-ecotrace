import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";

const PORT = 8000;
const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});