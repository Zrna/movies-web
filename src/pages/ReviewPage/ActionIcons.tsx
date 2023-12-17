import React from 'react';

import { Box, FlexLayout, Icon, theme } from '~/ui';

interface ActionIconProps {
  icon: theme.Icon;
  onClick: () => void;
}

const ActionIcon: React.FC<ActionIconProps> = ({ icon, onClick }) => {
  return (
    <Box bg="black-alpha-25" p={3} sx={{ backdropFilter: 'blur(5px)', borderRadius: '50%' }} onClick={onClick}>
      <Icon icon={icon} />
    </Box>
  );
};

interface ActionIconsProps {
  isEditMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionIcons: React.FC<ActionIconsProps> = ({ isEditMode, onDelete, onEdit }) => {
  return (
    <FlexLayout space={3} sx={{ position: 'absolute', top: 2, right: 2 }}>
      <ActionIcon icon={isEditMode ? 'close' : 'pencil'} onClick={onEdit} />
      <ActionIcon icon="trash" onClick={onDelete} />
    </FlexLayout>
  );
};
