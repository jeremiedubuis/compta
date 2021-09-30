import { apiFetch } from '$async/fetch';
import { company, fiscalYear, user } from '../api/serverRoutes';
import { uriWithParams } from '$shared/helpers/uriWithParams';

export const asyncCompanyTypesFetch = () =>
    apiFetch(company.types, {
        method: 'GET'
    });

export const asyncCompanyCreate = (name: string, type: string) =>
    apiFetch(company.single, {
        method: 'POST',
        body: JSON.stringify({
            name,
            type
        })
    });

export const asyncCompanyFiscalYearsFetch = (uuid: string) =>
    apiFetch(uriWithParams(fiscalYear.multiple, { companyUuid: uuid }), {
        method: 'GET'
    });

export const asyncCompanyFiscalYearsCreate = (
    uuid: string,
    { start, end, active }: { start: Date; end: Date; active?: boolean }
) =>
    apiFetch(uriWithParams(fiscalYear.single, { companyUuid: uuid }), {
        method: 'POST',
        body: JSON.stringify({
            start,
            end,
            active
        })
    });
