import { FlexLayout, Icon, Text } from '~/ui';

const Title = () => {
  return (
    <FlexLayout alignItems="center" bg="black" flexDirection="row" justifyContent="center" p={2} space={5}>
      <Icon color="white" icon="videoCamera" size="xl" />
      <Text as="h1" color="white" variant="display-heading-l">
        Movie app
      </Text>
    </FlexLayout>
  );
};

export default Title;
