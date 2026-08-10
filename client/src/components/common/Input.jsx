const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">{label}</label>

      <input
        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default Input;