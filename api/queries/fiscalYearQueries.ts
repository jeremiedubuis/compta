import { escape } from 'sqlstring';
import { dateToMysqlDate } from '../helpers/dateToMysqlDate';

export const fiscalYearFetchAll = (companyUuid: string) =>
    `SELECT start, end, active 
    FROM companies c
    LEFT JOIN fiscal_years fy on c.id = fy.company_id
    WHERE c.uuid = ${escape(companyUuid)}`;

export const fiscalYearInsert = (companyUuid: string, start: Date, end: Date, active: boolean) =>
    `INSERT INTO fiscal_years (start, end, active, company_id)
    SELECT ${dateToMysqlDate(start, true)}, ${dateToMysqlDate(end, true)}, ${active ? 1 : 0}, c.id
    FROM companies c WHERE c.uuid = ${escape(companyUuid)}`;
