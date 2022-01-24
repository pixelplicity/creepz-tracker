import * as React from 'react';

interface IProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FunctionComponent<IProps> = ({
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`${className} inline-flex items-center py-2 px-4 text-sm leading-4 font-medium focus:outline-none`}
      onClick={(ev) => {
        if (onClick) {
          ev.preventDefault();
          onClick();
        }
      }}
      {...props}
    >
      {leadingIcon && leadingIcon}
      {children}
      {trailingIcon && trailingIcon}
    </button>
  );
};

export default Button;
