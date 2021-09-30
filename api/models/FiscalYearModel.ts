import { Model } from '$models/Model';
import { fiscalYearFetchAll, fiscalYearInsert } from '$queries/fiscalYearQueries';
import type { RowDataPacket } from 'mysql2';

export class FiscalYearModel extends Model {
    async fetchAll(companyUuid: string) {
        return ((await this.query(fiscalYearFetchAll(companyUuid))) as RowDataPacket[]).filter(
            (y) => y.start
        );
    }

    async insert(companyUuid: string, start: Date, end: Date, active?: boolean) {
        return await this.query(fiscalYearInsert(companyUuid, start, end, active));
    }
}
