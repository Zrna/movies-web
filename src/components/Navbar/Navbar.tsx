import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { TextWithIcon } from '~/components';
import { useAccount } from '~/hooks';
import { Box, FlexLayout, Icon, LoadingSpinner, Text } from '~/ui';

import { AccountMenu } from './AccountMenu';

export const Navbar = () => {
  const { pathname } = useLocation();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { account, isLoading } = useAccount();

  useEffect(() => {
    setIsAccountMenuOpen(false);
  }, [pathname]);

  return (
    <Box as="nav" bg="black">
      <FlexLayout
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        p={[2, 4]}
        space={4}
        sx={{ maxWidth: '1920px', margin: '0 auto' }}
      >
        <Link to={account ? '/dashboard' : '/'}>
          <Icon color="primary" icon="videoCamera" size="xl" />
        </Link>
        {isLoading ? (
          <LoadingSpinner />
        ) : account ? (
          <>
            <Link to="/create-review">
              <TextWithIcon iconLeft="plus" text="Create review" variant="display-paragraph-xl" />
            </Link>
            <TextWithIcon
              iconRight={isAccountMenuOpen ? 'chevronUp' : 'chevronDown'}
              sx={{ wordBreak: 'break-all' }}
              text={account.firstName}
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            />
          </>
        ) : (
          <Link to="/login">
            <Text color="white">Login</Text>
          </Link>
        )}
      </FlexLayout>
      {isAccountMenuOpen && <AccountMenu onOutsideClick={() => setIsAccountMenuOpen(false)} />}
    </Box>
  );
};
