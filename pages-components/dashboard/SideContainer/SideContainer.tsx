import { FlexLayout } from '~/ui';

import { CreateReviewBox } from './CreateReviewBox';
import { Recommendation } from './Recommendation';
import { StreamingApps } from './StreamingApps';

export const SideContainer = () => {
  return (
    <FlexLayout flexDirection="column" space={5} sx={{ maxWidth: '312px' }}>
      <CreateReviewBox />
      <StreamingApps />
      <Recommendation />
    </FlexLayout>
  );
};
