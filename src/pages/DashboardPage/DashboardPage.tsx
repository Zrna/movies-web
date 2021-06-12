import { FlexLayout, Text } from '~/ui';

export const DashboardPage = () => {
  return (
    <FlexLayout flexDirection="column" p={4} space={6}>
      <Text color="primary" variant="display-heading-m">
        Dashboard
      </Text>
    </FlexLayout>
  );
};
