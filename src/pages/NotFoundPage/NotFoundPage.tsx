import { ButtonLink } from '~/components';
import { useAccessToken } from '~/hooks';
import { FlexLayout, Text } from '~/ui';

export const NotFoundPage = () => {
  const accessToken = useAccessToken();

  return (
    <FlexLayout
      alignItems="center"
      flexDirection="column"
      p={4}
      space={6}
      sx={{ marginTop: '30vh', textAlign: 'center' }}
    >
      <Text variant="headline-h2">Page Not Found</Text>
      <ButtonLink iconLeft="arrowLeft" text={`Go to ${accessToken ? 'dashboard' : 'home page'}`} to="/" />
    </FlexLayout>
  );
};
