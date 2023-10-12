import { FlexLayout, Icon, Text } from '~/ui';

export interface CheckboxProps {
  isDisabled?: boolean;
  label?: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
  tabIndex?: number | undefined;
}

export const Checkbox: React.FC<CheckboxProps> = ({ isDisabled = false, label, value, onChange, tabIndex }) => {
  function handleToggle() {
    onChange(!value);
  }

  return (
    <FlexLayout
      alignItems="center"
      isDisabled={isDisabled}
      space={4}
      sx={{ width: 'fit-content' }}
      onClick={handleToggle}
    >
      <FlexLayout
        alignItems="center"
        aria-checked="false"
        flexShrink={0}
        justifyContent="center"
        role="checkbox"
        sx={{
          bg: 'gray-700',
          borderRadius: 's',
          height: '24px',
          width: '24px',
          '&:hover': {
            bg: 'gray-600',
          },
        }}
        tabIndex={tabIndex || 0}
        onKeyPress={(event) => {
          const { key } = event;
          if (key === 'Enter' || key === ' ') {
            handleToggle();
          }
        }}
      >
        {value && <Icon color="green" icon="check" size="l" />}
      </FlexLayout>
      {label && <Text>{label}</Text>}
    </FlexLayout>
  );
};
