import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ClientCaptcha from 'react-client-captcha';

import { FlexLayout, Text, TextInput } from '~/ui';

interface CaptchaProps {
  onChange(value: boolean): void;
}

export const Captcha: React.FC<CaptchaProps> = ({ onChange }) => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [insertedCaptchaValue, setInsertedCaptchaValue] = useState('');

  useEffect(() => {
    setInsertedCaptchaValue('');
    return onChange(false);
  }, [captchaValue]);

  const captchaNotValid = captchaValue !== insertedCaptchaValue && insertedCaptchaValue.length >= 5;

  return (
    <FlexLayout flexDirection="column" space={3}>
      <Text as="label" color="dimmed">
        Retype the characters from the picture
      </Text>
      <ClientCaptcha captchaCode={setCaptchaValue} charsCount={5} fontSize={18} />
      <TextInput
        error={captchaNotValid ? 'Wrong code. Please try again.' : undefined}
        placeholder="Enter the characters from the image"
        value={insertedCaptchaValue}
        onChange={(value: string) => {
          setInsertedCaptchaValue(value);
          return onChange(value === captchaValue);
        }}
      />
    </FlexLayout>
  );
};
