import React from 'react';

import Nav from 'components/Nav/Nav';

interface IProps {
  openAddressModel: () => void;
}
const BlankHeader: React.FunctionComponent<IProps> = ({ openAddressModel }) => {
  return (
    <>
      <Nav openAddressModel={openAddressModel} />
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="/images/header-bg.png"
            alt="Creepz Invasion Grounds"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 mix-blend-multiply" />
        </div>
      </div>
    </>
  );
};

export default BlankHeader;
