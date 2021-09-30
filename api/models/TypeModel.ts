import { Model } from '$models/Model';
import { typesFetchAll } from '$queries/typeQueries';

export class TypeModel extends Model {
    async fetchAll() {
        return await this.query(typesFetchAll());
    }
}
