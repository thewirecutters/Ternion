import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-44 resize-y rounded-xl bg-surface px-4 py-3.5 text-base text-fg shadow-[var(--shadow-border)] placeholder:text-subtle",
          "transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-held)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
