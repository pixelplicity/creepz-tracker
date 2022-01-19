import * as React from 'react';

interface IProps {
  title?: string;
}
const GlowyBox: React.FunctionComponent<IProps> = ({ title, children }) => {
  return (
    <div className="bg-creepz-green-dark border border-black rounded-3xl shadow-lg creepz-glowy-shadow">
      <div className="relative border-creepz-border border-8 m-2 text-center shadow rounded-3xl p-6">
        {title && (
          <header className="absolute -top-8 left-1/2 -translate-x-1/2 mx-auto w-2/3">
            <div className="bg-creepz-green-dark border border-black rounded-full shadow-lg creepz-glowy-shadow px-4 py-2">
              <h2 className="text-2xl text-creepz-green-light creepz-glowy-text uppercase">
                {title}
              </h2>
            </div>
          </header>
        )}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default GlowyBox;
