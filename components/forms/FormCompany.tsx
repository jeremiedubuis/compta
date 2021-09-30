import * as React from 'react';
import { FormFieldType, StyledFormFields } from './StyledFormField/StyledFormField';
import GenericForm from 'generic-form';
import { Button, ButtonTone } from '$components/buttons/Button/Button';
import { asyncSignIn } from '$async/userAsync';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '$components/text/ErrorMessage';
import { useRouter } from 'next/router';
import { userState } from '$atoms/userState';
import { useI18n } from '$hooks/useI18n';
import { asyncCompanyCreate, asyncCompanyTypesFetch } from '$async/companyAsync';
import { companiesState } from '$atoms/companiesState';

export const FormCompany: React.FC = () => {
    const [__] = useI18n();
    const [types, setTypes] = useState([]);
    const setUser = useSetRecoilState(userState);
    const [companies, setCompanies] = useRecoilState(companiesState);
    const router = useRouter();
    const [error, setError] = useState(null);

    useEffect(() => {
        asyncCompanyTypesFetch().then((t) => {
            setTypes(t);
        });
    }, []);
    return (
        <GenericForm
            id="company-form"
            onSubmit={async (e, data) => {
                e.preventDefault();
                try {
                    const { uuid } = await asyncCompanyCreate(data.name, data.type);
                    const company = {
                        ...data,
                        uuid
                    };
                    setCompanies({
                        list: [...companies.list, company],
                        selected: company
                    });
                } catch (e) {
                    setError(__(e.message));
                }
            }}
        >
            <StyledFormFields
                idPrefix="company-form"
                fields={[
                    {
                        label: __('name'),
                        name: 'name',
                        id: 'name',
                        type: FormFieldType.Text
                    },
                    {
                        label: __('type'),
                        name: 'type',
                        id: 'type',
                        type: FormFieldType.Select,
                        options: types.map((t) => ({
                            label: t.name,
                            value: t.name
                        }))
                    }
                ]}
                formId="company-form"
            />
            <Button tone={ButtonTone.Primary}>{__('signIn')}</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </GenericForm>
    );
};
