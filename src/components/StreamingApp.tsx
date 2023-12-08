import hbomax from '~/ui/assets/icons/hbo-max.svg';
import netflixImg from '~/ui/assets/icons/netflix.svg';

const streamingAppsMap = {
  netflix: {
    link: 'https://www.netflix.com/',
    img: netflixImg,
  },
  hbomax: {
    link: 'https://play.hbomax.com/',
    img: hbomax,
  },
};

export const StreamingApp = ({ name }: { name: keyof typeof streamingAppsMap }) => {
  const app = streamingAppsMap[name] ?? null;

  if (!app) {
    return null;
  }

  return (
    <a href={app.link} rel="noreferrer" target="_blank">
      <img
        alt="Streaming App Logo"
        src={app.img}
        style={{
          width: '48px',
          height: '48px',
        }}
      />
    </a>
  );
};
