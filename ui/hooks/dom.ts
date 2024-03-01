import { useBreakpointIndex } from '@theme-ui/match-media';
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
