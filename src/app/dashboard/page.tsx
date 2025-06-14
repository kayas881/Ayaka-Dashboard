'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-8">
      <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}!</h1>
      <div className="flex gap-6">
        <div
          className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl cursor-pointer shadow-md"
          onClick={() => router.push("/dashboard/user")}
        >
          <h2 className="text-xl font-semibold">Enter User Dashboard</h2>
          <p className="text-sm text-gray-400">Manage your profile, wishes, etc.</p>
        </div>
        <div
          className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl cursor-pointer shadow-md"
          onClick={() => router.push("/dashboard/guild")}
        >
          <h2 className="text-xl font-semibold">Enter Guild Dashboard</h2>
          <p className="text-sm text-gray-400">Manage your server settings</p>
        </div>
      </div>
    </div>
  );
}
