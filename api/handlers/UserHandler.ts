import { Handler } from '$handlers/Handler';
import { UserModel } from '$models/UserModel';
import { Request } from 'polka';
import { destroy, sign, verify as verifyToken } from '../tokens';
import { ApiError } from '$shared/errors/ApiError';
import { Cookie } from '../types';
import omit from 'lodash/fp/omit';
import { CompanyModel } from '$models/CompanyModel';

const getTokenCookieOptions = (token: string, deleteCookie?: boolean): Cookie => ({
    name: 'token',
    value: token,
    options: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        domain: process.env.COOKIE_DOMAIN,
        maxAge: deleteCookie ? -1 : parseInt(process.env.SESSION_DURATION)
    }
});

export class UserHandler extends Handler {
    async create(req: Request) {
        try {
            await new UserModel().create(
                req.body.email,
                req.body.password,
                req.body.firstname,
                req.body.lastname
            );
            const user = await new UserModel().login(req.body.email, req.body.password);
            const token = await sign(user);
            return await this.success(omit('id', { ...user, companies: [] }), 200, {
                cookie: getTokenCookieOptions(token)
            });
        } catch (e) {
            if (e?.code === 'ER_DUP_ENTRY') throw new ApiError({ message: 'errEmailExists' }, 409);
            throw e;
        }
    }

    async login(req: Request) {
        try {
            const user = await new UserModel().login(req.body.email, req.body.password);
            const token = await sign(user);
            const companies = await new CompanyModel().fetchAll(user.id);
            return await this.success(omit('id', { ...user, companies }), 200, {
                cookie: getTokenCookieOptions(token)
            });
        } catch (e) {
            throw new ApiError({ message: 'errBadCredentials' }, 401);
        }
    }

    async loginFromToken(req: Request) {
        const session = await verifyToken(req.cookies.token);
        if (!session)
            return this.success(null, 204, {
                cookie: getTokenCookieOptions(req.cookies.token, true)
            });
        const companies = await new CompanyModel().fetchAll(session.id);
        console.log(session.id, companies);
        return await this.success({ ...session, companies });
    }

    async logout(req: Request) {
        if (req.session) await destroy(req.cookies.token);
        return this.success(null, 204, {
            cookie: getTokenCookieOptions(req.cookies.token, true)
        });
    }
}
