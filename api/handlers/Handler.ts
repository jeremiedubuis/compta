import cookie from "cookie";
import { Cookie } from "../types";
import { ServerResponse } from "http";
import type { Request } from "polka";
import { ApiError } from "$shared/errors/ApiError";

type SuccessOptions = { cookie?: Cookie };

export class Handler {
  res: ServerResponse;

  constructor(res: ServerResponse) {
    this.res = res;
  }
  static handle(method: string) {
    return async (req: Request, res: ServerResponse) => {
      const instance: any = new this(res);
      if (typeof instance[method] !== "function")
        throw `${method} is not implemented on Handler ${instance.constructor.name}`;

      let cacheKey: string;

      const success = async (
        response: any,
        code: number = 200,
        successOptions?: SuccessOptions,
        extra?: any
      ) => {
        return instance.success(response, code, successOptions);
      };

      try {
        return await instance[method](req, { success });
      } catch (e) {
        return await instance.error(e);
      }
    };
  }

  success(response: any, code: number = 200, options?: SuccessOptions) {
    this.res.statusCode = code;
    if (options?.cookie) {
      this.res.setHeader(
        "Set-Cookie",
        cookie.serialize(
          options.cookie.name,
          options.cookie.value,
          options.cookie.options
        )
      );
    }
    const str = JSON.stringify(response);
    this.res.end(str);
    return response;
  }

  error(err: Error | ApiError, code: number = 500) {
    console.log(err);
    //@ts-ignore
    if (err?.code) {
      this.res.statusMessage = `Error: ${err.name}`;
      //@ts-ignore
      this.res.statusCode = err.code;
      this.res.end({ message: err.message });
      return;
    }
    this.res.statusCode = code;
    this.res.end(err.message);
  }
}
