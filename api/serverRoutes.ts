const prefix = '/api';
export const user = {
    single: prefix + '/user',
    login: prefix + '/user/login',
    tokenLogin: prefix + '/user/login/token'
};

export const company = {
    single: prefix + '/company',
    types: prefix + '/companies/types'
};

export const fiscalYear = {
    multiple: prefix + '/company/:companyUuid/fiscalYears',
    single: prefix + '/company/:companyUuid/fiscalYear'
};
