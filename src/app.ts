import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { routes } from "./routes";
import { User } from "user/User";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(express.json())
    app.use(routes)

    app.listen(3000, () =>
        console.info("Server running on http://localhost:3000")
    )


}).catch(error => console.log(error));
