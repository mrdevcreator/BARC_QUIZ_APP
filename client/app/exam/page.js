"use client";

import { useEffect, useState, useCallback } from "react";
import Timer from  "../components/Timer"; 
import { GiTargetArrows } from "react-icons/gi";
import { FaFilePen } from "react-icons/fa6";
import { FaAngellist } from "react-icons/fa6";
import api from "@/lib/api";

export default function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState("test-user");

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await api.get("/questions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to load questions", err);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = useCallback(async () => {
    if (submitted) return;

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/submit",
        { userId, answers }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit answers", err);
    }
  }, [answers, submitted, userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          <FaFilePen />
          EXAM-1
        </h1>
        <div className="text-sm font-mono bg-indigo-100 text-indigo-700 px-3 py-1 rounded shadow-sm">
          <Timer
            duration={600}
            submitted={submitted}
            onTimeout={handleSubmit}
          />
        </div>
      </div>

      {!submitted ? (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow"
        >
          {questions.map((q, index) => (
            <div key={q.id} className="border-b pb-4">
              <p className="font-medium text-lg mb-3 text-gray-800">
                {index + 1}. {q.question}
              </p>

              {q.type === "mcq" ? (
                q.options
                  .split(",")
                  .map((opt) => opt.trim())
                  .map((opt) => (
                    <label
                      key={opt}
                      className="block mb-2 cursor-pointer text-gray-700"
                    >
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))
              ) : (
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Your answer"
                />
              )}
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200"
            >
              Submit Exam
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow space-y-6">
          <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <FaAngellist />
            Exam Submitted
          </h2>
          <p className="text-md  flex items-center gap-2">
            <GiTargetArrows /> <strong>Your Score:</strong> {score} /{" "}
            {questions.length}
          </p>

          {questions.map((q, index) => (
            <div
              key={q.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
            >
              <p className="font-medium text-gray-800 mb-1">
                {index + 1}. {q.question}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Your Answer:
                </span>{" "}
                {answers[q.id] || <i className="text-red-500">Empty</i>}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Correct Answer:
                </span>{" "}
                {q.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
}

