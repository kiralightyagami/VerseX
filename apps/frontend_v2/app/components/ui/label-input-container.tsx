import React from "react";
import { cn } from "../../lib/utils";

/**
 * LabelInputContainer component that provides consistent spacing and layout
 * for label-input pairs in forms
 */
export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};