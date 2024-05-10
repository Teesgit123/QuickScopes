import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { CORS_ORIGIN } = process.env;
const port = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

app.get("/", async (request: Request, response: Response) => {
    try {
      console.log(request);
      console.log("The type of the request is: ", typeof request);
      console.log("The type of the response is: ", typeof response);
      
      response.send("You have hit the server!");
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
