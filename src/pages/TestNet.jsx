import { useState, useEffect } from "react";

const TestNet = () => {
  const targetDate = new Date("2025-03-15T00:00:00").getTime();
  const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());

  function calculateTimeElapsed() {
    const now = new Date().getTime();
    const difference = now - targetDate;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white text-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold">The product is in development!</h1>
      <p className="my-8 text-lg md:text-xl">
        We will soon launch the test server, stay tuned!
      </p>
      <div className="mt-2xl flex space-x-4 text-2xl md:text-4xl">
        <div className="p-4 bg-gray-900 rounded-lg">{timeElapsed.days}d</div>
        <div className="p-4 bg-gray-900 rounded-lg">{timeElapsed.hours}h</div>
        <div className="p-4 bg-gray-900 rounded-lg">{timeElapsed.minutes}m</div>
        <div className="p-4 bg-gray-900 rounded-lg">{timeElapsed.seconds}s</div>
      </div>
    </div>
  );
};

export default TestNet;
