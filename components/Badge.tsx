import { Box, Text } from '~/ui';

export const Badge = ({ text }: { text: string }) => (
  <Box bg="light-dark" key={text} px={2} py={1} sx={{ borderRadius: '10px' }}>
    <Text variant="paragraph-default">{text}</Text>
  </Box>
);
