import { ButtonLink } from '~/components';
import { getFeatureFlags } from '~/services';
import { Button, FlexLayout, Text, theme } from '~/ui';

export const CreateReviewBox = () => {
  const { bucketList } = getFeatureFlags();

  return (
    <FlexLayout
      flexDirection="column"
      p={5}
      space={5}
      sx={{ border: `2px solid ${theme.colors['light-dark']}`, borderRadius: '30px' }}
    >
      <Text variant="headline-h4">Want to add something new?</Text>
      <Text color="dimmed">You can add watched movies and tv shows, or throw them in your bucket list.</Text>
      <FlexLayout flexDirection="column" space={4}>
        <ButtonLink isFullWidth text="Create New Review" to="/create-review" />
        <Button isDisabled={!bucketList} isFullWidth text="Add to Bucket List" variant="outlined" />
      </FlexLayout>
    </FlexLayout>
  );
};
