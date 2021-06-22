import { Textarea as ThemeTextarea } from 'theme-ui';

import { Text, theme } from '~/ui';

interface TextareaProps {
  error?: string;
  isDisabled?: boolean;
  label?: string;
  labelColor?: theme.Color;
  name?: string;
  placeholder?: string;
  rows?: number;
  value: string | undefined;
  onBlur?(): void;
  onChange(value: string): void;
  onFocus?(): void;
}

export const Textarea: React.FC<TextareaProps> = ({
  error,
  isDisabled = false,
  label,
  labelColor = 'white-alpha-75',
  placeholder = 'Type something...',
  rows = 8,
  value,
  onChange,
  ...rest
}) => {
  return (
    <>
      {label && (
        <Text as="label" color={labelColor} variant="text-m-bold">
          {label}
        </Text>
      )}
      <ThemeTextarea
        bg="gray-700"
        disabled={isDisabled}
        opacity={isDisabled ? 0.5 : 1}
        p={4}
        placeholder={placeholder}
        rows={rows}
        sx={{
          border: error ? `1px solid ${theme.colors['red-500']}` : 'none',
          borderRadius: 's',
          outline: 'none',
          '::placeholder': {
            color: 'white-alpha-50',
          },
          '&:hover': {
            backgroundColor: 'gray-600',
          },
          '&:focus-within': {
            backgroundColor: 'gray-500',
          },
          maxWidth: '100%',
          minWidth: '100%',
        }}
        value={value}
        variant="text.text-m"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        {...rest}
      />
      {error && (
        <Text color="red-500" variant="text-m-medium">
          {error}
        </Text>
      )}
    </>
  );
};
