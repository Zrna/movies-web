import { FlexLayout, Icon, Text } from '~/ui';

const Title = () => {
  return (
    <FlexLayout alignItems="center" bg="gray-400" flexDirection="row" justifyContent="center" p={[2, 4, 6]} space={5}>
      <Icon color="red" icon="videoCamera" size="xl" />
      <Text as="h1" color="red" variant="display-heading-l">
        Movie app
      </Text>
    </FlexLayout>
  );
};

export default Title;
