import { Polka } from 'polka';
import { user } from '../serverRoutes';
import { ApiRoute } from './ApiRoute';
import { Method } from '../types';
import { UserHandler } from '$handlers/UserHandler';

export const createRoutes = (app: Polka) => {
    new ApiRoute(app, user.single, Method.POST, UserHandler.handle('create'), {
        body: {
            email: 'email',
            password: 'string',
            firstname: 'string',
            lastname: 'string'
        },
        allowDisconnected: true
    });
    new ApiRoute(app, user.login, Method.POST, UserHandler.handle('login'), {
        body: {
            email: 'email',
            password: 'string'
        },
        allowDisconnected: true
    });
    new ApiRoute(app, user.tokenLogin, Method.POST, UserHandler.handle('loginFromToken'), {
        allowDisconnected: true
    });
};
