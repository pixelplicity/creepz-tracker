import React, { forwardRef } from 'react';

import type { FieldError } from 'react-hook-form';

interface IProps {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  autoFill: boolean;
  icon?: React.ReactNode;
}
const TextInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      name,
      label,
      className,
      type = 'text',
      required = false,
      error,
      icon,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label htmlFor={name} className="sr-only">
          {label} {required && <span className="font-bold">*</span>}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            className={`${className} ${
              icon ? 'pl-10' : ''
            } pr-3 py-1 font-sans text-sm bg-creepz-green-light text-creepz-green-dark  placeholder-creepz-green-dark focus:outline-none block w-full creepz-glowy-shadow`}
            {...rest}
          />
        </div>
        {error && <span className="text-sm text-red-500">{error.message}</span>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
