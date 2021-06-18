import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { TextWithIcon } from '~/components';
import { useAccount } from '~/hooks';
import { Box, FlexLayout, Icon, LoadingSpinner, Text, useScreenType } from '~/ui';

import { AccountMenu } from './AccountMenu';

export const Navbar = () => {
  const { isMobile } = useScreenType();
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
          <Icon color="primary" icon="film" size={isMobile ? 'l' : 'xl'} />
        </Link>
        {isLoading ? (
          <LoadingSpinner />
        ) : account ? (
          <>
            <Link to="/create-review">
              <TextWithIcon
                iconLeft="plus"
                text="Create review"
                variant={isMobile ? 'display-paragraph-l' : 'display-paragraph-xl'}
              />
            </Link>
            {isMobile ? (
              <FlexLayout
                alignItems="center"
                flexDirection="row"
                space={2}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              >
                <Icon color="white-alpha-75" icon="user" size="l" />
                <Icon icon={isAccountMenuOpen ? 'chevronUp' : 'chevronDown'} />
              </FlexLayout>
            ) : (
              <TextWithIcon
                iconRight={isAccountMenuOpen ? 'chevronUp' : 'chevronDown'}
                sx={{ wordBreak: 'break-all' }}
                text={account.firstName}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              />
            )}
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
