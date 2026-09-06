"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.error || "Login failed"
        );
      }


      router.push("/admin/dashboard");
      router.refresh();

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >

        <h1 className="text-2xl font-bold mb-6">
          Admin Login
        </h1>


        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}


        <div className="mb-4">

          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2"
            required
          />

        </div>


        <div className="mb-6">

          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2"
            required
          />

        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

    </div>
  );
}