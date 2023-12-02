import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { TextWithIcon } from '~/components';
import { useSearch } from '~/context';
import { useAccount } from '~/hooks';
import { Box, FlexLayout, Icon, Only, Search, theme, useScreenType } from '~/ui';
import logo from '~/ui/assets/images/logo.svg';

import { AccountMenu } from './AccountMenu';
import { Tabs } from './Tabs';

export const Navbar = () => {
  const { pathname } = useLocation();
  const { data: account } = useAccount();
  const { isMobile, isDesktop } = useScreenType();
  const { search, setSearch } = useSearch();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  useEffect(() => {
    setIsAccountMenuOpen(false);
  }, [pathname]);

  if (!account) {
    return null;
  }

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
        <Link to="/dashboard">
          <img alt="Moovier logo" src={logo} style={{ width: isDesktop ? '100%' : '100px' }} />
        </Link>
        {pathname === '/dashboard' && (
          <Only for="desktop">
            <Tabs tabs={['All Reviews', 'Watch Again', 'Bucket List']} />
          </Only>
        )}
        <>
          {isMobile ? (
            <FlexLayout space={2}>
              <Search isMini value={search} onChange={setSearch} />
              <FlexLayout
                alignItems="center"
                flexDirection="row"
                px={2}
                py={1}
                space={2}
                sx={{
                  borderRadius: '50px',
                  border: `1px solid ${theme.colors['light-dark']}`,
                }}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              >
                <Icon color="white-alpha-75" icon="user" size="l" />
                <Icon icon={isAccountMenuOpen ? 'chevronUp' : 'chevronDown'} />
              </FlexLayout>
            </FlexLayout>
          ) : (
            <FlexLayout space={5}>
              <Search value={search} onChange={setSearch} />
              <TextWithIcon
                iconLeft="user"
                iconRight={isAccountMenuOpen ? 'chevronUp' : 'chevronDown'}
                space={3}
                sx={{
                  width: ['auto', 'auto', '130px'],
                  wordBreak: 'break-all',
                  borderRadius: '50px',
                  border: `1px solid ${theme.colors['light-dark']}`,
                  paddingX: 4,
                  paddingY: 1,
                }}
                text={account.firstName}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              />
            </FlexLayout>
          )}
        </>
      </FlexLayout>
      {isAccountMenuOpen && <AccountMenu onOutsideClick={() => setIsAccountMenuOpen(false)} />}
    </Box>
  );
};
