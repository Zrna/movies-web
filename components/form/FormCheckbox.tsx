import { FieldValidator } from 'final-form';
import { useField } from 'react-final-form';

import { Checkbox } from '~/ui';

export interface FormCheckboxProps extends Omit<React.ComponentProps<typeof Checkbox>, 'value' | 'onChange'> {
  name: string;
  validate?: FieldValidator<any>;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = (props) => {
  const { name, validate, ...rest } = props;
  const {
    input: { value, onChange },
  } = useField(name, { validate });

  return <Checkbox value={value} onChange={(value) => onChange({ target: { value } })} {...rest} />;
};
