import { Review } from '~/api';
import { FlexLayout } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';

interface ImageProps {
  src: Review['img'];
}

export const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <FlexLayout flexDirection="column" space={4} sx={{ width: ['100%', '350px'] }}>
      <img alt="Poster" src={src ? src : defaultPoster} />
    </FlexLayout>
  );
};
