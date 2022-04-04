import { AxiosError } from 'axios';
import { useState } from 'react';
import { useKey, useLockBodyScroll } from 'react-use';

import { Button, Modal, Text } from '~/ui';
import { showErrorToast } from '~/utils';

import { FlexLayout, Icon } from '../components';

interface UseModalProps {
  title: string;
  content: any;
  actionButton: {
    text: string;
    action(): Promise<any>;
  };
  cancelButtonText?: string;
}

export const useModal = ({
  title,
  content,
  actionButton,
  cancelButtonText = 'Cancel',
}: UseModalProps): [JSX.Element, () => void] => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function showModal() {
    setIsVisible(true);
  }

  function closeModal() {
    if (isLoading) return;
    setIsVisible(false);
  }

  async function handleActionClick() {
    setIsLoading(true);
    actionButton
      .action()
      .catch((err: AxiosError) => showErrorToast(err))
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
  }

  useLockBodyScroll(isVisible);
  useKey('Escape', closeModal);

  const modal = (
    <Modal isVisible={isVisible}>
      <FlexLayout flexDirection="column" space={4} onOutsideClick={closeModal}>
        <FlexLayout justifyContent="space-between" space={2}>
          <Text variant="title-m">{title}</Text>
          <Icon icon="close" onClick={closeModal} />
        </FlexLayout>
        {content}
        <FlexLayout space={2}>
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            size="s"
            text={actionButton.text}
            variant="danger"
            onClick={handleActionClick}
          />
          <Button isDisabled={isLoading} size="s" text={cancelButtonText} variant="primary" onClick={closeModal} />
        </FlexLayout>
      </FlexLayout>
    </Modal>
  );

  return [modal, showModal];
};
