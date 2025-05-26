// app/auth/signin/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err)
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      console.log(err)

      setError(`Failed to sign in with ${provider}`);
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
          Sign in to your account
        </h1>

        {/* Error Message */}
        {error && (
          <div
            className="p-3 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg text-center"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
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
              required
              autoComplete="email"
              className="w-full px-3 py-2.5 text-sm text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
              placeholder="Enter your email"
            />
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
              required
              autoComplete="current-password"
              className="w-full px-3 py-2.5 text-sm text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 cursor-pointer px-4 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-busy={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleOAuthSignIn("github")}
            className="w-full flex cursor-pointer items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign in with GitHub"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.69-4.566 4.943.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with GitHub
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleOAuthSignIn("google")}
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign in with Google"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147.933-2.893 1.507-5.053 1.507-3.867 0-7.013-3.133-7.013-7 0-3.867 3.146-7 7.013-7 1.893 0 3.6.733 4.867 1.933l2.36-2.36C18.947 2.667 15.947 1 12.48 1 6.147 1 1 6.147 1 12.48s5.147 11.48 11.48 11.48c6.067 0 11.013-4.467 11.013-10.48 0-1.067-.12-2.133-.32-3.16h-11.693z" />
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Sign-Up Link */}
        <p className="mt-6  text-sm text-center text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-black cursor-pointer dark:text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}