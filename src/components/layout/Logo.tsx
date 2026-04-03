import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 50, className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/images/logo.jpg"
        alt="Wyjazdy z Dziećmi — Świadomy kierunek"
        width={size * 3}
        height={size}
        className="h-auto object-contain mix-blend-multiply"
        priority
      />
    </div>
  );
}
