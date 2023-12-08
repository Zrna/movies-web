import capitalize from 'lodash/capitalize';

import { FlexLayout, Text, useScreenType } from '~/ui';
import hbomax from '~/ui/assets/icons/hbo-max.svg';
import netflixImg from '~/ui/assets/icons/netflix.svg';
import { addUrlProtocol } from '~/utils';

const streamingAppsMap: { [key: string]: { link: string; img: string } } = {
  netflix: {
    link: 'https://www.netflix.com/',
    img: netflixImg,
  },
  hbomax: {
    link: 'https://play.hbomax.com/',
    img: hbomax,
  },
};

interface StreamingAppProps {
  name: string | null | undefined;
  link?: string | null | undefined;
  showName?: boolean;
}

export const StreamingApp: React.FC<StreamingAppProps> = ({ name, link, showName = false }) => {
  const { isMobile } = useScreenType();

  if (!name) {
    return null;
  }

  const app = streamingAppsMap[name];

  if (app) {
    return (
      <a href={link ? addUrlProtocol(link) : app.link} rel="noreferrer" target="_blank">
        <FlexLayout alignItems="center" space={4}>
          <img
            alt="Streaming App Logo"
            src={app.img}
            style={{
              width: isMobile ? '32px' : '48px',
              height: isMobile ? '32px' : '48px',
            }}
          />
          {showName && <Text variant="paragraph-default">{capitalize(name)}</Text>}
        </FlexLayout>
      </a>
    );
  }

  if (name && showName) {
    return (
      <a href={link ? addUrlProtocol(link) : ''} rel="noreferrer" target="_blank">
        <Text variant="paragraph-default">{capitalize(name)}</Text>
      </a>
    );
  }

  return null;
};
