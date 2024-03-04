import { ButtonLink } from '~/components';
import { Box, FlexLayout, Text } from '~/ui';

export default function HomePage() {
  return (
    <FlexLayout alignItems="center" flexDirection="column" space={5} sx={{ marginTop: '30dvh' }}>
      <Box sx={{ width: '110px' }}>
        <ButtonLink isFullWidth text="Login" to="/login" variant="outlined" />
      </Box>
      <Text color="white">or</Text>
      <Box sx={{ width: '110px' }}>
        <ButtonLink isFullWidth text="Register" to="/register" variant="outlined" />
      </Box>
    </FlexLayout>
  );
}
