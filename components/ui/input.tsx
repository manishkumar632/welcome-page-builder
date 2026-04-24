"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm text-foreground placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-violet/50 focus:border-transparent transition-all",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
