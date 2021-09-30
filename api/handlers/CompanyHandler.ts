import { Handler } from '$handlers/Handler';
import { TypeModel } from '$models/TypeModel';
import { CompanyModel } from '$models/CompanyModel';
import { Request } from 'polka';
import { FiscalYearModel } from '$models/FiscalYearModel';

export class CompanyHandler extends Handler {
    async fetchTypes() {
        return await this.success(await new TypeModel().fetchAll());
    }

    async createCompany(req: Request) {
        return await this.success({
            uuid: await new CompanyModel().insert(req.session.id, req.body.name, req.body.type)
        });
    }

    async fetchFiscalYears(req: Request) {
        return await this.success(await new FiscalYearModel().fetchAll(req.params.companyUuid));
    }

    async createFiscalYear(req: Request) {
        return await this.success(
            await new FiscalYearModel().insert(
                req.params.companyUuid,
                req.body.start,
                req.body.end,
                req.body.active
            )
        );
    }
}
