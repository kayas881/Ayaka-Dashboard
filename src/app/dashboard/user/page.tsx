"use client"; // This stays here!

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CollapsibleNavbar from "../../../components/navBar";

export default function UserDashboard() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/user?userId=${session.user.id}`)
      .then((r) => r.json())
      .then(setUserData);
  }, [session]);

  if (!session) return <p>Not logged in</p>;
  if (!userData) return <p>Loading...</p>;

  return (
    <div
      className="min-h-screen text-white flex"
      style={{
        backgroundImage: "url('/Image/iam.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar stays fixed height */}
      <CollapsibleNavbar userData={userData} onEquip={setUserData} />

      {/* Main content */}
      <div className="flex-1 p-6 flex justify-center items-start">
        <div
          className="bg-black/70 rounded-xl p-6 w-full max-w-4xl shadow-lg bg-cover bg-center"
          style={{
            backgroundImage: `url(${userData.equippedBanner})`,
            color: userData.equippedColor,
          }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={session.user.image ?? "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div>
                <h2
                className="text-3xl font-extrabold uppercase"
                style={{ fontFamily: "Franchise",
                   WebkitTextStroke: '0.5px black', // Stroke
                   textShadow: '0 0 10px #000000', // Shadow
                 }}
                >
                {userData.username.toUpperCase()}'S AYA PROFILE
                </h2>

              <p className="text-2xl font-extrabold" style={{ fontFamily: "Franchise"
                , WebkitTextStroke: '0.4px black', // Stroke
                   textShadow: '0 0 10px #000000', // Shadow
               }}>
                {userData.rankName.toUpperCase()} (AR {userData.rank})
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-4 font-bold"
            style={{ fontFamily: "Mangold",
               WebkitTextStroke: '0.3px black', // Stroke
                   textShadow: '0 0 10px #000000', // Shadow
                   fontSize: '24px',
             }}
          >
            <p>
              <strong>Mora:</strong> {userData.mora}
            </p>
            <p>
              <strong>Primogems:</strong> {userData.primogems}
            </p>
            <p>
              <strong>Resin:</strong> {userData.resin}/160
            </p>
            <p>
              <strong>Wishes Made:</strong> {userData.wishesMade}
            </p>
            <p>
              <strong>HP:</strong> {userData.totalHP}
            </p>
            <p>
              <strong>ATK:</strong> {userData.totalATK}
            </p>
            <p>
              <strong>Equipped Character:</strong>{" "}
              {userData.equippedCharacter[0]?.name || "None"}
            </p>
            <p>
              <strong>Equipped Weapon:</strong>{" "}
              {userData.equippedWeapon[0]?.name || "None"}
            </p>
            <p className="col-span-2">
              <strong>Bio:</strong> {userData.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
