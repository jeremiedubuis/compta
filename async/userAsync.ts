import { user } from '../api/serverRoutes';
import { apiFetch } from './fetch';

export const asyncSignIn = (payload: { email: string; password: string }) =>
    apiFetch(user.login, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

export const asyncSignInFromToken = () =>
    apiFetch(user.tokenLogin, {
        method: 'POST'
    });

export const asyncSignUp = (payload: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}) =>
    apiFetch(user.single, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
