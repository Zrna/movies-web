import capitalize from 'lodash/capitalize';

import { FlexLayout, Image, Text, theme, useScreenType } from '~/ui';
import { addUrlProtocol } from '~/utils';

const streamingAppsMap: { [key: string]: { link: string; img: string; showBorder: boolean } } = {
  netflix: {
    link: 'https://www.netflix.com/',
    img: '/assets/images/netflix.svg',
    showBorder: false,
  },
  hbomax: {
    link: 'https://play.hbomax.com/',
    img: '/assets/images/hbo-max.svg',
    showBorder: false,
  },
  disneyplus: {
    link: 'https://www.disneyplus.com',
    img: '/assets/images/disneyplus.svg',
    showBorder: true,
  },
  appleTv: {
    link: 'https://tv.apple.com/',
    img: '/assets/images/apple-tv.svg',
    showBorder: true,
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
          <Image
            src={app.img}
            sx={{
              width: isMobile ? '32px' : '48px',
              height: isMobile ? '32px' : '48px',
              border: app.showBorder ? `1px solid ${theme.colors['light-dark']}` : 'none',
              borderRadius: app.showBorder ? '50%' : 'none',
              padding: app.showBorder ? '4px' : '0',
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
