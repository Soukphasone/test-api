import oracleDB from "oracledb";
import { handleResponse } from "../handler/handler.response";
import { execute_procedure } from "../service/service";
import { GET_USERS_AD } from "../util/statement";
import { HTTP_OK, HTTP_SERVER_ERROR } from "../util/httpStatusCode";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function login(body: any,) {
  const bind_data = {
    PD_AD_BIG: body.Username.toLocaleUpperCase(),
    PD_AD_SMALL: body.Username.toLocaleLowerCase(),
    V_CURSOR: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR },
  };
  const _user = await execute_procedure(GET_USERS_AD, bind_data);
  console.log("User:", _user);
  if (!_user.data || _user.data.length <= 0) {
    return {
      error: "1",
      statusCode: HTTP_SERVER_ERROR,
      message: "Database connection error",
      data: [],
    };
  }
  if (_user.data.length > 0 && body.Password === _user.data[0].PASSWORD) {
    const token = jwt.sign(
      {
        USER_ID: _user.data[0].USER_ID,
        USERAD: _user.data[0].USERAD,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1d" }
    );
    const data = {
      token: token,
      user: {
        USER_ID: _user.data[0].USER_ID,
        USERAD: _user.data[0].USERAD,
        // PASSWORD: res.data[0].PASSWORD,
        USERNAME: _user.data[0].USERNAME,
        CREATED_AT: _user.data[0].CREATED_AT,
        UPDATED_AT: _user.data[0].UPDATED_AT,
      },
    };
    return handleResponse(_user.error, _user.statusCode, _user.message, data);
  }
}
