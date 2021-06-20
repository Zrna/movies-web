import { useHistory } from 'react-router';

import { TextWithIcon } from './TextWithIcon';

interface BackToLinkProps {
  text: string;
  to: string;
}

export const BackToLink: React.FC<BackToLinkProps> = ({ text, to }) => {
  const history = useHistory();

  return (
    <TextWithIcon
      color="white-alpha-75"
      iconLeft="arrowLeft"
      sx={{
        width: 'fit-content',
      }}
      text={text}
      variant="text-s-medium"
      onClick={() => history.push(to)}
    />
  );
};
