import { FlexLayout, Icon, Text, TextProps, theme } from '~/ui';

interface TextWithIconProps extends TextProps {
  iconColor?: theme.Color;
  iconLeft?: theme.Icon;
  iconRight?: theme.Icon;
  iconSize?: 'm' | 'l' | 'xl';
  text: string;
}

export const TextWithIcon: React.FC<TextWithIconProps> = ({
  color = 'white',
  iconColor,
  iconLeft,
  iconRight,
  iconSize = 'm',
  text,
  sx,
  variant = 'text-m',
}) => {
  return (
    <FlexLayout alignItems="center" space={2} sx={sx}>
      {iconLeft && <Icon color={iconColor ?? color} icon={iconLeft} size={iconSize} />}
      <FlexLayout flexDirection="column" space={1}>
        <Text color={color} variant={variant}>
          {text}
        </Text>
      </FlexLayout>
      {iconRight && <Icon color={iconColor ?? color} icon={iconRight} size={iconSize} />}
    </FlexLayout>
  );
};
