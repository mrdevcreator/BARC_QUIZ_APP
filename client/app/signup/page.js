"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/signup", form);
      alert("Signup successful!");
      router.push("/login");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 w-80 space-y-4 bg-white rounded shadow">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <div className=" space-y-4">
          <h2 className="text-xl font-bold text-center">Sign Up</h2>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
