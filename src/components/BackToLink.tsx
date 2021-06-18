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
      color="red-500"
      iconLeft="arrowLeft"
      text={text}
      variant="text-s-medium"
      onClick={() => history.push(to)}
    />
  );
};
