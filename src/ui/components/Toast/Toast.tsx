import 'react-toastify/dist/ReactToastify.css';

import { Slide, toast, ToastContainer } from 'react-toastify';

import { TextWithIcon } from '~/components';
import { theme } from '~/ui';

export const Toast = () => {
  return (
    <ToastContainer
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnFocusLoss={false}
      pauseOnHover
      position="bottom-center"
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
    color: theme.colors['red-500'] as theme.Color,
  },
  success: {
    icon: 'check' as theme.Icon,
    color: theme.colors.green as theme.Color,
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
      autoClose: 3000,
      closeButton: false,
      closeOnClick: false,
      draggable: true,
      transition: Slide,
      pauseOnFocusLoss: false,
      position: 'bottom-center',
      progressStyle: {
        background: variantsMap[variant].color,
        height: '2px',
      },
      style: {
        backgroundColor: theme.colors.black,
        color: theme.colors['white-alpha-75'],
        display: 'block',
        width: '400px',
      },
    },
  );
}
