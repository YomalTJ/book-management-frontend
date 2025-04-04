"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "../../components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

function LoginContent() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/books");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        {isRegistered && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Registration successful! Please log in with your credentials.
                </p>
              </div>
            </div>
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
