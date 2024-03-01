import { theme } from '~/ui';

export const reactionsMap: { [key: number]: { icon: theme.Icon; text: string } } = {
  0: { icon: 'reaction0', text: 'No comment' },
  1: { icon: 'reaction1', text: "I wish I hadn't watched" },
  2: { icon: 'reaction2', text: 'Boring' },
  3: { icon: 'reaction3', text: 'Not great, not terrible' },
  4: { icon: 'reaction4', text: "It's great" },
  5: { icon: 'reaction5', text: 'Loving it!' },
};
