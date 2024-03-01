import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { AccountData } from '~/api';
import { useSearch } from '~/contexts';
import { useAccount } from '~/hooks';
import { Box, FlexLayout, Icon, Only, Search, Text, theme, useScreenType } from '~/ui';

import { AccountMenu } from './AccountMenu';
import { Tabs } from './Tabs';

interface UserMenuProps {
  name: string;
  isOpen: boolean;
  onClick: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ name, isOpen, onClick }) => {
  const { isMobile } = useScreenType();

  return (
    <FlexLayout
      alignItems="center"
      px={2}
      space={3}
      sx={{
        width: 'auto',
        height: ['40px', '50px'],
        wordBreak: 'break-all',
        borderRadius: '50px',
        border: `2px solid ${theme.colors['light-dark']}`,
      }}
      onClick={onClick}
    >
      <img
        alt="Avatar"
        src="/assets/images/avatar-15.svg"
        style={{ width: isMobile ? '24px' : '36px', height: isMobile ? '24px' : '36px' }}
      />
      {!isMobile && <Text color="dimmed">{name}</Text>}
      <Icon icon={isOpen ? 'chevronUp' : 'chevronDown'} />
    </FlexLayout>
  );
};

const getUserInitials = (account: AccountData) => {
  return `${account.firstName.charAt(0)}${account.lastName.charAt(0)}`;
};

export const Navbar = () => {
  const { pathname } = useRouter();
  const { data: account } = useAccount();
  const { isMobile } = useScreenType();
  const { search, setSearch } = useSearch();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const isDashboard = pathname === '/dashboard';

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
        sx={{ maxWidth: '1920px', margin: '0 auto', height: ['50', '90px'] }}
      >
        <NextLink href="/dashboard">
          <img alt="Moovier logo" src="/assets/images/logo.svg" style={{ width: '100px', cursor: 'pointer' }} />
        </NextLink>
        {isDashboard && (
          <Only for="desktop">
            <Tabs tabs={['All Reviews', 'Watch Again', 'Bucket List']} />
          </Only>
        )}
        <FlexLayout space={[2, 5]}>
          {isDashboard ? (
            <Search isMini={isMobile} value={search} onChange={setSearch} />
          ) : (
            <NextLink href="/create-review">
              <Icon bg="primary" color="white" icon="plus" isRounded size={isMobile ? 'm' : 'l'} />
            </NextLink>
          )}
          <UserMenu
            isOpen={isAccountMenuOpen}
            name={getUserInitials(account)}
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
          />
        </FlexLayout>
      </FlexLayout>
      {isAccountMenuOpen && <AccountMenu onOutsideClick={() => setIsAccountMenuOpen(false)} />}
    </Box>
  );
};
