import { Link } from 'react-router-dom';

import { FlexLayout, Text } from '~/ui';

export const HomePage = () => {
  return (
    <FlexLayout justifyContent="center">
      <Text variant="display-heading-l">
        <Link to="/login">Go to Login</Link>
      </Text>
    </FlexLayout>
  );
};
