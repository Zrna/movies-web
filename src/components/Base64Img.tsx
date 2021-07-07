interface Base64ImgProps {
  alt?: string;
  src: string | null | undefined;
  placeHolder?: string;
  style?: any;
}

export const Base64Img: React.FC<Base64ImgProps> = ({ alt = '', placeHolder, src, style = {} }) => {
  return <img alt={alt} src={src ? `data:image/jpeg;base64,${src}` : placeHolder} style={style} />;
};
