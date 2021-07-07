import { Review } from '~/api';
import { Base64Img } from '~/components';
import { FlexLayout } from '~/ui';
import defaultPoster from '~/ui/assets/images/default-poster.png';

interface ImageProps {
  alt: string;
  src: Review['img'];
}

export const Image: React.FC<ImageProps> = ({ alt, src }) => {
  return (
    <FlexLayout flexDirection="column" space={4} sx={{ width: ['100%', '350px'] }}>
      <Base64Img alt={alt} placeHolder={defaultPoster} src={src} />
    </FlexLayout>
  );
};
