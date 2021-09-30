import { escape } from 'sqlstring';

export const dateToMysqlDate = (date: Date, esc?: boolean) => {
    const _date = date.toISOString().slice(0, 19).replace('T', ' ');
    return esc ? escape(_date) : _date;
};
