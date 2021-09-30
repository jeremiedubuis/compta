import { Model } from '$models/Model';
import { companiesFetchAll, companyInsert } from '$queries/companyQueries';

export class CompanyModel extends Model {
    async fetchAll(userId: number) {
        return await this.query(companiesFetchAll(userId));
    }

    async insert(userId: number, name: string, type: string) {
        console.log(companyInsert(userId, this.uuid(), name, type));
        await this.query(companyInsert(userId, this.uuid(), name, type));
        return this.lastUuid;
    }
}
