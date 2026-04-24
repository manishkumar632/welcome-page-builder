import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl glass p-6 transition-all hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}
