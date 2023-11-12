import React from 'react';

import { GetReviews } from '~/api';
import { Box, FlexLayout, Text, useScreenType } from '~/ui';

import { ReviewCard } from './ReviewCard';

const ReviewsWrapper = (props: { columns: string; children: React.ReactNode }) => {
  const { columns, children } = props;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap: 5,
      }}
    >
      {children}
    </Box>
  );
};

export const Reviews = ({ data: reviews }: { data: GetReviews | undefined }) => {
  const { isMobile, isTablet, isDesktop } = useScreenType();

  if (!reviews || reviews.totalRecords === 0 || reviews.data.length === 0) {
    return <Text variant="paragraph-big">No reviews.</Text>;
  }

  const gridColumnsStyle = () => {
    let numberOfCards = 3;

    if (isTablet) {
      numberOfCards = 2;
    }

    if (isMobile) {
      numberOfCards = 1;
    }

    return `repeat(${numberOfCards}, 1fr)`;
  };

  return (
    <FlexLayout flexDirection="column" space={5} sx={{ maxWidth: '984px' }}>
      <ReviewsWrapper columns={`repeat(${isMobile ? '1' : '2'}, 1fr)`}>
        {reviews.data.slice(0, 2).map((review, i) => (
          <ReviewCard data={review} isBig={isDesktop && i === 0} key={review.id} />
        ))}
      </ReviewsWrapper>
      <ReviewsWrapper columns={gridColumnsStyle()}>
        {reviews.data.slice(2).map((review) => (
          <ReviewCard data={review} key={review.id} />
        ))}
      </ReviewsWrapper>
    </FlexLayout>
  );
};
