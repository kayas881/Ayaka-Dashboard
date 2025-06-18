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
  className="relative bg-black/70 rounded-xl p-6 w-full max-w-4xl  shadow-lg bg-cover bg-center"
  style={{ backgroundImage: `url(${userData.equippedBanner})`, color: userData.equippedColor }}
>
  {/* ─── currency bar ─────────────────────────────── */}
<div className="absolute top-10 right-6 flex items-center gap-6  font-bold"
                 style={{ fontFamily: "Mangold",
                                 fontWeight: 1000, // Make font extra bold
    WebkitTextStroke: '0.5px black', // Thicker stroke
    textShadow: '0 0 18px #000, 0 0 2px #000', // Stronger shadow
                 
                   fontSize: '24px',
             }}>
  {/* Mora */}
  <div className="flex items-center gap-0.5">
    <img src="https://static.wikia.nocookie.net/gensin-impact/images/8/84/Item_Mora.png" alt="Mora"
         className="w-8 h-8" />
    <span>{userData.mora}</span>
  </div>

  {/* Primogems */}
  <div className="flex items-center gap-0.5">
    <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" alt="Primogems"
         className="w-8 h-8" />
    <span>{userData.primogems}</span>
  </div>

  {/* Resin */}
  <div className="flex items-center gap-0.5">
    <img src="https://static.wikia.nocookie.net/gensin-impact/images/3/35/Item_Fragile_Resin.png" alt="Resin"
         className="w-8 h-8" />
    <span>{userData.resin}/160</span>
  </div>
</div>

          <div className="flex items-center space-x-4 mb-6">
            <img
              src={session.user.image ?? "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div>
                <h2
                className="text-2xl font-extrabold uppercase"
                style={{ fontFamily: "Franchise",
                   fontWeight: 1000, // Make font extra bold
    WebkitTextStroke: '0.5px black', // Thicker stroke
    textShadow: '0 0 18px #000, 0 0 2px #000', // Stronger shadow
                 }}
                >
                {userData.username.toUpperCase()}'S AYA PROFILE
                </h2>

              <p className="text-2xl font-extrabold"                 style={{ fontFamily: "Franchise",
                   fontWeight: 1000, // Make font extra bold
    WebkitTextStroke: '0.5px black', // Thicker stroke
    textShadow: '0 0 18px #000, 0 0 2px #000', // Stronger shadow
                 }}
                >
                {userData.rankName.toUpperCase()} (AR {userData.rank})
              </p>
            </div>
          </div>

          <div
            className=" font-bold"
            style={{ fontFamily: "Mangold",
                   fontWeight: 1000, // Make font extra bold
    WebkitTextStroke: '0.5px black', // Thicker stroke
    textShadow: '0 0 18px #000, 0 0 2px #000', // Stronger shadow
                   fontSize: '24px',
             }}
          >
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
