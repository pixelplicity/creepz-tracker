import * as React from 'react';

interface IProps {}
const LoadingSpinner: React.FunctionComponent<IProps> = () => {
  return (
    <div className="lds-ring w-6 h-6 inline-block">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
