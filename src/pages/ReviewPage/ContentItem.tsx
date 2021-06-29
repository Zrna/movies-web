import { FlexLayout, Text } from '~/ui';

interface ContentItemProps {
  text: string;
  value: string | JSX.Element | JSX.Element[];
}

export const ContentItem: React.FC<ContentItemProps> = ({ text, value }) => {
  return (
    <FlexLayout flexDirection="column" space={2}>
      <Text color="white-alpha-50" variant="text-xl-bold">
        {text}
      </Text>
      <Text color="primary" variant="text-l-medium">
        {value}
      </Text>
    </FlexLayout>
  );
};
