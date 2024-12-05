import Express from "express";
import { test } from "../controllers/test.control";

const route = Express.Router();

route.get("/test", async (req, res) => {
  const data = "Test OK";
  res.send(data);
});

export default route;
 