import { Box, BoxProps, FlexLayout, Icon, styles, Text, theme } from '~/ui';

const sizesMap = {
  m: {
    height: 'input-m-height',
    px: 4,
    space: 2,
    textVariant: 'text-l' as theme.TextVariant,
  },
  l: {
    height: 'input-l-height',
    px: 5,
    space: 3,
    textVariant: 'text-xl' as theme.TextVariant,
  },
};

const variantsMap = {
  primary: {
    bg: 'gray-500',
    color: 'white' as theme.Color,
    activeStyles: {
      bg: 'gray-700',
    },
    hoverStyles: {
      bg: 'gray-600',
    },
  },
  secondary: {
    bg: 'white',
    color: 'black' as theme.Color,
    activeStyles: {
      bg: 'gray-300',
    },
    hoverStyles: {
      bg: 'gray-200',
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
  const { bg, color, activeStyles, hoverStyles } = variantsMap[variant];

  return (
    <Box
      as={as}
      isDisabled={isDisabled || isLoading}
      sx={{
        bg,
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
          Loading...
        </FlexLayout>
      )}
    </Box>
  );
};
