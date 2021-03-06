import * as React from 'react';

interface IProps {
  name?: string;
  pageSize: number;
  offset: number;
  updateOffset: (offset: number) => void;
  addressSearch?: string;
  data: any[] | undefined;
}
const Pagination: React.FunctionComponent<IProps> = ({
  name,
  pageSize,
  offset,
  updateOffset,
  addressSearch = '',
  data,
}) => {
  const paginationName = name || 'results';
  const canPrev = data ? offset > 0 : false;
  const canNext = data?.length === pageSize;
  return (
    <nav
      className="py-2 flex items-center justify-between"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        {data && data.length && (
          <p className="text-sm text-creepz-blue creepz-glowy-text">
            Showing {offset + 1} - {offset + data.length} {paginationName}{' '}
            {addressSearch && addressSearch.length >= 3 && (
              <span>containing &quot;{addressSearch}&quot;</span>
            )}
          </p>
        )}
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <a
          className={`${
            !canPrev
              ? 'cursor-not-allowed text-gray-400 bg-creepz-purple-dark'
              : 'bg-creepz-purple-light'
          } relative inline-flex items-center px-4 py-1 text-sm font-medium text-creepz-blue cursor-pointer`}
          onClick={() => {
            if (canPrev) {
              updateOffset(offset - pageSize);
            }
          }}
        >
          Previous
        </a>
        <a
          className={`${
            !canNext
              ? 'cursor-not-allowed text-gray-400 bg-creepz-purple-dark'
              : 'bg-creepz-purple-light'
          } ml-3 relative inline-flex items-center px-4 py-1 text-sm font-medium text-creepz-blue cursor-pointer`}
          onClick={() => {
            if (canNext) {
              updateOffset(offset + pageSize);
            }
          }}
        >
          Next
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
