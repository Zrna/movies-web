import { Image as ThemeImage, ThemeUIStyleObject } from 'theme-ui';

interface ImageProps {
  src: string;
  sx?: ThemeUIStyleObject;
}

export const Image: React.FC<ImageProps> = ({ src, sx }) => {
  return <ThemeImage src={src} sx={sx} />;
};
