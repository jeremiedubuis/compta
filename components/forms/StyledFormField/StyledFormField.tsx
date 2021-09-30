import styles from './StyledFormField.module.css';
import { GenericFormField } from 'generic-form';
import * as React from 'react';
import cn from 'classnames';

export type StyledFormFieldType = {
    formId?: string;
    className?: string;
    [key: string]: any;
};

export enum FormFieldType {
    Checkbox = 'checkbox',
    Date = 'date',
    Email = 'email',
    Hidden = 'hidden',
    Number = 'number',
    Password = 'password',
    Select = 'select',
    Text = 'text',
    Textarea = 'textarea'
}

export const StyledFormField: React.FC<StyledFormFieldType> = (props) => (
    <GenericFormField className={cn(props.className, styles.field)} {...props} />
);

export type StyledFormFieldsType = {
    formId?: string;
    fields: any[];
    idPrefix?: string;
};
export const StyledFormFields: React.FC<StyledFormFieldsType> = ({
    fields,
    formId,
    idPrefix = ''
}) => (
    <>
        {fields.map((f: any, i: number) => (
            <StyledFormField key={f.id || i} formId={formId} {...f} id={idPrefix + f.id} />
        ))}
    </>
);
