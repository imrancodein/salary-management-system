const EODViewModal = ({
  isOpen,
  onClose,
  eod,
}) => {

  if (!isOpen || !eod) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-xl font-bold">

            EOD Details

          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          <div>

            <label className="font-semibold text-gray-700">

              Date

            </label>

            <div className="mt-1 p-3 rounded-lg bg-gray-100">

              {eod.date}

            </div>

          </div>

          <div>

            <label className="font-semibold text-gray-700">

              Today's Work

            </label>

            <div className="mt-1 p-3 rounded-lg bg-gray-100 whitespace-pre-wrap">

              {eod.todayWork}

            </div>

          </div>

          <div>

            <label className="font-semibold text-gray-700">

              Tomorrow Plan

            </label>

            <div className="mt-1 p-3 rounded-lg bg-gray-100 whitespace-pre-wrap">

              {eod.tomorrowPlan}

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

};

export default EODViewModal;