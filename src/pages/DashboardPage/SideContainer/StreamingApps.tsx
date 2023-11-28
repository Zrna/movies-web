import { FlexLayout, Text, theme } from '~/ui';
import hboMax from '~/ui/assets/icons/hbo-max.svg';
import netflix from '~/ui/assets/icons/netflix.svg';

const StreamingApp = ({ img, link }: { img: string; link: string }) => {
  return (
    <a href={link} rel="noreferrer" target="_blank">
      <img
        alt="Streaming App Logo"
        src={img}
        style={{
          width: '48px',
          height: '48px',
        }}
      />
    </a>
  );
};

export const StreamingApps = () => {
  return (
    <FlexLayout
      flexDirection="column"
      p={5}
      space={5}
      sx={{ border: `2px solid ${theme.colors['light-dark']}`, borderRadius: '30px' }}
    >
      <Text variant="headline-h5">Your Streaming Apps</Text>
      <FlexLayout space={2}>
        <StreamingApp img={netflix} link="https://www.netflix.com/" />
        <StreamingApp img={hboMax} link="https://play.hbomax.com/" />
      </FlexLayout>
    </FlexLayout>
  );
};
