import { useScreenType } from '~/ui';

const reverseScreenMap = {
  mobile: 'isMobile',
  tablet: 'isTablet',
  desktop: 'isDesktop',
};

type ScreenType = keyof typeof reverseScreenMap;

interface OnlyProps {
  children: any;
  for: 'mobile' | 'tablet' | 'desktop' | 'mobileAndTablet' | 'mobileAndDesktop' | 'tabletAndDesktop';
}

export const Only: React.FC<OnlyProps> = (props) => {
  const allowedScreens = props.for.toLocaleLowerCase().split('and') as ScreenType[];
  const screenTypesMap = useScreenType();

  for (const allowedScreen of allowedScreens) {
    const screenTypeKey = reverseScreenMap[allowedScreen] as 'isMobile' | 'isTablet' | 'isDesktop';

    if (screenTypesMap[screenTypeKey]) {
      return props.children;
    }
  }

  return null;
};
