import React, { useState } from "react";
import { useRouter } from "next/navigation";

const menuOptions = [
  {
    label: "Perfil Usuario",
    icon: "/Images/usurarioprofile.svg",
    route: "/dashboard"
  },
  {
    label: "Comparación",
    icon: "/Images/noti.svg",
    route: "/dashboard/comparacion"
  },
  {
    label: "Análisis de Riesgo",
    icon: "/Images/noti.svg",
    route: "/dashboard/analisis"
  }
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  const handleSelect = (index: number, route: string) => {
    setSelected(index);
    router.push(route);
  };

  return (
    <aside className="bg-[#222222] min-h-screen w-64 flex flex-col items-center py-8">
      <img src="/Images/logoSG.svg" alt="Logo SG" className="w-20 mb-12" />
      <nav className="flex flex-col gap-4 w-full">
        {menuOptions.map((option, idx) => (
          <button
            key={option.label}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg text-lg font-bold w-full transition-colors
              ${selected === idx ? "bg-[#22A39F] text-[#F3EFE0]" : "text-[#F3EFE0] hover:bg-[#22A39F]/60"}
            `}
            onClick={() => handleSelect(idx, option.route)}
          >
            <img src={option.icon} alt={option.label} className="w-6 h-6" />
            {option.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;