import NextLink from 'next/link';

import { Button, ButtonProps } from '~/ui';
import { isExternalUrl } from '~/utils';

interface ButtonLinkProps extends ButtonProps {
  to: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ to, text, onClick, ...rest }) => {
  const isUrlExternal = isExternalUrl(to);

  if (isUrlExternal) {
    return (
      <a href={to} rel="noreferrer" target="_blank">
        <Button text={text} onClick={onClick} {...rest} />
      </a>
    );
  }

  return (
    <NextLink data-testid="button-link-component" href={to}>
      <Button text={text} onClick={onClick} {...rest} />
    </NextLink>
  );
};
