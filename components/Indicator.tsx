import { Box } from '~/ui';

const colorsMap = {
  green: 'alert-success',
  orange: 'alert-warning',
  red: 'alert-red',
  dimmed: 'dimmed',
};

export const Indicator = ({ color }: { color: 'green' | 'orange' | 'red' | 'dimmed' }) => {
  return (
    <Box
      sx={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: colorsMap[color],
      }}
    />
  );
};
