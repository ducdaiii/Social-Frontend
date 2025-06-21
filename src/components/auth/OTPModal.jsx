import { useEffect, useState } from "react";

const OTPModal = ({ code, onVerified, onClose }) => {
  const [inputCode, setInputCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.slice(-1);
    const newCode = inputCode.split("");
    newCode[idx] = val;
    const combined = newCode.join("");
    setInputCode(combined);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`).focus();
    }
  };

  const handleVerify = () => {
    if (timeLeft <= 0) {
      alert("Mã đã hết hạn");
      return;
    }
    if (inputCode === code) {
      onVerified();
    } else {
      alert("Sai mã!");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="font-bold text-lg mb-2">Enter the verification code</h3>
        <p className="text-sm text-gray-600 mb-2">Time left: {timeLeft}s</p>
        <div className="flex space-x-2 justify-center mb-4">
          {[...Array(6)].map((_, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              maxLength={1}
              value={inputCode[idx] || ""}
              onChange={(e) => handleChange(e, idx)}
              className="w-10 h-10 text-center border rounded-lg text-xl"
            />
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;