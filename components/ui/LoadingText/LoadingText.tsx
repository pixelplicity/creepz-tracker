import * as React from 'react';

import LoadingSpinner from 'components/ui/LoadingSpinner/LoadingSpinner';

interface IProps {
  isLoading: boolean;
}
const LoadingText: React.FunctionComponent<IProps> = ({
  isLoading,
  children,
}) => {
  return isLoading ? <LoadingSpinner className="w-6 h-6" /> : <>{children}</>;
};

export default LoadingText;
