import { useState } from "react";
import toast from "react-hot-toast";
import { submitEOD } from "../../services/eod.service";

const EODForm = ({ 
  onSuccess
 }) => {
const isSunday =
    new Date().getDay() === 0;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: today,
    todayWork: "",
    tomorrowPlan: "",
  });

  // sunday
  if (isSunday) {

    return (

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-8 text-center shadow">

            <div className="text-5xl mb-3">

                🌴

            </div>

            <h2 className="text-2xl font-bold text-yellow-700">

                Weekly Off

            </h2>

            <p className="text-gray-600 mt-2">

                Today is Sunday.

            </p>

            <p className="text-gray-600">

                EOD submission is not required today.

            </p>

        </div>

    );

}
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

if (!formData.todayWork.trim()) {

  toast.error("Today's Work is required");

  return;

}

    try {

      setLoading(true);

      const response = await submitEOD(formData);

      toast.success(response.message);

      setFormData({
        date: today,
        todayWork: "",
        tomorrowPlan: "",
      });

      if (onSuccess) {

        onSuccess();

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">

        Daily EOD

      </h2>


      <form onSubmit={handleSubmit}>

        {/* Date */}

        <div className="mb-5">

          <label className="block mb-2 font-medium">

            Date

          </label>

          <input
            type="date"
            value={formData.date}
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />

        </div>

        {/* Today's Work */}

        <div className="mb-5">

          <label className="block mb-2 font-medium">

            Today's Work

          </label>

          <textarea
            name="todayWork"
            rows={5}
            value={formData.todayWork}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Enter today's work..."
          />

        </div>

        {/* Tomorrow Plan */}

        <div className="mb-6">

          <label className="block mb-2 font-medium">

            Tomorrow Plan

          </label>

          <textarea
            name="tomorrowPlan"
            rows={5}
            value={formData.tomorrowPlan}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Enter tomorrow's plan..."
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
        >

          {loading ? "Submitting..." : "Submit"}

        </button>

      </form>

    </div>

  );

};

export default EODForm;