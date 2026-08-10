const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  recordsPerPage,
  onPageChange,
}) => {

  const startRecord =
    (currentPage - 1) * recordsPerPage + 1;

  const endRecord = Math.min(
    currentPage * recordsPerPage,
    totalRecords
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">

      {/* Showing */}
      <p className="text-sm text-gray-600">
        Showing <strong>{startRecord}</strong> -
        <strong> {endRecord}</strong> of{" "}
        <strong>{totalRecords}</strong>
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (

          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>

        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Pagination;