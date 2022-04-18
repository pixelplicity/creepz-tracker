import * as React from 'react';

import { theme } from 'lib/theme';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface IProps {
  className?: string;
  title?: string;
  titleIcon?: React.ReactNode;
  color?: 'pink' | 'blue';
  isLoading: boolean;
}

const GlowyBox: React.FunctionComponent<IProps> = ({
  className,
  title,
  titleIcon,
  isLoading,
  color,
  children,
}) => {
  const colorTheme = theme[color || 'blue'];
  return (
    <div
      className={`${
        className || ''
      }  bg-creepz-purple border border-black rounded-3xl shadow-lg`}
    >
      <div className="relative border-creepz-border border-8 m-2 text-center shadow rounded-3xl p-2 pt-8">
        {title && (
          <header className="absolute -top-8 left-1/2 -translate-x-1/2 mx-auto w-full sm:w-3/4">
            <div
              className={`bg-creepz-purple border border-black rounded-full shadow-lg ${colorTheme.boxShadowClass} px-4 py-2`}
            >
              <h2
                className={`text-xl md:text-2xl ${colorTheme.textClass} uppercase`}
              >
                {title}
              </h2>
              {titleIcon && (
                <div
                  className={`absolute ${colorTheme.textClass} hover:${colorTheme.textHoverClass} top-1/2 -right-2 -translate-y-1/2`}
                >
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
