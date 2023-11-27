import { Button, FlexLayout, Text, theme } from '~/ui';
import cow from '~/ui/assets/images/cow.svg';

export const Recommendation = () => {
  // TODO: add the recommendation on the mobile and tablet
  return (
    <FlexLayout
      flexDirection="column"
      p={5}
      space={7}
      sx={{ border: `2px solid ${theme.colors['light-dark']}`, borderRadius: '30px' }}
    >
      <FlexLayout flexDirection="column" space={5}>
        <Text variant="headline-h4">
          Have you heard about cow that loves <strong>moovies?</strong>
        </Text>
        <Text color="dimmed">Well, she exists and we got her to recommend you movies and tv shows.</Text>
        <Button text="Give it a try!" variant="outlined" />
      </FlexLayout>
      <img alt="Magic cow" src={cow} />
    </FlexLayout>
  );
};
