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
        width: '130px',
        position: 'absolute',
        right: '10px',
        top: ['48px', '68px'],
        border: `1px solid ${theme.colors['light-dark']}`,
        zIndex: '5',
      }}
      onOutsideClick={onOutsideClick}
    >
      <Link to="/account">
        <TextWithIcon iconLeft="user" text="Edit" />
      </Link>
      <Divider />
      <TextWithIcon iconLeft="logout" text="Sign Out" onClick={logout} />
    </FlexLayout>
  );
};
