import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  color?: string;
  className?: string;
}

export function Logo({ size = 50, color = "currentColor", className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Sygnet kompasu — zawsze widoczny */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
        aria-hidden="true"
      >
        {/* Zewnętrzny okrąg */}
        <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2.5" />
        {/* Przecinające się linie */}
        <line x1="15" y1="15" x2="85" y2="85" stroke={color} strokeWidth="1.5" />
        <line x1="15" y1="85" x2="85" y2="15" stroke={color} strokeWidth="1.5" />
        {/* Centralna kropka */}
        <circle cx="50" cy="50" r="5" fill={color} />
        {/* Igła kompasu */}
        <polygon points="92,8 78,16 84,22" fill={color} />
        {/* Drobne detale */}
        <circle cx="-5" cy="50" r="2.5" fill={color} />
        <circle cx="75" cy="95" r="2.5" fill={color} />
      </svg>

      {/* Tekst — ukryty na mobile, widoczny od md */}
      <div className="hidden md:flex flex-col leading-[0.9]">
        <span
          className="text-[32px] lg:text-[38px] font-normal tracking-tight"
          style={{ color, fontFamily: "var(--font-lora), Lora, serif" }}
        >
          Warsztaty
        </span>
        <span
          className="text-[24px] lg:text-[28px] -mt-1.5 pl-8 lg:pl-10"
          style={{ color, fontFamily: "var(--font-caveat), Caveat, cursive" }}
        >
          z dziećmi
        </span>
      </div>
    </div>
  );
}
