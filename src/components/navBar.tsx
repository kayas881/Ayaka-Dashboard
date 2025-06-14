import React, { useState, useRef, useEffect } from 'react';
import shop from '../../banners.json';            // adjust path if needed
interface Props {
  userData: any;
  onEquip: (updated: any) => void;   // <-- new
}
function CollapsibleNavbar({ userData, onEquip }: Props) {
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const panelRef     = useRef<HTMLDivElement>(null);
  const backpackRef  = useRef<HTMLImageElement>(null);

  /** close panel if user clicks outside sidebar & panel **/
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!inventoryOpen) return;

      const target = e.target as Node;
      const clickedOutside =
        panelRef.current  && !panelRef.current.contains(target) &&
        backpackRef.current && !backpackRef.current.contains(target);

      if (clickedOutside) setInventoryOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inventoryOpen]);

  // enrich items with image/value
  const enrichItem = (it: any) => {
    if (it.itemType === 'banner') {
      const info = shop.banners.find((b: any) => b.name === it.itemName);
      return { ...it, image: info?.image ?? '' };
    }
    if (it.itemType === 'color') {
      const info = shop.colors.find((c: any) => c.name === it.itemName);
      return { ...it, value: info?.value ?? '#000' };
    }
    return it;
  };

  const inventory = (userData?.inventory || []).map(enrichItem);

  return (
    <div className="relative">
      {/* toggle sidebar */}
      <button
        onClick={() => setSidebarOpen(p => !p)}
        className="absolute top-6 left-2 z-20 bg-black/80 rounded-full p-2 text-white"
        aria-label="Toggle Navbar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d={sidebarOpen ? 'M6 18L18 12L6 6' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {/* sidebar */}
      <div
        className={`h-screen w-16 bg-black/80 backdrop-blur-md flex flex-col items-center py-6 sticky top-0 rounded-2xl z-10
                    transition-all duration-300
                    ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0 pointer-events-none'}`}
        style={{ position: 'fixed', left: 0, top: 0 }}
      >
        <div className="flex-1 flex flex-col gap-6 justify-center items-center">
          {/* backpack icon */}
          <img
            ref={backpackRef}
            src="/Image/backpack_3281569.png"
            alt="Inventory"
            className="w-6 h-6 filter invert cursor-pointer"
            onClick={() => setInventoryOpen(p => !p)}
          />
          <img src="/Image/genshin-impact.svg" alt="Profile"  className="w-6 h-6 filter invert" />
          <img src="/Image/paint-palette_751429.png" alt="Settings" className="w-6 h-6 filter invert" />
        </div>
      </div>

      {/* inventory panel */}
      {sidebarOpen && inventoryOpen && (
        <div ref={panelRef} className="fixed top-32 left-16 h-[32rem] w-[28rem] bg-white/90 shadow-lg rounded-r-2xl z-30 p-4 overflow-y-auto">
          <h2 className="text-black font-bold text-lg mb-4">Inventory</h2>

          {inventory.length ? (
            <div className="grid grid-cols-3 gap-4">
              {inventory.map((it: any, i: number) => (
                <div
                  key={i}
                  className="relative h-36 w-full rounded-lg overflow-hidden border border-black/10 shadow"
                  style={{
                    backgroundColor: it.itemType === 'color' ? it.value : undefined,
                    backgroundImage:  it.itemType === 'banner' ? `url(${it.image})` : undefined,
                    backgroundSize:   'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute bottom-0 w-full bg-black/70 text-white text-xs text-center py-1 truncate">
                    {it.itemName}
                  </div>

                  <button
                    className="absolute top-1 right-1 bg-black/80 text-white text-xs px-2 py-1 rounded hover:bg-black"
                    onClick={async () => {
                      const body =
                        it.itemType === 'banner'
                          ? { userId: userData.userId, equippedBanner: it.image }
                          : { userId: userData.userId, equippedColor: it.value };

                      try {
                        const res   = await fetch('/api/user', {  // <-- correct route
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(body),
                        });

                        if (!res.ok) throw new Error(await res.text());
                        const { success, user } = await res.json();
                        if (success) {
                          onEquip(user);             // ✅ update parent state
                          setInventoryOpen(false);   // optional: close drawer
                        }
                      } catch (err) {
                        console.error('Equip failed', err);
                      }
                    }}
                  >
                    Equip
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-10">(No items yet)</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CollapsibleNavbar;