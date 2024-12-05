import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import oracleDB from "oracledb";
import { GET_USER_BY_ID } from "../util/statement";
import { JwtPayload } from "../util/types";
import { execute_procedure } from "../service/service";
export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({ message: "NO_TOKEN_PROVIDED" });
    return;
  }
  if (token.split(" ")[0] !== "SOUKPHASONE") {
    res.status(403).json({ message: "INVALID_TOKEN" });
    return;
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
    if (!decoded) {
      res.status(401).json({ message: "USER_ID_NOT_FOUND_IN_TOKEN", err });
      return;
    }
    if (err) {
      console.error("JWT verification error:", err);
      res.status(401).json({ message: "JWT_VERIFICATION_ERROR", err });
      return;
    }

    req.user = decoded as JwtPayload;
    const bind_data = {
      P_USER_ID:   req.user.USER_ID,          
      V_CURSOR: { type: oracleDB.CURSOR, dir: oracleDB.BIND_OUT } 
    }
    try {
      const _user = await execute_procedure(GET_USER_BY_ID, bind_data);
      if (_user.data.length <= 0 || _user.error == '2') {
        res.status(404).json({ message: "USER_NOT_FOUND" });
        return;
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "SERVER_ERROR", err });
    }
  });
}
