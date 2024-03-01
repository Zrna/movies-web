import { Box, theme } from '~/ui';

export const Modal = ({ isVisible, children }: any) => {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        backgroundColor: theme.colors['black-alpha-75'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: theme.colors.dark,
          width: ['100%', '100%', '640px'],
          margin: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
