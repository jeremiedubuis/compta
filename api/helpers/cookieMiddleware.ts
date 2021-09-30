import { ServerResponse } from "http";
import cookie from "cookie";
import { Request } from "polka";

export const cookieMiddleware = (
  req: Request,
  res: ServerResponse,
  next: Function
) => {
  req.cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  next();
};
