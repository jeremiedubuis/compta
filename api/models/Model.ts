import { query } from "../database";
import { v4 as uuidV4 } from "uuid";

export class Model {
  lastUuid: string;

  uuid() {
    return (this.lastUuid = uuidV4());
  }

  async query(q: string, values?: any[]) {
    try {
      return await query(q, values);
    } catch (e) {
      console.log(e);
      console.log(q);
      throw e;
    }
  }
}
