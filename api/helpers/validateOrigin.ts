import type { Request } from "polka";
import { ApiError } from "$shared/errors/ApiError";

export const validateOrigin = (req: Request, ignoreOrigin?: boolean) => {
  if (ignoreOrigin) return;

  if (req.headers.origin && !process.env.CORS.includes(req.headers.origin)) {
    throw new ApiError("Unauthorized", 401);
  }
};
