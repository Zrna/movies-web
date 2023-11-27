import { Box, BoxProps, FlexLayout, Icon, LoadingSpinner, styles, Text, theme } from '~/ui';

const sizesMap = {
  s: {
    height: 'input-s-height',
    px: 2,
    space: 2,
    textVariant: 'label-button' as theme.TextVariant,
  },
  m: {
    height: 'input-m-height',
    px: 4,
    space: 2,
    textVariant: 'label-button' as theme.TextVariant,
  },
  l: {
    height: 'input-l-height',
    px: 5,
    space: 3,
    textVariant: 'label-button' as theme.TextVariant,
  },
};

const variantsMap = {
  primary: {
    bg: theme.colors.primary,
    color: 'white' as theme.Color,
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: '10px',
    activeStyles: {
      border: `1px solid ${theme.colors['green-800']}`,
      bg: 'green-800',
    },
    hoverStyles: {
      border: `1px solid ${theme.colors['green-800']}`,
      bg: 'green-800',
      color: 'white',
    },
    disabledStyles: {
      border: `1px solid ${theme.colors.dimmed}`,
      bg: 'dimmed',
      color: 'light-dark' as theme.Color,
    },
  },
  secondary: {
    bg: 'dark',
    color: 'primary' as theme.Color,
    border: `1px solid ${theme.colors.dark}`,
    borderRadius: '10px',
    activeStyles: {
      border: `1px solid ${theme.colors.dark}`,
      bg: 'dark',
    },
    hoverStyles: {
      border: `1px solid ${theme.colors.dark}`,
      bg: 'dark',
      color: 'green-100',
    },
    disabledStyles: {
      border: `1px solid ${theme.colors.dimmed}`,
      bg: 'dimmed',
      color: 'light-dark' as theme.Color,
    },
  },
  outlined: {
    bg: 'black',
    color: 'white' as theme.Color,
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: '10px',
    activeStyles: {
      bg: 'black',
      border: `1px solid ${theme.colors.primary}`,
      color: 'primary',
    },
    hoverStyles: {
      bg: 'black',
      border: `1px solid ${theme.colors.primary}`,
      color: 'primary',
    },
    disabledStyles: {
      border: `1px solid ${theme.colors.dimmed}`,
      bg: 'dimmed',
      color: 'light-dark' as theme.Color,
    },
  },
  'outlined-secondary': {
    bg: 'black',
    color: 'dimmed' as theme.Color,
    border: `1px solid ${theme.colors['light-dark']}`,
    borderRadius: '10px',
    activeStyles: {
      bg: 'black',
      border: `1px solid ${theme.colors['light-dark']}`,
      color: 'primary',
    },
    hoverStyles: {
      bg: 'black',
      border: `1px solid ${theme.colors['light-dark']}`,
      color: 'primary',
    },
    disabledStyles: {
      border: `1px solid ${theme.colors.dimmed}`,
      bg: 'dimmed',
      color: 'light-dark' as theme.Color,
    },
  },
};

export interface ButtonProps extends BoxProps {
  iconLeft?: theme.Icon;
  iconRight?: theme.Icon;
  isFullWidth?: boolean;
  isLoading?: boolean;
  size?: keyof typeof sizesMap;
  text: string;
  variant?: keyof typeof variantsMap;
}

export const Button: React.FC<ButtonProps> = ({
  as = 'button',
  iconLeft,
  iconRight,
  isDisabled = false,
  isFullWidth = false,
  isLoading = false,
  size = 'm',
  text,
  variant = 'primary',
  onClick,
  ...rest
}) => {
  const { height, px, space, textVariant } = sizesMap[size];
  const { bg, color, border, borderRadius, activeStyles, hoverStyles, disabledStyles } = variantsMap[variant];

  return (
    <Box
      as={as}
      isDisabled={isDisabled || isLoading}
      sx={{
        bg,
        border,
        borderRadius,
        color,
        display: as === 'a' ? 'flex' : 'initial',
        height,
        justifyContent: as === 'a' ? 'center' : 'initial',
        outline: 'none',
        position: 'relative',
        px,
        width: isFullWidth ? '100%' : 'fit-content',
        '&:hover': hoverStyles,
        '&:active': activeStyles,
        '&:disabled': isLoading ? {} : disabledStyles,
        '&:hover span': { color: hoverStyles.color },
        ...styles.interactions.clickable,
      }}
      onClick={onClick}
      {...rest}
    >
      <FlexLayout
        alignItems="center"
        justifyContent={isFullWidth ? 'center' : 'inherit'}
        space={space}
        sx={{
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        {iconLeft && <Icon icon={iconLeft} />}
        <Text variant={textVariant}>{text}</Text>
        {iconRight && <Icon icon={iconRight} />}
      </FlexLayout>
      {isLoading && (
        <FlexLayout
          alignItems="center"
          justifyContent="center"
          sx={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }}
        >
          <LoadingSpinner color={color} size={size === 's' ? 'm' : size} />
        </FlexLayout>
      )}
    </Box>
  );
};
