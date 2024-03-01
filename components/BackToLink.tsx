import NextLink from 'next/link';

import { Box } from '~/ui';

import { TextWithIcon } from './TextWithIcon';

interface BackToLinkProps {
  text: string;
  to: string;
}

export const BackToLink: React.FC<BackToLinkProps> = ({ text, to }) => {
  return (
    <Box
      sx={{
        width: 'fit-content',
      }}
    >
      <NextLink href={to}>
        <TextWithIcon color="dimmed" iconLeft="chevronLeft" text={text} />
      </NextLink>
    </Box>
  );
};
