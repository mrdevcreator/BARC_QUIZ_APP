"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const goToExam = () => {
    router.push("/exam");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 px-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-blue-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          🎓 Welcome to the BARC Exam App
        </h1>
        <p className="text-gray-600 mb-8">
          Prepare yourself and take the exam with confidence.
        </p>

        <button
          onClick={goToExam}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow transition-all duration-200 mb-4"
        >
          Exam-1
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
