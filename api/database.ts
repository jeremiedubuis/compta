import { createPool } from "mysql2";
import type { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2";

const database = createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

database.on("connection", (conn) => {
  conn.query("SET time_zone='+00:00';", (error) => {
    if (error) {
      throw error;
    }
  });
});

database.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  }

  if (!connection) {
    return console.log("No PoolConnection");
  }

  connection.release();
});

export const query = (q: string, values?: any) =>
  new Promise<
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader
  >((resolve, reject) => {
    database.query(q, values, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
