import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  size?: number;
};

export function TrinaryMark({ className, size = 72 }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      className={cn("text-fg", className)}
    >
      <path
        d="M36 14 L16 52 H56 Z"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.25"
      />
      <circle cx="36" cy="14" r="5" fill="var(--color-zero)" />
      <circle cx="16" cy="52" r="5" fill="var(--color-plus)" />
      <circle cx="56" cy="52" r="5" fill="var(--color-minus)" />
    </svg>
  );
}
