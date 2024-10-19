import { Control, Controller } from 'react-hook-form';

import { FlexLayout, Text } from '~/ui';

interface WatchAgainProps {
  control: Control<any>;
  hideLabel?: boolean;
}

export const WatchAgain: React.FC<WatchAgainProps> = ({ control, hideLabel = false }) => {
  return (
    <Controller
      control={control}
      name="watchAgain"
      render={({ field: { value, onChange } }) => (
        <FlexLayout flexDirection="column" space={3}>
          {!hideLabel && (
            <Text as="label" color="dimmed" variant="paragraph-default">
              Watch again or recommend?
            </Text>
          )}
          <FlexLayout alignItems="center" space={4} sx={{ height: '100%' }}>
            <Text
              color={value === true ? 'primary' : 'dimmed'}
              sx={{ fontSize: '18px' }}
              variant="paragraph-default"
              onClick={() => onChange(true)}
            >
              Yes
            </Text>
            <Text
              color={value === false ? 'primary' : 'dimmed'}
              sx={{ fontSize: '18px' }}
              variant="paragraph-default"
              onClick={() => onChange(false)}
            >
              No
            </Text>
          </FlexLayout>
        </FlexLayout>
      )}
    />
  );
};
