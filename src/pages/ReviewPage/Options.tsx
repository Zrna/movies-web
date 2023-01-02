import { useState } from 'react';

import { TextWithIcon } from '~/components';
import { Box, Divider, FlexLayout, Icon } from '~/ui';

interface OptionsProps {
  isEditMode: boolean;
  onDelete(): void;
  onEdit(value: boolean): void;
}

export const Options: React.FC<OptionsProps> = ({ isEditMode, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <Box sx={{ position: 'relative' }}>
      <Icon icon="dotsVertical" size="l" onClick={() => setShowOptions(!showOptions)} />
      {showOptions && (
        <FlexLayout
          backgroundColor="black"
          flexDirection="column"
          p={4}
          space={5}
          sx={{ position: 'absolute', borderRadius: '4px', top: '8px', right: '20px' }}
          onOutsideClick={() => setShowOptions(false)}
        >
          <TextWithIcon
            color="white-alpha-75"
            iconLeft="pencil"
            text={isEditMode ? 'Discard' : 'Edit'}
            variant="text-s-medium"
            onClick={() => {
              onEdit(!isEditMode);
              setShowOptions(false);
            }}
          />
          <Divider color="white-alpha-25" />
          <TextWithIcon
            color="white-alpha-75"
            iconLeft="trash"
            text="Delete"
            variant="text-s-medium"
            onClick={() => {
              onDelete();
              setShowOptions(false);
            }}
          />
        </FlexLayout>
      )}
    </Box>
  );
};
