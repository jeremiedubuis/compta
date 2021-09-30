import JWTR from 'jwt-redis';
import { redisClient } from './redisClient';
import { SessionType } from './types';
export const jwtRedis = new JWTR(redisClient);

export const sign = (payload: SessionType): Promise<string> =>
    jwtRedis.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.SESSION_DURATION)
    });

export const verify = async (token: string): Promise<SessionType | null> => {
    if (!token) return null;
    const { jti, ...session }: any = await jwtRedis.verify(token, process.env.JWT_SECRET);
    if (!session) return null;
    return session;
};

export const destroy = async (token: string) => {
    return await jwtRedis.destroy(token);
};
