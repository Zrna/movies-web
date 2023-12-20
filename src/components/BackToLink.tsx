import { Link } from 'react-router-dom';

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
      <Link to={to}>
        <TextWithIcon color="dimmed" iconLeft="chevronLeft" text={text} />
      </Link>
    </Box>
  );
};
