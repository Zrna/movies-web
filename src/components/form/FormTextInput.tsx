import { Field } from 'react-final-form';

import { TextInput, TextInputProps } from '~/ui';

export interface FormTextInputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  name: string;
  type?: string;
  label?: string;
  value?: null;
  onChange?(): null;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ name, label, type = 'text', ...rest }) => {
  // `value` and `onChange` from the `rest` are ignored,
  // because `<Field />` component has it's own `value` and `onChange`
  const { value: ignoredValue, onChange: ignoredOnChange, ...newRest } = rest;

  return (
    <Field name={name}>
      {({ input: { name, value, onChange } }) => (
        <TextInput label={label} name={name} type={type} value={value} onChange={onChange} {...newRest} />
      )}
    </Field>
  );
};
