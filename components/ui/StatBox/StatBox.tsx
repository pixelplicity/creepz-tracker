import * as React from 'react';

interface IProps {
  className?: string;
  label?: string;
}
const StatBox: React.FunctionComponent<IProps> = ({
  children,
  label,
  className,
}) => {
  return (
    <div className={`${className || ''} flex justify-center items-baseline`}>
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
