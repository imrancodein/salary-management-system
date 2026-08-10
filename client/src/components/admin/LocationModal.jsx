const LocationModal = ({
  isOpen,
  onClose,
  attendance,
}) => {

  if (!isOpen || !attendance) return null;

  const location = attendance.location;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-[450px] p-6">

        <h2 className="text-2xl font-bold mb-5">

          Attendance Location

        </h2>

        <div className="space-y-3">

          <p>

            <strong>Type :</strong>

            {location.type}

          </p>

          <p>

            <strong>Latitude :</strong>

            {location.latitude}

          </p>

          <p>

            <strong>Longitude :</strong>

            {location.longitude}

          </p>

          <p>

            <strong>Distance :</strong>

            {location.distance} Meter

          </p>

          <p>

            <strong>Address :</strong>

            {location.address || "Not Available"}

          </p>

        </div>

        <a

          href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}

          target="_blank"

          rel="noreferrer"

          className="mt-5 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"

        >

          Open Google Maps

        </a>

        <button

          onClick={onClose}

          className="ml-3 mt-5 bg-gray-300 px-4 py-2 rounded-lg"

        >

          Close

        </button>

      </div>

    </div>

  );

};

export default LocationModal;