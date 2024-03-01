import { Image } from '~/ui';

interface Base64ImgProps {
  alt?: string;
  src: string | null | undefined;
  placeHolder?: string;
  style?: any;
}

export const Base64Img: React.FC<Base64ImgProps> = ({
  placeHolder = '/assets/images/default-poster.png',
  src,
  style = {},
}) => {
  return <Image src={src ? `data:image/jpeg;base64,${src}` : placeHolder} sx={style} />;
};
