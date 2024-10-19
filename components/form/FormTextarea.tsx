import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';

import { Textarea, TextareaProps } from '~/ui';

interface FormTextAreaProps extends Omit<TextareaProps, 'value' | 'onChange'> {
  name: string;
  control: Control<any>;
  rules?: Pick<RegisterOptions<FieldValues>, 'maxLength' | 'minLength' | 'validate' | 'required'>;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ control, name, rules = {}, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        return (
          <Textarea
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
