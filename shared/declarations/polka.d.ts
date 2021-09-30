declare module 'polka' {
    import type { IncomingMessage } from 'http';
    import { SessionType } from '../../api/types';

    export interface Request extends IncomingMessage {
        body?: any;
        session?: SessionType;
        cookies?: {
            [name: string]: string;
        };
        params?: {
            [name: string]: string;
        };
        query?: {
            [name: string]: string;
        };
    }

    export type Polka = any;

    export default function polka(): any;
}
