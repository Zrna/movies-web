import startCase from 'lodash/startCase';

import { Badge, Base64Img, CenteredLoadingSpinner } from '~/components';
import { useRecommendation } from '~/hooks';
import { Button, FlexLayout, Image, Text, theme, useModal } from '~/ui';

export const Recommendation = () => {
  // TODO: add the recommendation on the mobile and tablet

  const { data: recommendation, isLoading, refetch, isRefetching } = useRecommendation({ enabled: false });

  const [modal, showModal] = useModal({
    title: isLoading || isRefetching ? '' : startCase(recommendation?.name),
    content:
      isLoading || isRefetching ? (
        <CenteredLoadingSpinner />
      ) : (
        <FlexLayout flexDirection="column" space={5}>
          <FlexLayout flexDirection="row" space={2}>
            <Badge text={recommendation?.type || ''} />
            {recommendation?.genre.map((g) => (
              <Badge text={g} />
            ))}
          </FlexLayout>
          <Base64Img src={recommendation?.img} style={{ height: '400px', objectFit: 'contain' }} />
          <Button iconLeft="reload" text="Give me something else" variant="secondary" onClick={refetch} />
        </FlexLayout>
      ),
    actionButton: {
      text: 'Save to Bucket List',
      variant: 'outlined-secondary',
      action: () => Promise.resolve(),
    },
  });

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
        <Button
          text="Give it a try!"
          variant="outlined"
          onClick={() => {
            !recommendation && refetch();
            showModal();
          }}
        />
      </FlexLayout>
      <Image src="/assets/images/cow.svg" />
      {modal}
    </FlexLayout>
  );
};
