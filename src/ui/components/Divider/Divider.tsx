import { theme } from '~/ui';

import { Box } from '../Box';

interface DividerProps {
  color?: theme.Color;
}

export const Divider: React.FC<DividerProps> = ({ color = 'dark' }) => {
  return (
    <Box
      bg={color}
      sx={{
        height: '1px',
        width: '100%',
      }}
    />
  );
};
