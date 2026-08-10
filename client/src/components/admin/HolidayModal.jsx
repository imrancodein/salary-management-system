import { useEffect, useState } from "react";

const HolidayModal = ({
  isOpen,
  onClose,
  onSave,
  holiday,
  onDelete
}) => {

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "National Holiday",
    description: "",
  });

  useEffect(() => {

    if (holiday) {

      setFormData({
        name: holiday.name || "",
        date: holiday.date || "",
        type:
          holiday.type || "National Holiday",
        description:
          holiday.description || "",
      });

    } else {

      setFormData({
        name: "",
        date: "",
        type: "National Holiday",
        description: "",
      });

    }

  }, [holiday]);

  if (!isOpen) return null;

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };
//   reset form
const resetForm = () => {
  setFormData({
    name: "",
    date: "",
    type: "National Holiday",
    description: "",
  });
};

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(formData);
    resetForm();

  };


  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg">

        <div className="border-b p-5">

          <h2 className="text-xl font-bold">

            {

              holiday

                ? "Edit Holiday"

                : "Add Holiday"

            }

          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >

          <div>

            <label className="font-medium">

              Holiday Name

            </label>

            <input

              type="text"

              name="name"

              value={formData.name}

              onChange={handleChange}

              required

              className="w-full border rounded-lg px-3 py-2 mt-1"

            />

          </div>

          <div>

            <label className="font-medium">

              Holiday Date

            </label>

            <input

              type="date"

              name="date"

              value={formData.date}

              onChange={handleChange}

              required

              className="w-full border rounded-lg px-3 py-2 mt-1"

            />

          </div>

          <div>

            <label className="font-medium">

              Holiday Type

            </label>

            <select

              name="type"

              value={formData.type}

              onChange={handleChange}

              className="w-full border rounded-lg px-3 py-2 mt-1"

            >

              <option>

                National Holiday

              </option>

              <option>

                Festival

              </option>

              <option>

                NGO Holiday

              </option>

              <option>

                Optional Holiday

              </option>

            </select>

          </div>

          <div>

            <label className="font-medium">

              Description

            </label>

            <textarea

              rows={3}

              name="description"

              value={formData.description}

              onChange={handleChange}

              className="w-full border rounded-lg px-3 py-2 mt-1"

            />

          </div>

          <div className="flex justify-end gap-3">

          {/* Delet and cancle button */}
          <div className="flex justify-between items-center">

  <div>

    {

      holiday && (

        <button
          type="button"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >

          Delete

        </button>

      )

    }

  </div>

  <div className="flex gap-3">

    <button
      type="button"
      onClick={onClose}
      className="bg-gray-200 px-5 py-2 rounded-lg"
    >

      Cancel

    </button>

    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
    >

      {

        holiday

          ? "Update"

          : "Save"

      }

    </button>

  </div>

        </div>

          </div>

        </form>

      </div>

    </div>

  );

};

export default HolidayModal;