import { Base64Img } from '~/components';
import { useScreenType } from '~/ui';

interface HeaderImageProps {
  name: string;
  img: string | null;
}

export const HeaderImage: React.FC<HeaderImageProps> = ({ name, img }) => {
  const { isMobile, isDesktop } = useScreenType();

  return (
    <>
      <Base64Img
        alt={`${name} poster`}
        src={img}
        style={{
          width: isDesktop ? '1320px' : '100%',
          maxHeight: '580px',
          height: isMobile ? '420px' : 'auto',
          objectFit: 'none',
          borderRadius: '30px',
          filter: 'brightness(40%) blur(5px)',
        }}
      />
      <Base64Img
        alt={`${name} poster`}
        src={img}
        style={{
          width: '300px',
          height: '410px',
          objectFit: 'cover',
          borderRadius: '30px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};
