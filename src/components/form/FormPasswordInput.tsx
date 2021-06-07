import { useState } from 'react';
import { Field } from 'react-final-form';

import { TextInput } from '~/ui';

import { FormTextInputProps } from './FormTextInput';

export const FormPasswordInput: React.FC<FormTextInputProps> = ({ name, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={name}>
      {({ input: { name, value, onChange } }) => (
        <TextInput
          iconRight={showPassword ? 'eyeOff' : 'eye'}
          label={label}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onClickRightIcon={() => setShowPassword(!showPassword)}
        />
      )}
    </Field>
  );
};
