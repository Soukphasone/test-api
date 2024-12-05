import Express from "express";
import { test } from "../controllers/test.control";

const route = Express.Router();

route.get("/test", async (req, res) => {
  const data = test();
  res.send(data);
});

export default route;
