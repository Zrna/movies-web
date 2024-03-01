import { FlexLayout, Text, theme, useScreenType } from '~/ui';

interface SectionTitleProps {
  number: string;
  title: string;
}

export const Title: React.FC<SectionTitleProps> = ({ number, title }) => {
  const { isMobile } = useScreenType();

  return (
    <FlexLayout alignItems="center" space={4}>
      <FlexLayout
        alignItems="center"
        bg="black"
        justifyContent="center"
        sx={{
          width: ['40px', '60px'],
          height: ['40px', '60px'],
          border: `1px solid ${theme.colors['light-dark']}`,
          borderRadius: '50%',
        }}
      >
        <Text color="dimmed" variant={isMobile ? 'paragraph-default' : 'headline-h4'}>
          {number}
        </Text>
      </FlexLayout>
      <Text variant={isMobile ? 'paragraph-default' : 'headline-h5'}>{title}</Text>
    </FlexLayout>
  );
};
