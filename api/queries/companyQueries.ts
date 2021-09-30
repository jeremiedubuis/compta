import { escape } from 'sqlstring';

export const companiesFetchAll = (userId: number) =>
    `SELECT c.uuid, c.name, t.name AS type
    FROM companies c
    INNER JOIN types t ON t.id = c.type_id
    WHERE c.user_id = ${escape(userId)}`;

export const companyInsert = (userId: number, uuid: string, name: string, type: string) =>
    `INSERT INTO companies (uuid, name, type_id, user_id)
    SELECT ${escape(uuid)}, ${escape(name)}, t.id, ${escape(userId)}
    FROM types t
    WHERE t.name = ${escape(type)}`;
