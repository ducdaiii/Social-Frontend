const InfoRow = ({ label, value, capitalize = false }) => (
  <div>
    <span className="text-gray-500 text-sm">{label}</span>
    <p className={`font-medium text-gray-900 ${capitalize ? "capitalize" : ""}`}>
      {value}
    </p>
  </div>
);

export default InfoRow;