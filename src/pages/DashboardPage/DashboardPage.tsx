import { useState } from 'react';

import { CenteredLoadingSpinner } from '~/components';
import { useReviews } from '~/hooks';
import { FlexLayout } from '~/ui';

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
      <Filters
        activeLength={reviewsData.data.length}
        searchValue={searchValue}
        showOnlyWatchAgain={showOnlyWatchAgain}
        totalLength={reviewsData.totalRecords}
        onSearch={(value) => setSearchValue(value ?? '')}
        onShowOnlyWatchAgain={() => setShowOnlyWatchAgain(!showOnlyWatchAgain)}
      />
      {isLoading ? <CenteredLoadingSpinner /> : <Reviews data={reviewsData} />}
    </FlexLayout>
  );
};
