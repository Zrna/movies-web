import { HTMLInputTypeAttribute, useState } from 'react';

import { Box, FlexLayout, Icon, Text, theme, useScreenType } from '~/ui';

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
  isMini?: boolean;
  label?: string;
  labelColor?: theme.Color;
  width?: string;
  pattern?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
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
  isMini: isMiniInitial = false,
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
  const { isMobile } = useScreenType();

  const [isMini, setIsMini] = useState(isMiniInitial);
  const isTypeSearch = type === 'search';

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
    <FlexLayout
      flexDirection="column"
      space={2}
      sx={{ width: width ?? '100%' }}
      onOutsideClick={() => isMiniInitial && !isMini && !value && setIsMini(true)}
    >
      {label && (
        <Text as="label" color={error ? 'alert-error' : labelColor} variant="paragraph-default">
          {label}
        </Text>
      )}
      <FlexLayout
        alignItems="center"
        isDisabled={isDisabled}
        sx={{ height: ['40px', 'input-l-height', 'input-l-height'], position: 'relative' }}
      >
        {iconLeft ? (
          isMini ? (
            <Box
              sx={{
                border: `1px solid ${theme.colors['light-dark']}`,
                height: ['38px', '50px'],
                width: ['38px', '50px'],
                padding: 4,
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={() => setIsMini(!isMini)}
            >
              <Icon
                color={error ? 'alert-error' : 'dimmed'}
                icon={iconLeft}
                size={isMobile ? 'm' : 'l'}
                sx={{ position: 'absolute', top: [3, 4], bottom: [3, 4], left: [3, 3], zIndex: 3 }}
              />
            </Box>
          ) : (
            <Icon
              color={error ? 'alert-error' : isTypeSearch ? 'primary' : 'dimmed'}
              icon={iconLeft}
              size={isMobile ? 'm' : 'l'}
              sx={{ position: 'absolute', top: [3, 4], bottom: [3, 4], left: [3, 4], zIndex: 3 }}
            />
          )
        ) : null}
        {isMini ? null : (
          <>
            <Box
              as="input"
              bg={isTypeSearch ? 'black' : 'dark'}
              color="white"
              data-testid={dataTestId}
              pl={pl}
              placeholder={placeholder}
              pr={pr}
              py={0}
              sx={{
                border: error ? `1px solid ${theme.colors['alert-error']}` : `1px solid ${theme.colors['light-dark']}`,
                borderRadius: isTypeSearch ? '50px' : '8px',
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
                '::-webkit-search-decoration, ::-webkit-search-cancel-button': {
                  appearance: 'none',
                },
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
                size={isMobile ? 'm' : 'l'}
                sx={{ position: 'absolute', top: [3, 4], bottom: [3, 4], right: [3, 4], zIndex: 2 }}
                onClick={onClickRightIcon}
              />
            )}
          </>
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
