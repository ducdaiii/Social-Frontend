const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default InputField;