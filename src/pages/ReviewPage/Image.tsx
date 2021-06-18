import { FlexLayout } from '~/ui';

export const Image = () => {
  return (
    <FlexLayout flexDirection="column" space={4} sx={{ width: ['100%', '350px'] }}>
      <img alt="Movie poster" src="https://via.placeholder.com/350x500" />
    </FlexLayout>
  );
};
