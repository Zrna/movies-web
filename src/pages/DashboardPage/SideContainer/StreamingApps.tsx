import { StreamingApp } from '~/components';
import { FlexLayout, Text, theme } from '~/ui';

export const StreamingApps = () => {
  return (
    <FlexLayout
      flexDirection="column"
      p={5}
      space={5}
      sx={{ border: `2px solid ${theme.colors['light-dark']}`, borderRadius: '30px' }}
    >
      <Text variant="headline-h5">Streaming Apps</Text>
      <FlexLayout space={2}>
        <StreamingApp name="netflix" />
        <StreamingApp name="hbomax" />
        <StreamingApp name="disneyplus" />
        <StreamingApp name="appleTv" />
      </FlexLayout>
    </FlexLayout>
  );
};
