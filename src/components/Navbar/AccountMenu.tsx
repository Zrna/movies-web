import { Link } from 'react-router-dom';

import { useLogout } from '~/hooks';
import { Divider, FlexLayout, theme } from '~/ui';

import { TextWithIcon } from '../TextWithIcon';

export const AccountMenu = ({ onOutsideClick }: { onOutsideClick: () => void }) => {
  const logout = useLogout();

  return (
    <FlexLayout
      backgroundColor="black"
      flexDirection="column"
      p={4}
      space={5}
      sx={{
        width: '200px',
        position: 'absolute',
        right: 0,
        top: ['48px', '68px'],
        border: `1px solid ${theme.colors.dark}`,
        zIndex: '5',
      }}
      onOutsideClick={onOutsideClick}
    >
      <Link to="/account">
        <TextWithIcon iconLeft="user" text="Account" />
      </Link>
      <Divider />
      <TextWithIcon iconLeft="logout" text="Logout" onClick={logout} />
    </FlexLayout>
  );
};
