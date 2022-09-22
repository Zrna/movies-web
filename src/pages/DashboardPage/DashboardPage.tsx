import { useState } from 'react';

import { CenteredLoadingSpinner } from '~/components';
import { useReviews } from '~/hooks';
import { Box, FlexLayout, Text, TextInput, theme } from '~/ui';

import { Filters } from './Filters';
import { Reviews } from './Reviews';

export const DashboardPage = () => {
  const { data: reviews, isLoading } = useReviews();
  const [showOnlyWatchAgain, setShowOnlyWatchAgain] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filterReviews = () => {
    let filteredData = reviews?.data ?? [];

    if (showOnlyWatchAgain) {
      filteredData = filteredData.filter((review) => review.watchAgain === true);
    }

    if (searchValue) {
      filteredData = filteredData.filter((review) =>
        review.name.toLowerCase().includes(searchValue.toLowerCase().trim()),
      );
    }

    return {
      data: filteredData,
      totalRecords: reviews?.totalRecords ?? 0,
    };
  };

  const reviewsData = filterReviews();

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <FlexLayout data-testid="dashboard" flexDirection={['column', 'row']} justifyContent="space-between">
        <Text color="primary" variant="display-heading-m">
          Dashboard
        </Text>
        <Box
          sx={{
            'div > div, div > div:hover, div > div:focus-within, div > div:active': {
              backgroundColor: 'transparent',
            },
            border: `1px solid ${theme.colors['gray-700']}`,
          }}
        >
          <TextInput
            iconLeft="search"
            iconRight={searchValue ? 'close' : undefined}
            placeholder="Search review..."
            value={searchValue}
            onChange={setSearchValue}
            onClickRightIcon={() => setSearchValue('')}
          />
        </Box>
      </FlexLayout>
      <Filters
        activeLength={reviewsData.data.length}
        showOnlyWatchAgain={showOnlyWatchAgain}
        totalLength={reviewsData.totalRecords}
        onShowWatchAgain={() => setShowOnlyWatchAgain(!showOnlyWatchAgain)}
      />
      {isLoading ? <CenteredLoadingSpinner /> : <Reviews data={reviewsData} />}
    </FlexLayout>
  );
};
