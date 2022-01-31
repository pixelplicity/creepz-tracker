import * as React from 'react';

interface IProps {
  label?: string;
}
const StatBox: React.FunctionComponent<IProps> = ({ children, label }) => {
  return (
    <div className="flex justify-center items-baseline">
      {label && (
        <>
          <p className="text-2xl font-normal text-creepz-green-light creepz-glowy-text">
            {children}
          </p>
          <p className="ml-2 items-baseline text-xs font-normal text-creepz-green">
            {label}
          </p>
        </>
      )}
    </div>
  );
};

export default StatBox;
