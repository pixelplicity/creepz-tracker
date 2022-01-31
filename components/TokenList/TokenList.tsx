import * as React from 'react';

interface IProps {
  tokenIds: string[];
  baseUrl: string;
  address: string;
}
const TokenList: React.FunctionComponent<IProps> = ({
  tokenIds,
  address,
  baseUrl,
}) => {
  return (
    <ul
      role="list"
      className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {tokenIds.map((id) => (
        <li key={id} className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
            <a
              href={`https://opensea.io/assets/${address}/${id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={baseUrl.replace('_||_', id)}
                alt=""
                className="object-cover pointer-events-none group-hover:opacity-75"
              />
            </a>
          </div>
          <p className="mt-2 block text-sm font-medium text-creepz-green-light creepz-glowy-text truncate ">
            <a
              href={`https://opensea.io/assets/${address}/${id}`}
              target="_blank"
              rel="noreferrer"
            >
              #{id}
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TokenList;
