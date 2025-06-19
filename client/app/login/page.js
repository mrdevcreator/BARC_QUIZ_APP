"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      router.push("/");
    } catch (error) {
      alert("Login failed! Please check credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 w-80 space-y-4 bg-white rounded shadow">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Log In</h2>
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
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
