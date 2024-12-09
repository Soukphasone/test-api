import oracleDB from "oracledb";
import { connection } from "../lib/orcl";
import { HTTP_OK, HTTP_SERVER_ERROR } from "../util/httpStatusCode";

export async function execute_procedure(statement: string, bind_data: any) {
  try {
    const conn = await connection();
    if (conn.isHealthy()) {
      const query: any = await conn.execute(statement, bind_data, {
        outFormat: oracleDB.OUT_FORMAT_OBJECT,
      });
      const result = query.outBinds.V_CURSOR;
      const rows = await result.getRows();
      await result.close();
      conn.commit();
      conn.close();
      return {
        error: "0",
        statusCode: HTTP_OK,
        message: "SUCCESS",
        data: rows,
      };
    } else {
      conn.close();
      return {
        error: "1",
        statusCode: HTTP_SERVER_ERROR,
        message: "Database connection error",
        data: [],
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      error: "2",
      message: err.message,
      data: err,
    };
  }
}
