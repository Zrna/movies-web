import { theme } from '~/ui';

import { Box } from '../Box';

interface DividerProps {
  color?: theme.Color;
}

export const Divider: React.FC<DividerProps> = ({ color = 'gray-600' }) => {
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
