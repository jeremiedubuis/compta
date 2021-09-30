import { Model } from "$models/Model";
import { createUser, selectUserForLogin } from "$queries/userQueries";
import { hash, verify } from "argon2";
import type { RowDataPacket } from "mysql2";
import { ApiError } from "$shared/errors/ApiError";
import { SessionType } from "../types";

export class UserModel extends Model {
  async create(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    password = await hash(password);
    await this.query(createUser(email, password, firstname, lastname));
  }

  async login(email: string, password: string): Promise<SessionType> {
    const user = await this.selectUserForLogin(email);

    if (!user || !(await verify(user.password, password)))
      throw new ApiError("Login error", 401);

    return {
      id: user.id,
      email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }

  async selectUserForLogin(email: string) {
    const [user] = (await this.query(
      selectUserForLogin(email)
    )) as RowDataPacket[];
    return user;
  }
}
