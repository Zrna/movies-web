import { Field, useField } from 'react-final-form';

import { Textarea } from '~/ui';

import { FormTextInputProps, getError } from './FormTextInput';

export const FormTextarea: React.FC<FormTextInputProps> = ({ name, label, validate, ...rest }) => {
  const { value: ignoredValue, onChange: ignoredOnChange, ...newRest } = rest;

  const { meta } = useField(name, { validate });
  const error = getError(meta);

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