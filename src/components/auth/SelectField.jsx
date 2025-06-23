const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;