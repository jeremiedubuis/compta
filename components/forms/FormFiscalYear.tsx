import * as React from 'react';
import { FormFieldType, StyledFormFields } from './StyledFormField/StyledFormField';
import GenericForm from 'generic-form';
import { Button, ButtonTone } from '$components/buttons/Button/Button';
import { useState } from 'react';
import { ErrorMessage } from '$components/text/ErrorMessage';
import { useI18n } from '$hooks/useI18n';
import { useRecoilValue } from 'recoil';
import { companiesState } from '$atoms/companiesState';
import { asyncCompanyFiscalYearsCreate } from '$async/companyAsync';

export const FormFiscalYear: React.FC = () => {
    const [__] = useI18n();
    const [error, setError] = useState(null);
    const companies = useRecoilValue(companiesState);
    return (
        <GenericForm
            id="fiscal-year-form"
            onSubmit={async (e, data) => {
                e.preventDefault();
                try {
                    await asyncCompanyFiscalYearsCreate(companies.selected.uuid, data);
                } catch (e) {
                    setError(__(e.message));
                }
            }}
        >
            <StyledFormFields
                idPrefix="fiscal-year-form"
                fields={[
                    {
                        label: __('start'),
                        name: 'start',
                        id: 'start',
                        type: FormFieldType.Date
                    },
                    {
                        label: __('end'),
                        name: 'end',
                        id: 'end',
                        type: FormFieldType.Date
                    },
                    {
                        label: __('active'),
                        name: 'active',
                        id: 'active',
                        type: FormFieldType.Checkbox
                    }
                ]}
                formId="fiscal-year-form"
            />
            <Button tone={ButtonTone.Primary}>{__('signIn')}</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </GenericForm>
    );
};
