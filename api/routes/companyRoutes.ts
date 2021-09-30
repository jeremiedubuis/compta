import { Polka } from 'polka';
import { company, fiscalYear } from '../serverRoutes';
import { ApiRoute } from './ApiRoute';
import { Method } from '../types';
import { CompanyHandler } from '$handlers/CompanyHandler';

export const createRoutes = (app: Polka) => {
    new ApiRoute(app, company.types, Method.GET, CompanyHandler.handle('fetchTypes'));
    new ApiRoute(app, company.single, Method.POST, CompanyHandler.handle('createCompany'), {
        body: {
            name: 'string',
            type: 'string'
        }
    });

    new ApiRoute(app, fiscalYear.multiple, Method.GET, CompanyHandler.handle('fetchFiscalYears'), {
        params: {
            companyUuid: 'string'
        }
    });
    new ApiRoute(app, fiscalYear.single, Method.POST, CompanyHandler.handle('createFiscalYear'), {
        params: {
            companyUuid: 'string'
        },
        body: {
            start: { type: 'date', convert: true },
            end: { type: 'date', convert: true },
            active: 'boolean|optional'
        }
    });
};
