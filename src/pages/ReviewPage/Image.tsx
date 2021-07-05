import { Review } from '~/api';
import { FlexLayout } from '~/ui';

interface ImageProps {
  src: Review['image'];
}

export const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <FlexLayout flexDirection="column" space={4} sx={{ width: ['100%', '350px'] }}>
      <img alt="Poster" src={src ?? 'https://via.placeholder.com/350x500'} />
    </FlexLayout>
  );
};
