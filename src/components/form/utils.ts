import { FieldMetaState } from 'react-final-form';

import { TextInputProps } from '~/ui';

export interface FormFieldProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  name: string;
  type?: string;
  label?: string;
  validate?: any;
  value?: null;
  onChange?(): null;
}

export function getFieldError(meta: FieldMetaState<any>) {
  if (meta.touched && meta.error) {
    return meta.error;
  }

  return meta.submitError;
}
