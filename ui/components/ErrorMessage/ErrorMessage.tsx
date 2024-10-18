import { theme } from '~/ui';

import { Text } from '../Text';

interface ErrorMessageProps {
  text: string;
  variant?: theme.TextVariant;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ text, variant = 'paragraph-default' }) => {
  return (
    <Text color="alert-error" variant={variant}>
      {text}
    </Text>
  );
};
