import { theme } from '~/ui';

import { Text } from '../Text';

interface ErrorMessageProps {
  text: string;
  variant?: theme.TextVariant;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ text, variant = 'paragraph-big' }) => {
  return (
    <Text color="red-500" variant={variant}>
      {text}
    </Text>
  );
};
