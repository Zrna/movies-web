import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';

import { TextInput, TextInputProps } from '~/ui';

interface FormTextInputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  name: string;
  control: Control<any>;
  rules?: Pick<RegisterOptions<FieldValues>, 'maxLength' | 'minLength' | 'validate' | 'required'>;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ control, name, rules = {}, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        return (
          <TextInput
            error={error?.message}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={(value) => onChange({ target: { value } })}
            {...props}
          />
        );
      }}
      rules={rules}
    />
  );
};
