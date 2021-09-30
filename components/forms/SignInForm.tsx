import * as React from 'react';
import { FormFieldType, StyledFormFields } from './StyledFormField/StyledFormField';
import GenericForm from 'generic-form';
import { Button, ButtonTone } from '$components/buttons/Button/Button';
import { asyncSignIn } from '$async/userAsync';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { ErrorMessage } from '$components/text/ErrorMessage';
import { useRouter } from 'next/router';
import { userState } from '$atoms/userState';
import { useI18n } from '$hooks/useI18n';

export const SignInForm: React.FC = () => {
    const [__] = useI18n();
    const setUser = useSetRecoilState(userState);
    const router = useRouter();
    const [error, setError] = useState(null);
    return (
        <GenericForm
            id="sign-in-form"
            onSubmit={async (e, data) => {
                e.preventDefault();
                try {
                    const user = await asyncSignIn(data);
                    setUser(user);
                    router.push('/app');
                } catch (e) {
                    setError(__(e.message));
                }
            }}
        >
            <StyledFormFields
                idPrefix="sign-in-form"
                fields={[
                    {
                        label: __('email'),
                        name: 'email',
                        id: 'email',
                        type: FormFieldType.Email
                    },
                    {
                        label: __('password'),
                        name: 'password',
                        id: 'password',
                        type: FormFieldType.Password
                    }
                ]}
                formId="sign-in-form"
            />
            <Button tone={ButtonTone.Primary}>{__('signIn')}</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </GenericForm>
    );
};
