import Express from "express";
import { test } from "../controllers/test.control";

const route = Express.Router();

route.get("/test", async (req, res) => {
  res.send(test());
});

export default route;
