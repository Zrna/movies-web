import { FlexLayout, LoadingSpinner } from '~/ui';

export interface CenteredLoadingSpinnerProps {
  size?: 's' | 'm' | 'l' | 'xl';
}

export const CenteredLoadingSpinner: React.FC<CenteredLoadingSpinnerProps> = ({ size = 'xl' }) => {
  return (
    <FlexLayout alignItems="center" justifyContent="center" pt={8}>
      <LoadingSpinner size={size} />
    </FlexLayout>
  );
};
