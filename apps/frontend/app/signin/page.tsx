"use client";

import { AuthForm } from '@/components/auth/AuthForm';

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <h1 className="font-pixel text-3xl text-center mb-8 text-black dark:text-white">
            Sign In to verseX
          </h1>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
            <AuthForm mode="signin" />
          </div>
        </div>
      </div>
    </main>
  );
}