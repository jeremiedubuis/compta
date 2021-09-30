import * as React from 'react';
import { FormFieldType, StyledFormFields } from './StyledFormField/StyledFormField';
import GenericForm from 'generic-form';
import { Button, ButtonTone } from 'components/buttons/Button/Button';
import { asyncSignUp } from '$async/userAsync';
import { useSetRecoilState } from 'recoil';
import { userState } from '$atoms/userState';
import { useState } from 'react';
import { ErrorMessage } from 'components/text/ErrorMessage';
import { useRouter } from 'next/router';
import { useI18n } from '$hooks/useI18n';

export const SignUpForm: React.FC = () => {
    const [__] = useI18n();
    const setUser = useSetRecoilState(userState);
    const router = useRouter();
    const [error, setError] = useState(null);
    return (
        <GenericForm
            id="sign-up-form"
            onSubmit={async (e, { passwordConfirm, ...data }: any) => {
                setError(null);
                e.preventDefault();
                try {
                    const user = await asyncSignUp(data);
                    setUser(user);
                    router.push('/');
                } catch (e) {
                    console.log(e.message);
                    setError(__(e.message));
                }
            }}
        >
            <StyledFormFields
                formId="sign-up-form"
                idPrefix="sign-up-form"
                fields={[
                    {
                        name: 'email',
                        label: __('email'),
                        id: 'email',
                        type: FormFieldType.Email,
                        validation: {
                            mandatory: true
                        }
                    },
                    {
                        label: __('password'),
                        name: 'password',
                        id: 'password',
                        minlength: 7,
                        type: FormFieldType.Password,
                        validation: {
                            identicalGroup: 'password',
                            mandatory: true
                        }
                    },
                    {
                        label: __('passwordConfirmation'),
                        name: 'passwordConfirm',
                        id: 'password-confirm',
                        minlength: 7,
                        type: FormFieldType.Password,
                        validation: {
                            identicalGroup: 'password',
                            errorIdenticalGroup: 'These fields must be identical',
                            mandatory: true
                        }
                    },
                    {
                        label: __('firstname'),
                        name: 'firstname',
                        id: 'firstname',
                        type: FormFieldType.Text,
                        validation: {
                            mandatory: true
                        }
                    },
                    {
                        label: __('lastname'),
                        name: 'lastname',
                        id: 'lastname',
                        type: FormFieldType.Text,
                        validation: {
                            mandatory: true
                        }
                    }
                ]}
            />
            <Button tone={ButtonTone.Primary}>{__('signUp')}</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </GenericForm>
    );
};
