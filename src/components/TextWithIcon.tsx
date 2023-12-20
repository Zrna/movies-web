import { FlexLayout, Icon, Text, TextProps, theme } from '~/ui';

interface TextWithIconProps extends TextProps {
  iconColor?: theme.Color;
  iconLeft?: theme.Icon;
  iconRight?: theme.Icon;
  iconSize?: 'm' | 'l' | 'xl';
  iconTitle?: string;
  text: string;
  space?: number;
  onClick?(): void;
}

export const TextWithIcon: React.FC<TextWithIconProps> = ({
  color = 'white',
  iconColor,
  iconLeft,
  iconRight,
  iconSize = 'm',
  iconTitle,
  text,
  sx,
  space = 2,
  variant = 'paragraph-default',
  onClick,
}) => {
  return (
    <FlexLayout alignItems="center" space={space} sx={sx} onClick={onClick}>
      {iconLeft && <Icon color={iconColor ?? color} icon={iconLeft} size={iconSize} title={iconTitle} />}
      <Text color={color} sx={{ height: iconSize === 'm' ? '20px' : 'initial' }} variant={variant}>
        {text}
      </Text>
      {iconRight && <Icon color={iconColor ?? color} icon={iconRight} size={iconSize} title={iconTitle} />}
    </FlexLayout>
  );
};
