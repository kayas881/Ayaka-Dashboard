'use client';

import { AuthButton } from "@/components/AuthButton";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/Videos/Ayaka.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Optional dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Ayaka Dashboard</h1>
        <AuthButton />
      </div>
    </div>
  );
}
