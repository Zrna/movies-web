import { FlexLayout, Text, theme } from '~/ui';
import hboMax from '~/ui/assets/icons/hbo-max.svg';
import netflix from '~/ui/assets/icons/netflix.svg';

const platformLogoStyle = {
  width: '48px',
  height: '48px',
};

export const StreamingApps = () => {
  return (
    <FlexLayout
      flexDirection="column"
      p={5}
      space={5}
      sx={{ border: `2px solid ${theme.colors['light-dark']}`, borderRadius: '30px' }}
    >
      <Text variant="headline-h5">Your Streaming Apps</Text>
      <FlexLayout space={2}>
        <img alt="Netflix Logo" src={netflix} style={platformLogoStyle} />
        <img alt="HBO Max Logo" src={hboMax} style={platformLogoStyle} />
      </FlexLayout>
    </FlexLayout>
  );
};
