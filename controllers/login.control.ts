import oracleDB from "oracledb";
import { handleResponse } from "../handler/handler.response";
import { execute_procedure } from "../service/service";
import { GET_USERS_AD } from "../util/statement";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function login(body: any, res: any,) {
  const bind_data = {
    PD_AD_BIG: body.Username.toLocaleUpperCase(),
    PD_AD_SMALL: body.Username.toLocaleLowerCase(),
    V_CURSOR: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR },
  };
  const user = await execute_procedure(GET_USERS_AD, bind_data);
  if (!user){
    res.status(403).json({ message: "Error database" });
    return;
  }
  if (user.data.length > 0 && body.Password === user.data[0].PASSWORD) {
    const token = jwt.sign(
      {
        USER_ID: res.data[0].USER_ID,
        USERAD: res.data[0].USERAD,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1d" }
    );
    const data = {
      token: token,
      user: {
        USER_ID: res.data[0].USER_ID,
        USERAD: res.data[0].USERAD,
        // PASSWORD: res.data[0].PASSWORD,
        USERNAME: res.data[0].USERNAME,
        CREATED_AT: res.data[0].CREATED_AT,
        UPDATED_AT: res.data[0].UPDATED_AT,
      },
    };
    return handleResponse(res.error, res.statusCode, res.message, data);
  }
}
