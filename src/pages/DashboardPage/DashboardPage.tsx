import { useState } from 'react';

import { TextWithIcon } from '~/components';
import { useReviews } from '~/hooks';
import { FlexLayout, Text, theme } from '~/ui';

import { Reviews } from './Reviews';

export const DashboardPage = () => {
  const { reviews, isLoading } = useReviews();
  const [isShowOnlyWatchAgain, setIsShowOnlyWatchAgain] = useState<boolean>(false);

  const onlyWatchAgainReviews = {
    data: reviews?.data.filter((data) => data.watchAgain === true) ?? [],
    totalRecords: reviews?.totalRecords ?? 0,
  };

  const reviewsData = isShowOnlyWatchAgain ? onlyWatchAgainReviews : reviews;

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <Text color="primary" variant="display-heading-m">
        Dashboard
      </Text>
      <TextWithIcon
        color={isShowOnlyWatchAgain ? 'green' : 'gray-500'}
        iconLeft="eye"
        sx={{
          border: `1px solid ${theme.colors[isShowOnlyWatchAgain ? 'green' : 'gray-500']}`,
          padding: 2,
          width: 'fit-content',
        }}
        text="Show only watch again"
        onClick={() => setIsShowOnlyWatchAgain(!isShowOnlyWatchAgain)}
      />
      <Reviews data={reviewsData} isLoading={isLoading} />
    </FlexLayout>
  );
};
