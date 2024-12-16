const TableSkeletonMobile = () => {
  return (
    <div className="mt-10">
      <TableSkeletonCard />
      <TableSkeletonCard />
      <TableSkeletonCard />
      <TableSkeletonCard />
    </div>
  );
};

export default TableSkeletonMobile;

function TableSkeletonCard() {
  return (
    <div className="my-5 animate-pulse lg:hidden">
      <div className="bg-gray-800/30 rounded-lg shadow-md p-4 mb-4">
        <div className="mb-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
        </div>
        <div className="mb-2 flex items-center gap-x-2">
          <div className="h-4 bg-gray-700 rounded w-[80%]" />
          <div className="h-6 bg-gray-700 rounded w-6" />
        </div>
        <div className="mb-2">
          <div className="h-4 bg-gray-700 rounded w-[60%]" />
        </div>
        <div className="mb-2   flex items-center gap-x-2">
          <div className="h-4 bg-gray-700 rounded w-1/4" />
          <div className="h-4 bg-gray-700 rounded w-12" />
        </div>
        <div className="mb-2   flex items-center gap-x-2">
          <div className="h-4 bg-gray-700 rounded w-1/4" />
          <div className="h-4 bg-gray-700 rounded w-8" />
        </div>
        <div className="mb-2   flex items-center gap-x-2">
          <div className="h-4 bg-gray-700 rounded w-1/4" />
          <div className="h-4 bg-gray-700 rounded w-16" />
        </div>
        <div className="mb-2 flex items-center gap-x-2">
          <div className="h-4 bg-gray-700 rounded w-1/4" />
          <div className="h-4 bg-gray-700 rounded w-20" />
        </div>
        <div>
          <div className="h-4 bg-gray-700 rounded w-[80%]" />
        </div>
        <div className="mt-2">
          <div className="h-6 bg-gray-700 rounded w-[90%]" />
        </div>
      </div>
      {/* More cards... */}
    </div>
  );
}
