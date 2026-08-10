import { useState } from "react";
import { markSalaryPaid } from "../../services/salary.service";

const PaymentModal = ({
  open,
  setOpen,
  salary,
  loadSalary,
}) => {
  const [paymentMode, setPaymentMode] = useState("Bank");
  const [loading, setLoading] = useState(false);

  if (!open || !salary) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await markSalaryPaid(
        salary._id,
        paymentMode
      );

      alert(response.message);

      await loadSalary();

      setOpen(false);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Payment Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Mark Salary Paid
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <div>

            <label className="font-medium">
              Employee
            </label>

            <input
              value={salary.staff?.name}
              readOnly
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />

          </div>

          <div>

            <label className="font-medium">
              Payment Mode
            </label>

            <select
              value={paymentMode}
              onChange={(e) =>
                setPaymentMode(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2"
            >
              <option>Bank</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Cheque</option>
            </select>

          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Saving..."
              : "Confirm Payment"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentModal;