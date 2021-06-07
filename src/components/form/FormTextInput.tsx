import { Field } from 'react-final-form';

import { TextInput } from '~/ui';

export interface FormTextInputProps {
  name: string;
  type?: string;
  label?: string;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ name, label, type = 'text' }) => {
  return (
    <Field name={name}>
      {({ input: { name, value, onChange } }) => (
        <TextInput label={label} name={name} type={type} value={value} onChange={onChange} />
      )}
    </Field>
  );
};
