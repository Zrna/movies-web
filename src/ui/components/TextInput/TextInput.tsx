import { Box, FlexLayout, Icon, styles, Text, theme } from '~/ui';

const paddingMap = {
  both: ['52px', '52px'],
  left: ['52px', '4'],
  right: ['4', '52px'],
  default: ['4', '4'],
};

export interface TextInputProps {
  autoComplete?: string;
  error?: string;
  helperText?: string;
  name?: string;
  iconLeft?: theme.Icon;
  iconRight?: theme.Icon;
  isDisabled?: boolean;
  label?: string;
  labelColor?: theme.Color;
  width?: string;
  pattern?: string;
  placeholder?: string;
  type?: string;
  onFocus?(): void;
  onBlur?(): void;
  value: string;
  onChange(value: string): void;
  onClickRightIcon?(): void;
  id?: string;
  'data-testid'?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  error,
  helperText,
  iconLeft,
  iconRight,
  isDisabled = false,
  label,
  labelColor = 'dimmed',
  placeholder,
  type = 'text',
  value,
  width,
  onChange,
  onClickRightIcon,
  'data-testid': dataTestId,
  ...rest
}) => {
  let px = paddingMap.default;

  if (iconLeft && iconRight) {
    px = paddingMap['both'];
  } else if (iconLeft) {
    px = paddingMap['left'];
  } else if (iconRight) {
    px = paddingMap['right'];
  }

  const [pl, pr] = px;
  return (
    <FlexLayout flexDirection="column" space={2} sx={{ width: width ?? '100%' }}>
      {label && (
        <Text as="label" color={error ? 'alert-error' : labelColor} variant="paragraph-default">
          {label}
        </Text>
      )}
      <FlexLayout alignItems="center" isDisabled={isDisabled} sx={{ height: 'input-l-height', position: 'relative' }}>
        {iconLeft && (
          <Icon
            color={error ? 'alert-error' : 'dimmed'}
            icon={iconLeft}
            size="l"
            sx={{ position: 'absolute', top: 4, bottom: 4, left: 4, zIndex: 1 }}
          />
        )}
        <Box
          as="input"
          bg="dark"
          color="white"
          data-testid={dataTestId}
          pl={pl}
          placeholder={placeholder}
          pr={pr}
          py={0}
          sx={{
            ...styles.interactions.clickable,
            border: error ? `1px solid ${theme.colors['alert-error']}` : `1px solid ${theme.colors['light-dark']}`,
            borderRadius: '8px',
            caretColor: 'white',
            height: '100%',
            outline: 'none',
            variant: 'text.paragraph-default',
            width: '100%',
            zIndex: 2,
            '::placeholder': {
              color: 'dimmed',
            },
            ':-webkit-autofill': {
              WebkitTextFillColor: 'white',
              WebkitBoxShadow: '0 0 0 1000px #00000000 inset',
              transition: 'background-color 5000s ease-in-out 0s',
            } as any,
          }}
          type={type}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          {...rest}
        />
        {iconRight && (
          <Icon
            color={error ? 'alert-error' : 'dimmed'}
            icon={iconRight}
            size="l"
            sx={{ position: 'absolute', top: 4, bottom: 4, right: 4, zIndex: 2 }}
            onClick={onClickRightIcon}
          />
        )}
      </FlexLayout>
      {helperText && (
        <Text color="dimmed" variant="paragraph-small">
          {helperText}
        </Text>
      )}
      {error && (
        <Text color="alert-error" variant="paragraph-default">
          {error}
        </Text>
      )}
    </FlexLayout>
  );
};
