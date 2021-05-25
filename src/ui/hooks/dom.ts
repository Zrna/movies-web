// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useBreakpointIndex } from '@theme-ui/match-media';
import last from 'lodash/last';
import mapValues from 'lodash/mapValues';
import { useEffect, useState } from 'react';

export function useBpIndex() {
  const index = useBreakpointIndex();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return index;
}

const screenIndexMap = {
  isMobile: 0,
  isTablet: 1,
  isDesktop: 2,
};

export function useScreenType() {
  const bpIndex = useBpIndex();
  return mapValues(screenIndexMap, (screenIndex) => screenIndex === bpIndex);
}

export function useResponsiveSelector() {
  const bpIndex = useBpIndex();

  return <T>(...alternatives: T[]): T => {
    if (alternatives[bpIndex] === undefined) {
      return last(alternatives) as T;
    }

    return alternatives[bpIndex];
  };
}
