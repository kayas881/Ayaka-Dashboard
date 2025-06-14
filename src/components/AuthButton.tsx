'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <button
        className="px-4 py-2 bg-red-500 rounded"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    );
  }

  return (
    <button
      className="px-4 py-2 bg-blue-500 rounded"
      onClick={async () => {
        await signIn("discord", { callbackUrl: "/dashboard" });
      }}
    >
      Sign in with Discord
    </button>
  );
}
