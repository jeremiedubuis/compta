import type { Request } from "polka";
import { ApiError } from "$shared/errors/ApiError";

export const validateSession = (req: Request, allowDisconnected?: boolean) => {
  if (!allowDisconnected && !req.session) {
    throw new ApiError("Unauthorized", 401);
  }
};
