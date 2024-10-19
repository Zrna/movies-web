import { Textarea as ThemeTextarea } from 'theme-ui';

import { FlexLayout, Text, theme } from '~/ui';

export interface TextareaProps {
  error?: string;
  helperText?: string;
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
  helperText,
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
    <FlexLayout flexDirection="column" space={2}>
      {label && (
        <Text as="label" color={error ? 'alert-error' : labelColor} variant="paragraph-default">
          {label}
        </Text>
      )}
      <ThemeTextarea
        bg="dark"
        disabled={isDisabled}
        opacity={isDisabled ? 0.5 : 1}
        p={4}
        placeholder={placeholder}
        rows={rows}
        sx={{
          border: error ? `1px solid ${theme.colors['alert-error']}` : `1px solid ${theme.colors['light-dark']}`,
          borderRadius: '8px',
          outline: 'none',
          '::placeholder': {
            color: 'dimmed',
          },
          maxWidth: '100%',
          minWidth: '100%',
        }}
        value={value}
        variant="text.paragraph-default"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        {...rest}
      />
      {helperText && (
        <Text color="dimmed" variant="paragraph-small">
          {helperText}
        </Text>
      )}
      {error && <Text color="alert-error">{error}</Text>}
    </FlexLayout>
  );
};
