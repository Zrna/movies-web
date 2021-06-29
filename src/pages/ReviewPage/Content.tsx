import { Review } from '~/api';
import { RatingStars } from '~/components';
import { FlexLayout } from '~/ui';
import { splitStringToNewLine } from '~/utils';

import { ContentItem } from './ContentItem';

interface ContentProps {
  data: Review;
}

export const Content: React.FC<ContentProps> = ({ data }) => {
  const { rating, review, url, watchAgain } = data;

  return (
    <FlexLayout flexDirection="column" space={4}>
      <ContentItem text="Rating" value={<RatingStars isReadOnly rating={rating} />} />
      <ContentItem
        text="URL"
        value={
          url ? (
            <a href={url} rel="noreferrer" target="_blank">
              {url}
            </a>
          ) : (
            'N/A'
          )
        }
      />
      <ContentItem text="Would watch again or recommend?" value={watchAgain ? 'Yes' : 'No'} />
      <ContentItem text="Review" value={splitStringToNewLine(review)} />
    </FlexLayout>
  );
};
