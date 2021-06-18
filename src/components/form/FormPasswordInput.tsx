import { useState } from 'react';
import { Field, useField } from 'react-final-form';

import { TextInput } from '~/ui';

import { FormFieldProps, getFieldError } from './utils';

export const FormPasswordInput: React.FC<FormFieldProps> = ({ name, label, validate }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { meta } = useField(name, { validate });
  const error = getFieldError(meta);

  return (
    <Field name={name} validate={validate}>
      {({ input: { name, value, onChange, onBlur, onFocus } }) => (
        <TextInput
          error={error}
          iconRight={showPassword ? 'eyeOff' : 'eye'}
          label={label}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onClickRightIcon={() => setShowPassword(!showPassword)}
          onFocus={onFocus}
        />
      )}
    </Field>
  );
};
