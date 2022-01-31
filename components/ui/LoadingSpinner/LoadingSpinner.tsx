import * as React from 'react';

interface IProps {
  className?: string;
}
const LoadingSpinner: React.FunctionComponent<IProps> = ({ className }) => {
  return (
    <div className={`lds-ring ${className} inline-block`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
