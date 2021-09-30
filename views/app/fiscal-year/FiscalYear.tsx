import React, { useEffect } from 'react';
import { asyncCompanyFiscalYearsFetch } from '$async/companyAsync';
import { useRecoilValue } from 'recoil';
import { companiesState } from '$atoms/companiesState';
import { FormFiscalYear } from '$components/forms/FormFiscalYear';

export const FiscalYear = () => {
    const companies = useRecoilValue(companiesState);
    useEffect(() => {
        if (companies?.selected) asyncCompanyFiscalYearsFetch(companies.selected.uuid);
    }, [companies]);

    return (
        <div>
            <FormFiscalYear />
        </div>
    );
};
