import 'react-toastify/dist/ReactToastify.css';

import { Slide, toast, ToastContainer } from 'react-toastify';

import { TextWithIcon } from '~/components';
import { theme } from '~/ui';

export const Toast = () => {
  return (
    <ToastContainer
      autoClose={2500}
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss={false}
      pauseOnHover
      position="top-center"
      rtl={false}
      transition={Slide}
    />
  );
};

interface ShowToastProps {
  icon?: theme.Icon;
  text: string;
  variant: 'success' | 'error';
}

const variantsMap = {
  error: {
    icon: 'close' as theme.Icon,
    color: theme.colors['alert-error'] as theme.Color,
  },
  success: {
    icon: 'check' as theme.Icon,
    color: theme.colors['alert-success'] as theme.Color,
  },
};

export function showToast(props: ShowToastProps) {
  const { text, variant } = props;

  return toast(
    () => (
      <TextWithIcon
        iconColor={variantsMap[variant].color}
        iconLeft={variantsMap[variant].icon}
        iconSize="l"
        text={text}
      />
    ),
    {
      autoClose: 2500,
      closeButton: false,
      closeOnClick: false,
      draggable: true,
      transition: Slide,
      pauseOnFocusLoss: false,
      position: 'top-center',
      hideProgressBar: true,
      progressStyle: {
        background: variantsMap[variant].color,
        height: '2px',
      },
      style: {
        backgroundColor: theme.colors['light-dark'],
        color: theme.colors['white-alpha-75'],
        display: 'block',
        width: 'auto',
        margin: 0,
        paddingRight: '16px',
        minHeight: 'fit-content',
        maxHeight: 'fit-content',
        borderRadius: '40px',
      },
    },
  );
}
