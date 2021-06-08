import { ButtonLink } from '~/components';
import { FlexLayout, Text } from '~/ui';

const btnStyle = {
  width: '110px',
  height: '50px',
  justifyContent: 'center',
  cursor: 'pointer',
};

export const HomePage = () => {
  return (
    <FlexLayout alignItems="center" flexDirection="column" space={5} sx={{ marginTop: '30vh' }}>
      <ButtonLink sx={btnStyle} text="Login" to="/login" variant="secondary" />
      <Text color="white" variant="text-xl-medium">
        or
      </Text>
      <ButtonLink sx={btnStyle} text="Register" to="/register" variant="secondary" />
    </FlexLayout>
  );
};
