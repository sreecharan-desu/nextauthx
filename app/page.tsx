// app/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex-grow flex items-center justify-center w-full max-w-6xl">
        <div className="w-full space-y-8">
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

          {status === "loading" ? (
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          ) : session ? (
            <>
              {/* Authenticated State */}
              <h1 className="text-2xl font-semibold text-center text-black dark:text-white">
                Welcome, {session.user?.name || "User"}
              </h1>

              <div className="space-y-5">
                {/* User Profile Image */}
                {session.user?.image && (
                  <div className="flex justify-center">
                    <Image
                      src={session.user.image}
                      alt="Profile picture"
                      width={64}
                      height={64}
                      className="rounded-full border border-gray-300 dark:border-gray-700"
                    />
                  </div>
                )}

                {/* User Details */}
                <div className="text-sm text-black dark:text-white">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {session.user?.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">ID:</span>{" "}
                    {/* @ts-expect-error --- */}
                    {session.user?.id || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Session Expires:</span>{" "}
                    {session.expires
                      ? new Date(session.expires).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full cursor-pointer py-2.5 px-4 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={isLoggingOut}
                  aria-label="Sign out"
                >
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Unauthenticated State */}
              <h1 className="text-2xl font-semibold text-center text-black dark:text-white">
                Welcome to the App
              </h1>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Simple authentication example using NextAuth
              </p>
 <div className="w-full max-w-sm mx-auto px-4 space-y-5 mt-8">
  <Link
    href="/auth/signin"
    className="block w-full cursor-pointer py-3 px-6 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
    aria-label="Sign in"
  >
    Sign in
  </Link>
</div>


            </>
          )}
        </div>
      </div>
    </div>
  );
}