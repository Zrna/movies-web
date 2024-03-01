import React from 'react';

import { GetReviews } from '~/api';
import { Box, FlexLayout, Only, Text, useScreenType } from '~/ui';

import { ReviewCard } from './ReviewCard';
import { CreateReviewBox } from './SideContainer/CreateReviewBox';

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
    return (
      <FlexLayout
        flexDirection={['column', 'column', 'row']}
        justifyContent="center"
        space={6}
        sx={{ width: ['100%', '100%', '924px'] }}
      >
        <Text variant="headline-h4">No reviews.</Text>
        <Only for="mobileAndTablet">
          <CreateReviewBox />
        </Only>
      </FlexLayout>
    );
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
      <Only for="mobileAndTablet">
        <CreateReviewBox />
      </Only>
      <ReviewsWrapper columns={gridColumnsStyle()}>
        {reviews.data.slice(2).map((review, i) => (
          <React.Fragment key={review.id}>
            {(i + 1) % 4 === 0 && (
              <Only for="mobileAndTablet">
                <CreateReviewBox />
              </Only>
            )}
            <ReviewCard data={review} />
          </React.Fragment>
        ))}
      </ReviewsWrapper>
    </FlexLayout>
  );
};
