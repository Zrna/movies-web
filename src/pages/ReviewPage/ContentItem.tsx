import { FlexLayout, Text } from '~/ui';

interface ContentItemProps {
  text: string;
  value: string | JSX.Element | JSX.Element[];
}

export const ContentItem: React.FC<ContentItemProps> = ({ text, value }) => {
  return (
    <FlexLayout data-testid="content-item-component" flexDirection="column" space={2} sx={{ wordBreak: 'break-word' }}>
      <Text color="white-alpha-50" data-testid="content-item-component-text" variant="paragraph-big">
        {text}
      </Text>
      {typeof value === 'string' ? (
        <Text color="primary" data-testid="content-item-component-value" variant="paragraph-default">
          {value}
        </Text>
      ) : (
        value
      )}
    </FlexLayout>
  );
};
