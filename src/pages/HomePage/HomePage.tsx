import { Redirect } from 'react-router';

import { ButtonLink } from '~/components';
import { useAccessToken } from '~/hooks';
import { Box, FlexLayout, Text } from '~/ui';

export const HomePage = () => {
  const hasAccessToken = useAccessToken();

  if (hasAccessToken) {
    return <Redirect to="/dashboard" />;
  }

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
};
