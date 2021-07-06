import { Field, useField } from 'react-final-form';

import { TextInput } from '~/ui';

import { FormFieldProps, getFieldError } from './utils';

export const FormTextInput: React.FC<FormFieldProps> = ({ name, label, type = 'text', validate, ...rest }) => {
  // `value` and `onChange` from the `rest` are ignored,
  // because `<Field />` component has it's own `value` and `onChange`
  const { value: _ignoredValue, onChange: _ignoredOnChange, ...newRest } = rest;

  const { meta } = useField(name, { validate });
  const error = getFieldError(meta);

  return (
    <Field name={name} validate={validate}>
      {({ input: { name, value, onChange, onBlur, onFocus } }) => (
        <TextInput
          error={error}
          label={label}
          name={name}
          type={type}
          value={value}
          onChange={(value) => onChange({ target: { value } })}
          {...newRest}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      )}
    </Field>
  );
};
