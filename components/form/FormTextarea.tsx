import { Field, useField } from 'react-final-form';

import { Textarea } from '~/ui';

import { FormFieldProps, getFieldError } from './utils';

export const FormTextarea: React.FC<FormFieldProps> = ({ name, label, validate, ...rest }) => {
  const { value: _ignoredValue, onChange: _ignoredOnChange, ...newRest } = rest;

  const { meta } = useField(name, { validate });
  const error = getFieldError(meta);

  return (
    <Field name={name} validate={validate}>
      {({ input: { name, value, onChange, onBlur, onFocus } }) => (
        <>
          <Textarea
            error={error}
            label={label}
            name={name}
            value={value}
            {...newRest}
            onBlur={onBlur}
            onChange={(value) => onChange({ target: { value } })}
            onFocus={onFocus}
          />
        </>
      )}
    </Field>
  );
};
