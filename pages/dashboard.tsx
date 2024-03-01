import { CenteredLoadingSpinner } from '~/components';
import { Tabs } from '~/components/Navbar/Tabs';
import { useSearch, useSelectedTabFilter } from '~/contexts';
import { useReviews } from '~/hooks';
import { Reviews, SideContainer } from '~/pages-components/dashboard';
import { FlexLayout, Only, Text } from '~/ui';
import { pluralize } from '~/utils';

export default function DashboardPage() {
  const { data: reviews, isLoading } = useReviews();

  const { search } = useSearch();
  const { selectedTabFilter } = useSelectedTabFilter();

  const filterReviews = () => {
    let filteredData = reviews?.data ?? [];

    if (selectedTabFilter === 'watch again') {
      filteredData = filteredData.filter((review) => review.watchAgain === true);
    }

    if (search !== '') {
      filteredData = filteredData.filter((review) => review.name.toLowerCase().includes(search.toLowerCase().trim()));
    }

    return {
      data: filteredData,
      totalRecords: reviews?.totalRecords ?? 0,
    };
  };

  const reviewsData = filterReviews();

  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      {reviewsData.totalRecords < 1 ? null : (
        <FlexLayout
          alignItems={['flex-start', 'center', 'unset']}
          data-testid="dashboard"
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          space={4}
        >
          <Only for="mobileAndTablet">
            <Tabs tabs={['All Reviews', 'Watch Again', 'Bucket List']} />
          </Only>
          <Text color="white-alpha-50" variant="paragraph-small">
            Showing {reviewsData.data.length} of {reviewsData.totalRecords}{' '}
            {pluralize('review', reviewsData.totalRecords)}.
          </Text>
        </FlexLayout>
      )}
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : (
        <FlexLayout space={5}>
          <Reviews data={reviewsData} />
          <Only for="desktop">
            <SideContainer />
          </Only>
        </FlexLayout>
      )}
    </FlexLayout>
  );
}
