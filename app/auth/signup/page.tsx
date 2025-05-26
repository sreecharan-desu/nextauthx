// app/auth/signup/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/app/actions/user";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const emailValue = formData.get("email") as string;
    const passwordValue = formData.get("password") as string;


    if (!emailValue) {
      setEmailError("Email is required");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!passwordValue) {
      setPasswordError("Password is required");
      setIsLoading(false);
      return;
    }
    if (passwordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await signup(emailValue, passwordValue);
      if (response.success) {
        setSuccessMessage(response.msg || "Account created successfully! Please sign in.");
        setEmail("");
        setPassword("");
      } else {
        if (response.e?.message?.includes("Unique constraint")) {
          setEmailError("This email is already registered");
        } else {
          setGeneralError(response.msg || "Failed to create user");
        }
      }
    } catch (err) {
      console.log(err)
      setGeneralError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/next.svg" // Replace with your logo
            alt="App Logo"
            width={120}
            height={24}
            priority
            className="dark:invert"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-black dark:text-white">
          Create your account
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div
            className="p-3 text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 rounded-lg text-center"
            role="alert"
          >
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {generalError && (
          <div
            className="p-3 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg text-center"
            role="alert"
          >
            {generalError}
          </div>
        )}

        {/* Sign-Up Form */}
        <form className="space-y-5" action={handleSubmit}>
   
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black dark:text-white mb-1.5"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
                setGeneralError(null);
                setSuccessMessage(null);
              }}
              required
              className={`w-full px-3 py-2.5 text-sm text-black dark:text-white bg-white dark:bg-black border ${
                emailError ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors`}
              placeholder="Enter your email"
              disabled={isLoading}
              autoComplete="email"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{emailError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black dark:text-white mb-1.5"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null);
                setGeneralError(null);
                setSuccessMessage(null);
              }}
              required
              className={`w-full px-3 py-2.5 text-sm text-black dark:text-white bg-white dark:bg-black border ${
                passwordError ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors`}
              placeholder="Create a password"
              disabled={isLoading}
              autoComplete="new-password"
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 cursor-pointer px-4 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-busy={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {/* Sign-In Link */}
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-black dark:text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}