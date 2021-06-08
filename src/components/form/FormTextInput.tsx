import { Field, FieldMetaState, useField } from 'react-final-form';

import { TextInput, TextInputProps } from '~/ui';

export interface FormTextInputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  name: string;
  type?: string;
  label?: string;
  validate?: any;
  value?: null;
  onChange?(): null;
}

export function getError(meta: FieldMetaState<any>) {
  if (meta.touched && meta.error) {
    return meta.error;
  }

  return meta.submitError;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ name, label, type = 'text', validate, ...rest }) => {
  // `value` and `onChange` from the `rest` are ignored,
  // because `<Field />` component has it's own `value` and `onChange`
  const { value: ignoredValue, onChange: ignoredOnChange, ...newRest } = rest;

  const { meta } = useField(name, { validate });
  const error = getError(meta);

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
