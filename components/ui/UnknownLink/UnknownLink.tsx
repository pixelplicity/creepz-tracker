import * as React from 'react';

import Link from 'next/link';

interface IProps {
  href: string;
  className?: string;
}

// Pass unknown props to next/lin
// see: https://headlessui.dev/react/menu#integrating-with-next-js
const UnknownLink: React.FunctionComponent<IProps> = ({
  href,
  children,
  ...rest
}) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default UnknownLink;
