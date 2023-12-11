import express from "express";
import routes from "./routes";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 3000;
var cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT as number, () =>
      console.log(`Listening on all interfaces:${PORT}`)
    );
  })
  .catch((error:any) => console.log(error));
