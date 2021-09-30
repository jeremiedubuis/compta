import type { Request } from "polka";
import type { ServerResponse } from "http";
import type { CookieSerializeOptions } from "cookie";

export type SessionType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};

export type PublicSessionType = Omit<SessionType, "id">;

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type Validation = {
  body?: { [key: string]: any };
  params?: { [key: string]: any };
  query?: { [key: string]: any };
  allowDisconnected?: boolean;
  ignoreOrigin?: boolean;
};
export type RequestHandler = (
  req: Request,
  res: ServerResponse,
  next: () => Promise<void>
) => any;

export type Cookie = {
  name: string;
  value: string;
  options?: CookieSerializeOptions;
};
