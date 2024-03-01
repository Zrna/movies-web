import React from 'react';

import { FlexLayout, Icon } from '~/ui';

interface ActionIconsProps {
  isEditMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionIcons: React.FC<ActionIconsProps> = ({ isEditMode, onDelete, onEdit }) => {
  return (
    <FlexLayout space={3} sx={{ position: 'absolute', top: 2, right: 2 }}>
      <Icon bg="black-alpha-25" icon={isEditMode ? 'close' : 'pencil'} isRounded onClick={onEdit} />
      <Icon bg="black-alpha-25" icon="trash" isRounded onClick={onDelete} />
    </FlexLayout>
  );
};
