import { useState } from 'react';

import { CenteredLoadingSpinner } from '~/components';
import { useReviews } from '~/hooks';
import { FlexLayout, Text } from '~/ui';

import { Reviews } from './Reviews';
import { SearchAndFilters } from './SearchAndFilters';

export const DashboardPage = () => {
  const { data: reviews, isLoading } = useReviews();
  const [isShowOnlyWatchAgain, setIsShowOnlyWatchAgain] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filterReviews = () => {
    let filteredData = reviews?.data ?? [];

    if (isShowOnlyWatchAgain) {
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
      <Text color="primary" variant="display-heading-m">
        Dashboard
      </Text>
      <SearchAndFilters
        activeLength={reviewsData.data.length}
        isShowOnlyWatchAgain={isShowOnlyWatchAgain}
        searchValue={searchValue}
        totalLength={reviewsData.totalRecords}
        onSearch={setSearchValue}
        onShowWatchAgain={() => setIsShowOnlyWatchAgain(!isShowOnlyWatchAgain)}
      />
      {isLoading ? <CenteredLoadingSpinner /> : <Reviews data={reviewsData} />}
    </FlexLayout>
  );
};
