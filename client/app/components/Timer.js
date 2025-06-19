"use client";

import { useEffect, useState } from "react";

export default function Timer({ duration = 600, onTimeout, submitted }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 1 && !submitted) {
      onTimeout(); // Trigger auto-submit
    }

    return () => clearTimeout(timer);
  }, [timeLeft, submitted, onTimeout]);

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
      Time Left: {formatTime()}
    </div>
  );
}
