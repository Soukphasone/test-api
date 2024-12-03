import oracledb from 'oracledb'
import dotenv from 'dotenv'

dotenv.config()

export async function connection() {
    oracledb.initOracleClient({libDir: 'util/orcl-instant-client/instantclient_23_5'})
    const conn = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectionString: process.env.CONNNECTING_STRING,
        retryCount: 3,
    })
    return conn
}
