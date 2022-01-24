import * as React from 'react';

interface IProps {
  children: (isSwapped: boolean) => React.ReactNode;
}
const SwappableText: React.FunctionComponent<IProps> = ({ children }) => {
  const [isSwapped, setIsSwapped] = React.useState(false);
  const toggleSwap = () => setIsSwapped(!isSwapped);
  return (
    <span className="cursor-pointer" onClick={toggleSwap}>
      {children(isSwapped)}
    </span>
  );
};

export default SwappableText;
