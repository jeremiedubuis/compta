import { escape } from "sqlstring";

export const createUser = (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) =>
  `INSERT INTO users (email, password, firstname, lastname)
    VALUES (
          ${escape(email)}, 
          ${escape(password)}, 
          ${escape(firstname)}, 
          ${escape(lastname)}
    )`;

export const selectUserForLogin = (email: string) =>
  `SELECT id, password, firstname, lastname
     FROM users
     WHERE email=${escape(email)}`;
