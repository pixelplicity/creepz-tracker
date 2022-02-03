import * as React from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface IProps {
  className?: string;
  title?: string;
  titleIcon?: React.ReactNode;
  isLoading: boolean;
}
const GlowyBox: React.FunctionComponent<IProps> = ({
  className,
  title,
  titleIcon,
  isLoading,
  children,
}) => {
  return (
    <div
      className={`${
        className || ''
      }  bg-creepz-green-dark border border-black rounded-3xl shadow-lg creepz-glowy-shadow`}
    >
      <div className="relative border-creepz-border border-8 m-2 text-center shadow rounded-3xl p-2 pt-8">
        {title && (
          <header className="absolute -top-8 left-1/2 -translate-x-1/2 mx-auto w-full sm:w-3/4">
            <div className="bg-creepz-green-dark border border-black rounded-full shadow-lg creepz-glowy-shadow px-4 py-2">
              <h2 className="text-2xl text-creepz-green-light creepz-glowy-text uppercase">
                {title}
              </h2>
              {titleIcon && (
                <div className="absolute text-creepz-green hover:text-creepz-green-light top-1/2 -right-2 -translate-y-1/2">
                  {titleIcon}
                </div>
              )}
            </div>
          </header>
        )}
        <div className="p-4">
          {isLoading && <LoadingSpinner className="w-16 h-16" />}
          {!isLoading && children}
        </div>
      </div>
    </div>
  );
};

export default GlowyBox;
