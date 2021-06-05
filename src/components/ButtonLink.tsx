import { Link } from 'react-router-dom';

import { Button, ButtonProps } from '~/ui';

interface ButtonLinkProps extends ButtonProps {
  to: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ to, text, onClick, ...rest }) => {
  return (
    <Link to={to}>
      <Button text={text} onClick={onClick} {...rest} />
    </Link>
  );
};
