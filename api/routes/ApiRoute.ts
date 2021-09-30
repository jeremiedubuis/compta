import { Method, RequestHandler, Validation } from "../types";
import FastestValidator from "fastest-validator";
import { validateSession } from "../helpers/validateSession";
import { validateOrigin } from "../helpers/validateOrigin";
import { ApiError } from "$shared/errors/ApiError";
import type { Request } from "polka";
import { ServerResponse } from "http";

export const routes: {
  [route: string]: {
    method: Method;
    validation?: Validation;
    parseMultipart?: boolean;
  }[];
} = {};

export class ApiRoute {
  private readonly handler: RequestHandler;

  constructor(
    app: any,
    route: string | string[],
    method: Method,
    handler: RequestHandler,
    validation?: Validation
  ) {
    // order matters
    if (validation) handler = this.addValidator(validation, handler);

    handler = this.validateOrigin(handler, validation?.ignoreOrigin);
    handler = this.validateSession(handler, validation?.allowDisconnected);

    this.handler = this.addErrorHandler(handler);

    if (!Array.isArray(route)) route = [route];

    route.forEach((r) => {
      this.addRoute(app, r, method);
      if (!routes[r]) routes[r] = [];
      routes[r].push({ method, validation });
    });
  }

  validateOrigin(handler: RequestHandler, ignoreOrigin?: boolean) {
    return async (
      req: Request,
      res: ServerResponse,
      next: () => Promise<void>
    ) => {
      validateOrigin(req, ignoreOrigin);
      return await handler(req, res, next);
    };
  }

  validateSession(handler: RequestHandler, allowDisconnected?: boolean) {
    return async (
      req: Request,
      res: ServerResponse,
      next: () => Promise<void>
    ) => {
      validateSession(req, allowDisconnected);
      return await handler(req, res, next);
    };
  }

  addValidator(validation: Validation, handler: RequestHandler) {
    const v = new FastestValidator();
    let bodyValidator: Function;
    let paramsValidator: Function;
    let queryValidator: Function;

    if (validation.body)
      bodyValidator = v.compile({ ...validation.body, $$strict: true });
    if (validation.params)
      paramsValidator = v.compile({ ...validation.params, $$strict: true });

    // always allow optional locale parameter
    queryValidator = v.compile({
      ...(validation.query || {}),
      locale: "string|optional",
      $$strict: true,
    });

    return async (
      req: Request,
      res: ServerResponse,
      next: () => Promise<void>
    ) => {
      let result;
      if (bodyValidator) {
        result = bodyValidator(req.body);
        if (result !== true) throw new ApiError(result, 400);
      }
      if (paramsValidator) {
        result = paramsValidator(req.params);
        if (result !== true) throw new ApiError(result, 400);
      }

      result = queryValidator(req.query);
      if (result !== true) throw new ApiError(result, 400);
      return handler(req, res, next);
    };
  }

  addErrorHandler(handler: RequestHandler) {
    return async (
      req: Request,
      res: ServerResponse,
      next: () => Promise<void>
    ) => {
      res.setHeader("Content-Type", "application/json");

      try {
        return await handler(req, res, next);
      } catch (e) {
        if (e?.apiError) {
          res.statusCode = e.code;
        } else {
          res.statusCode = 500;
        }
        res.end(e.message);
      }
    };
  }

  addRoute(app: any, route: string, method: Method) {
    switch (method) {
      case Method.GET:
        return app.get(route, this.handler);
      case Method.POST:
        return app.post(route, this.handler);
      case Method.PUT:
        return app.put(route, this.handler);
      case Method.DELETE:
        return app.delete(route, this.handler);
    }
  }
}
