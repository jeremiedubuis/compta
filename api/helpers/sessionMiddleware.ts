import type { Request } from "polka";
import type { ServerResponse } from "http";
import { verify } from "../tokens";
import { ApiError } from "$shared/errors/ApiError";

export const sessionMiddleware = async (
  req: Request,
  res: ServerResponse,
  next: Function
) => {
  if (!req.cookies.token) req.session = null;
  else {
    const session = await verify(req.cookies.token);
    if (!session) throw new ApiError({ message: "invalidToken" }, 401);
    req.session = session;
  }
  next();
};
